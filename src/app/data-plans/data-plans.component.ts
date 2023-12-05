import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Currency } from '../helper/currency.helper';
import { Vat } from '../helper/vat.helper';
import { ApisService } from '../apis.service';
import { error } from 'console';
@Component({
  selector: 'app-data-plans',
  templateUrl: './data-plans.component.html',
  styleUrls: ['./data-plans.component.css']
})
export class DataPlansComponent implements OnInit {

  bundleInfo: any = []
  packageBundle: any = []
  discBundle: any = []
  isFreeBundle: boolean = false
  orderSymmary: any = null
  currencyType: any = null
  billingDetails: any = null
  selectedBundle: any = null
  tranxFees: string = '3'
  countryList: any = []
  bundleCountry: string = 'NOTVALID'
  constructor(private router: Router, private api: ApisService) { }

  ngOnInit(): void {
    this.getBundleInfo()
    this.getCountryList()
  }

  getBundleInfo() {
    let data: any = sessionStorage.getItem('bundleInfo')
    let parsedData = JSON.parse(data)
    if (parsedData !== null) {
      let pkag = []; let disc = []
      this.bundleInfo = parsedData['bundles']
      for (let obj of parsedData['bundles']) {
        if (obj?.goodsType == "PKAG" && !obj?.goodsName.startsWith('Unlimited')) pkag.push(obj)
        else disc.push(obj)
      }
      this.packageBundle = pkag
      this.discBundle = disc
    } else {
      this.router.navigate(['/login'])
    }
  }

  getRows(): number[] {
    const numRows = Math.ceil(this.bundleInfo.length / 3);
    return new Array(numRows).fill(0).map((_, index) => index);
  }

  getBundlesInRow(row: number): any[] {
    const startIndex = row * 3;
    return this.bundleInfo.slice(startIndex, startIndex + 3);
  }

  computeBundleName(name: string) {
    let data = name.replace(':', "<br/>")
    return data.split('<br/>')
  }

  computeBundlePrice(currencyType: string, goodsPrice: string) {
    let resp = ''
    let price = Number(goodsPrice) / 100;
    let data: any = localStorage.getItem('account-data')
    let accountInfo = JSON.parse(data)
    let currency = new Currency({
      countryOfOrigin: accountInfo?.countryOfOrigin,
      customCountry: currencyType || null
    });
    this.currencyType = {
      name: currency?.name,
      sign: currency?.sign
    }
    switch (currency?.name) {
      case 'USD':
        resp = `&euro; ${price} /-`
        break;
      case 'EUR':
        resp = `&euro; ${price} /-`
        break;
      case 'GBP':
        resp = `&pound; ${price} /-`
        break;
      case 'PHP':
        resp = `&#8369; ${price} /-`
        break;
      default:
        resp = `&euro; ${price} /-`
        break;
    }
    return resp
  }

  bytesToNearestGB(bytes: string) {
    const gigabyte = 1024 * 1024 * 1024; // 1 GB in bytes
    const nearestGB = Math.round(Number(bytes) / gigabyte);
    if (nearestGB == 0) {
      const megabyte = 1024 * 1024
      const nearestMB = Math.round(Number(bytes) / megabyte);
      return `${nearestMB} MB`
    }
    return `${nearestGB} GB`
  }

  getBundleTypeFreeOrOrder(bundle: any) {
    let label = ((bundle.goodsCode === 'Roamability_1500M_DP')
      || (bundle.goodsCode === 'Roamability_5G_FP_INITIAL_KLM')
      || (bundle.goodsCode === 'Roamability_5G_FP_INITIAL_FLYING_BLUE')) ? 'Free' : 'Order';
    return label
  }

  computePrice(goodsPrice: any) {
    return Number(goodsPrice) / 100;
  }

  checkoutOrder(bundle: any, traxFees: any = 0.03) {
    let bundleType = this.getBundleTypeFreeOrOrder(bundle)
    this.selectedBundle = bundle
    let data: any = localStorage.getItem('account-data')
    let parsedData: any = JSON.parse(data)
    let bundlePrice: any = this.computePrice(bundle?.goodsPrice)
    let vatPercent: any = new Vat(parsedData)
    let transactionFees = bundlePrice * traxFees
    let vat = (bundlePrice + Number(transactionFees.toFixed(2))) * (vatPercent.percent * 0.01)
    let total = Number(vat.toFixed(2)) + Number(transactionFees.toFixed(2)) + Number(this.computePrice(bundle?.goodsPrice))
    let obj = {
      name: this.computeBundleName(bundle?.goodsName)[0],
      dataPlan: this.computeBundleName(bundle?.goodsName)[1],
      bundlePrice: this.computeBundlePrice(bundle, bundle?.goodsPrice),
      transactionFees: transactionFees.toFixed(2),
      vat: vat.toFixed(2),
      vatPercent: vatPercent.percent,
      currencySign: this.currencyType?.sign,
      total: total.toFixed(2),
      bundleType: bundleType,
      ...bundle
    }

    let imei: any = sessionStorage.getItem('imei')
    let imeival = JSON.parse(imei)
    let billingDetails = {
      name: `${parsedData?.firstName} ${parsedData.lastName}`,
      email: parsedData?.email,
      country: parsedData?.countryName,
      vat: parsedData?.vatNumber,
      imei: imeival
    }

    this.billingDetails = billingDetails
    this.orderSymmary = obj
  }

  cancelPaymentInput() {
    this.orderSymmary = null
    this.billingDetails = null
    this.bundleCountry = 'NOTVALID'
    this.tranxFees = '3'
    document.querySelectorAll<HTMLInputElement>('#creditCardRadio').forEach(radio => radio.checked = true);
    document.querySelectorAll<HTMLInputElement>('#payPalRadio').forEach(radio => radio.checked = false);
  }

  paymentMethod(type: string = 'cc') {
    if (type == 'pp') {
      this.checkoutOrder(this.selectedBundle, 0.04)
      this.tranxFees = '4'
    } else {
      this.checkoutOrder(this.selectedBundle, 0.03)
      this.tranxFees = '3'
    }
  }

  getCountryList() {
    this.api.getCountries().subscribe(resp => {
      this.countryList = resp
    })
  }

  modifyBundleCountry(event: any) {
    this.bundleCountry = event.target.value
  }

  purchaseBundle() {
    let imei: any = sessionStorage.getItem('imei')
    let imeival = JSON.parse(imei)
    let data: any = localStorage.getItem('account-data')
    let parsedData = JSON.parse(data)
    if (this.orderSymmary?.bundleType == 'Free') {
      let params = {
        imei: imeival,
        bundleCode: this.orderSymmary?.goodsCode,
        price: 'N/A-DIRECT_PURCHASE',
        dataPlan: 'N/A-DIRECT_PURCHASE',
        tax: 'N/A-DIRECT_PURCHASE',
        currency: 'N/A-DIRECT_PURCHASE',
        paymentMethod: 'N/A-DIRECT_PURCHASE',
        bundleCountry: 'N/A-DIRECT_PURCHASE',
        callbackDomain: 'N/A-DIRECT_PURCHASE',
        ait: null
      }
      let accountData = this.parseAccountInfo(parsedData?.accountType)
      this.api.directPurchase(params,accountData).subscribe(resp => {
        let paymentStatus = {
          status : 'success',
          message : "You have successfully purchased your bundle!",
          text1 : "If you are still on an active data plan, your new data plan will be activated as soon as your current plan is consumed or expired.",
          text2 : "In case you see -- in your home screen instead of the remaining GB, please reboot your device."
        }
        this.removePurchasedBundleFromSession(this.orderSymmary?.goodsCode)
        this.router.navigate(['/payment'], { state: { paymentStatus } });

      },(error) => {
        let paymentStatus = {
          status : 'error', 
          message : "Your Transaction Failed",
          text1 : "Please contact user support",
          info : ["email: info@we.stream","USA: +1 (424) 214-3131","Europe: +31 (0)88 004 8888"]
        }
        this.router.navigate(['/payment'], { state: { paymentStatus } });
      })
    }
  }

  removePurchasedBundleFromSession(goodsCode: string) {
    let data: any = sessionStorage.getItem('bundleInfo')
    let parsedData = JSON.parse(data)
    let bundles = parsedData['bundles']
    let newBundles = []
    for (let obj of bundles) {
      if (obj?.goodsCode !== goodsCode) {
        newBundles.push(obj)
      }
    }
    parsedData['bundles'] = newBundles
    sessionStorage.setItem('bundleInfo', parsedData)
  }

  parseAccountInfo(type: string): any {
    let data: any = localStorage.getItem('account-data')
    let parsedData = JSON.parse(data)
    let imei: any = sessionStorage.getItem('imei')
    let imeival = JSON.parse(imei)
    if (type == 'personal') {
      const newData = {
        "accountType": "personal",
        "imei": imeival,
        "imei-valid-value": imeival,
        "firstName": parsedData?.firstName || null,
        "lastName": parsedData?.lastName || null,
        "email": parsedData?.email || null,
        "countryOfOrigin": parsedData?.countryOfOrigin || null,
        "pCity": parsedData?.pCity || null,
        "pAddress": parsedData?.pAddress || null,
        "pPostal": parsedData?.pPostal || null,
        "sameAsPermanent": "on",
        "rCity": parsedData?.rCity || null,
        "rAddress": parsedData?.rAddress || null,
        "rPostal": parsedData?.rPostal || null,
        "confirmInfo": "on",
        "referralCode": parsedData?.referralCode || null,
        "bankCountry": parsedData?.bankCountry || null,
        "rCountry": parsedData?.rCountry || null,
        "pCountry": parsedData?.pCountry || null,
        "countryName": parsedData?.countryName || null
      };
      return newData;
    }else {
      const newData = {
        "accountType": "business",
        "imei": imeival,
        "imei-valid-value": imeival,
        "firstName": parsedData?.firstName || null,
        "lastName": parsedData?.lastName || null,
        "email": parsedData?.email || null,
        "countryOfOrigin": parsedData?.countryOfOrigin || null,
        "pCity": parsedData?.pCity || null,
        "pAddress": parsedData?.pAddress || null,
        "pPostal": parsedData?.pPostal || null,
        "sameAsPermanent": "on",
        "rCity": parsedData?.rCity || null,
        "rAddress": parsedData?.rAddress || null,
        "rPostal": parsedData?.rPostal || null,
        "confirmInfo": "on",
        "referralCode": parsedData?.referralCode || null,
        "bankCountry": parsedData?.bankCountry || null,
        "rCountry": parsedData?.rCountry || null,
        "pCountry": parsedData?.pCountry || null,
        "countryName": parsedData?.countryName || null,
        "companyAddress": parsedData?.companyAddress || null,
        "companyId": parsedData?.companyId || null,
        "companyName": parsedData?.companyName || null,
        "vatNumber": parsedData?.vatNumber || null,
        "vatValidValue": parsedData?.vatValidValue || null
      };
      return newData;
    }
  }

}


