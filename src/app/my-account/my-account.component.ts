import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApisService } from '../apis.service';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  accountForm: FormGroup
  accountType: string = 'personal'
  isSameAddress: boolean = true
  isVatValid: boolean = false
  countryList: any = []
  isEUNation:boolean = true
  vatValidationMessage: any = {
    message: "Enter valid VAT Number",
    class: 'text-secondary'
  }
  constructor(private api: ApisService, private fb: FormBuilder) {
    this.accountForm = this.fb.group(
      {
        accountType: ['personal', Validators.required],
        firstName: [''],
        lastName: [''],
        email: [''],
        countryOfOrigin: [''],
        pCity: [''],
        pAddress: [''],
        pPostal: [''],
        rCity: [''],
        rAddress: [''],
        rPostal: [''],
        companyName: [''],
        companyAddress: [''],
        companyId: [''],
        vatNumber: [''],
        vatValidValue: [''],
        bankCountry: [''],
        rCountry: [''],
        pCountry: [''],
        sameAsPermanent: [true, Validators.required],
        confirmInfo: [true, Validators.required]
      }
    );
  }

  ngOnInit(): void {
    this.getCountryList()
    this.populateForm()
  }

  saveAccountInfo() {
    localStorage.setItem('account-data', JSON.stringify(this.accountForm.value))
  }

  populateForm() {
    let data: any = localStorage.getItem('account-data')
    if (data !== null || data !== undefined) {
      let accountData = JSON.parse(data)
      this.accountForm.setValue({
        accountType: accountData.accountType || '',
        firstName: accountData.firstName || '',
        lastName: accountData.lastName || '',
        email: accountData.email || '',
        countryOfOrigin: accountData.countryOfOrigin || '',
        pCity: accountData.pCity || '',
        pAddress: accountData.pAddress || '',
        pPostal: accountData.pPostal || '',
        rCity: accountData.rCity || '',
        rAddress: accountData.rAddress || '',
        rPostal: accountData.rPostal || '',
        companyName: accountData.companyName || '',
        companyAddress: accountData.companyAddress || '',
        companyId: accountData.companyId || '',
        vatNumber: accountData.vatNumber || '',
        vatValidValue: accountData.vatValidValue || '',
        bankCountry: accountData.bankCountry || '',
        rCountry: accountData.rCountry || '',
        pCountry: accountData.pCountry || '',
        sameAsPermanent: accountData.sameAsPermanent || false,
        confirmInfo: accountData.confirmInfo || false
      });
      this.isEUNation = this.api.euCountryList()[accountData.countryOfOrigin] !== undefined ? true : false
    }
  }

  toggleAddress() {
    this.isSameAddress = !this.isSameAddress
    this.accountForm.patchValue({
      sameAsPermanent: this.isSameAddress
    })
  }

  toggleAccountType(type: string) {
    this.accountType = type
  }

  getCountryList() {
    this.api.getCountries().subscribe(resp => {
      this.countryList = resp
    })
  }

  validateVat(event: any) {
    let vatNumber = event.target.value
    let countryCode: any = this.accountForm.get('countryOfOrigin')?.value
    if (countryCode !== '') {
      this.api.vatValidation(vatNumber, countryCode).subscribe(resp => {
        this.isVatValid = resp?.isValid
        if (resp?.isValid) {
          this.vatValidationMessage = {
            message: "Your VAT Number is Valid",
            class: 'text-success'
          }
        } else {
          this.vatValidationMessage = {
            message: "Your VAT Number doesn't match your Country of Origin",
            class: 'text-danger'
          }
        }
      }, (error) => {
        this.isVatValid = false
        this.vatValidationMessage = {
          message: "Your VAT Number doesn't match your Country of Origin",
          class: 'text-danger'
        }
      })
    }
  }

  modifyCountryOfOrigin() {
    let vat = this.accountForm.get('vatNumber')?.value
    let countryOfOrigin = this.accountForm.get('countryOfOrigin')?.value
    this.isEUNation = this.api.euCountryList()[countryOfOrigin] !== undefined ? true : false
    this.accountForm.patchValue({
      bankCountry: this.api.countryCodeList()[countryOfOrigin]
    })
    if (vat == '') return
    else {
      this.api.vatValidation(vat, countryOfOrigin).subscribe(resp => {
        this.isVatValid = resp?.isValid
        if (resp?.isValid) {
          this.vatValidationMessage = {
            message: "Your VAT Number is Valid",
            class: 'text-success'
          }
        } else {
          this.vatValidationMessage = {
            message: "Your VAT Number doesn't match your Country of Origin",
            class: 'text-danger'
          }
        }
      }, (error) => {
        this.isVatValid = false
        this.vatValidationMessage = {
          message: "Your VAT Number doesn't match your Country of Origin",
          class: 'text-danger'
        }
      })
    }
  }

}
