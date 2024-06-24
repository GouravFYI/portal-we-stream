declare global {
  interface Window {
    paypal: any; // Assuming 'paypal' is an external library without type definitions
  }
}
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Currency } from '../helper/currency.helper';
import { Vat } from '../helper/vat.helper';
import { ApisService } from '../apis.service';
import { PaymentstatusService } from '../service/paymentstatus.service';
@Component({
  selector: 'app-data-plans',
  templateUrl: './data-plans.component.html',
  styleUrls: ['./data-plans.component.css']
})
export class DataPlansComponent implements OnInit{

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
  paymentTool: string = 'cc'
  isPaypalInit:boolean = false
  isLoadingPurchase: boolean = false
  constructor(private router: Router, private api: ApisService,
    private paymentStatus: PaymentstatusService) { }

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
      country: parsedData?.bankCountry,
      vat: parsedData?.vatNumber || null,
      imei: imeival
    }

    console.log()

    this.billingDetails = billingDetails
    this.orderSymmary = obj
  }

  cancelPaymentInput() {
    this.orderSymmary = null
    this.billingDetails = null
    this.bundleCountry = 'NOTVALID'
    this.tranxFees = '3'
    this.paymentTool = 'cc'
    this.isPaypalInit = false
    document.querySelectorAll<HTMLInputElement>('#creditCardRadio').forEach(radio => radio.checked = true);
    document.querySelectorAll<HTMLInputElement>('#payPalRadio').forEach(radio => radio.checked = false);
    document.querySelectorAll<HTMLInputElement>('#paypal-button-container').forEach(element => {
      element.style.display = 'none';
    });
    document.querySelectorAll<HTMLInputElement>('#credit-card-button').forEach(element => {
      element.style.display = 'block';
    });
  }

  editBillingDetails(){
    window.location.href = `${window.location.origin}/my-account`
  }

  paymentMethod(type: string = 'cc') {
    if (type == 'pp') {
      this.checkoutOrder(this.selectedBundle, 0.04)
      if(!this.isPaypalInit){
        this.makePayment(this.orderSymmary)
      }
      this.isPaypalInit = true
      this.tranxFees = '4'
      this.paymentTool = 'pp'
      document.querySelectorAll<HTMLInputElement>('#paypal-button-container').forEach(element => {
        element.style.display = 'block';
      });
      document.querySelectorAll<HTMLInputElement>('#credit-card-button').forEach(element => {
        element.style.display = 'none';
      });
    } else {
      this.checkoutOrder(this.selectedBundle, 0.03)
      this.tranxFees = '3'
      this.paymentTool = 'cc'
      document.querySelectorAll<HTMLInputElement>('#paypal-button-container').forEach(element => {
        element.style.display = 'none';
      });
      document.querySelectorAll<HTMLInputElement>('#credit-card-button').forEach(element => {
        element.style.display = 'block';
      });
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
      this.isLoadingPurchase = true
      this.api.directPurchase(params, accountData).subscribe(resp => {
        let paymentStatus = {
          status: 'success',
          paymentType: 'direct'
        }
        this.removePurchasedBundleFromSession(this.orderSymmary?.goodsCode)
        this.paymentStatus.setpaymentStatus(paymentStatus)
        this.isLoadingPurchase = false
        this.router.navigate(['/payment']);
      }, (error) => {
        let paymentStatus = {
          status: 'error',
          paymentType: 'direct'
        }
        this.paymentStatus.setpaymentStatus(paymentStatus)
        this.isLoadingPurchase = false
        this.router.navigate(['/payment']);
      })
    } else {
      if (this.paymentTool == 'cc') {
        let cardData = {
          price: this.computePrice(this.orderSymmary?.goodsPrice),
          dataPlan: this.orderSymmary?.goodsName,
          imei: imeival,
          tax: this.orderSymmary?.vat,
          currency: this.currencyType?.name,
          bundleCode: this.orderSymmary?.goodsCode,
          bundleCountry: this.bundleCountry,
          paymentMethod: 'creditcard',
          voucherId: '',
          callbackDomain: `${window.location.origin}/payment?deviceId=null&paymentType=cc&goodsCode=${this.orderSymmary?.goodsCode}`
        }
        let accountData = this.parseAccountInfo(parsedData?.accountType)
        this.isLoadingPurchase = true
        this.api.payCreditCard(cardData, accountData).subscribe(resp => {
          this.isLoadingPurchase = false
          window.location.href = resp
          // window.open(resp)
        }, (error) => {
          let paymentStatus = {
            status: 'default',
            paymentType: 'cc'
          }
          this.paymentStatus.setpaymentStatus(paymentStatus)
          this.isLoadingPurchase = false
          this.router.navigate(['/payment']);
        })
      } else {
        // Paypal Logic

      }
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
    } else {
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

  // paypal payment function - very complex code
  makePayment(orderSummary: any) {
    let paypalButtonContainer = document.querySelectorAll('#paypal-button-container');
    paypalButtonContainer.forEach(function(element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    });

    let imei: any = sessionStorage.getItem('imei')
    let imeival = JSON.parse(imei)
    let data: any = localStorage.getItem('account-data')
    let parsedData = JSON.parse(data)
    let price = this.computePrice(this.orderSymmary?.goodsPrice)
    let accountData = this.parseAccountInfo(parsedData?.accountType)
    let clientSummary = this.getClientSummary(accountData)
    let bundle = {
      price: price,
      vatNumber: orderSummary?.vatNumber,
      currency: this.currencyType.name,
      dataPlan: orderSummary?.goodsName,
      code: orderSummary.goodsCode,
      imei: imeival,
      bundleCountry : this.bundleCountry
    }
    this.api.initPaypalPayment(accountData, bundle, null).subscribe(resp => {
      window.paypal.Button.render({
        env: 'production', // sandbox | production
        style: {
          layout: 'vertical', // horizontal | vertical
          size: 'responsive', // medium | large | responsive
          shape: 'pill', // pill | rect
          color: 'blue' // gold | blue | silver | black
        },
        funding: {
          allowed: [],
          disallowed: [window.paypal.FUNDING.CREDIT, window.paypal.FUNDING.CARD]
        },

        // PayPal Client IDs - replace with your own
        // Create a PayPal app: https://developer.paypal.com/developer/applications/create
        client: {
          sandbox: 'AQ-AV25HO7ASaJC-gpp5gIAySfOLc5dZxQr_JluTHQ-bYYeIAd3kwdPCAX1hVrKXiBLwx3dtKp_qScNu',
          production: 'AbyF2iwpLew5Ek2dbEB5ktuT5AAYd6kMvRPbCfvDP-xCFx9UvKjBOLtUXGq4aYu-Rl29mLAElqQn3FHr'
        },
        payment: function (data:any, actions:any) {
          let handlingFee = orderSummary?.transactionFees
          let subtotal = price
          let tax = orderSummary?.vat;
          let total = orderSummary?.total;
          console.log(handlingFee,subtotal,tax,total)
          return actions.payment.create({
            payment: {
              transactions: [{
                amount: {
                  total: total,
                  currency: bundle.currency,
                  details: {
                    subtotal: subtotal,
                    tax: tax,
                    handling_fee: handlingFee
                  }
                },
                description: bundle.dataPlan.replace(new RegExp('<br/>', 'g'), ' ') + ' for device ' + accountData.imei + ' | VAT Number: NL858302238B01',
                custom: clientSummary
                // invoice_number: invoiceNumber
              }]
            }
          });
        },
        onAuthorize: (data: any, actions: any) => {
          return actions.payment.execute().then((paymentObject:any)=> {

            //TODO: UNCOMMENT WHEN BRINGING BACK TIMEZONED BUNDLES
            // let bundleCountry = 'TMPCNTRVL';
            let params = {
              bundlePrice: bundle.price,
              imei: bundle.imei,
              paymentId: paymentObject.id,
              paymentState: paymentObject.state,
              bundleCountry: bundle.bundleCountry,
              paymentCreateDate: paymentObject.create_time
            };

            this.api.payPaypal(bundle.code, params).subscribe(resp => {
              console.log(resp)
              this.router.navigate(['/payment'],{ queryParams: { paymentType: 'pp',status: 'OK' } });
            },(error) => {
              console.log(error)
              this.router.navigate(['/payment'],{ queryParams: { paymentType: 'pp',status: 'OK' } });
            })
          });

        },
        onError: function (error:any) {
          let paymentStatus = {
            status: 'default',
            paymentType: 'pp'
          }
          this.paymentStatus.setpaymentStatus(paymentStatus)
          this.router.navigate(['/payment']);
        }

      }, '#paypal-button-container');

    })
  }

  getClientSummary(accountData: any): any {
    let result = `Type:${accountData.accountType}*`;
    let shortResult = '';
    let addressSummary = '';
    let shortAddressSummary = '';
    let businessSummary = '';
    let shortBusinessSummary = '';
    result = result + `Country of origin: ${accountData.countryOfOrigin}*`;
    shortResult = accountData.countryOfOrigin;
    if (
      accountData.rCountry !== accountData.pCountry &&
      accountData.rCity !== accountData.pCity &&
      accountData.rAddress !== accountData.pAddress
    ) {
      addressSummary =
        addressSummary +
        `Resident address: ${accountData.rCountry}, ${accountData.rCity}, ${accountData.rAddress}*`;
      addressSummary =
        addressSummary +
        `Permanent address: ${accountData.pCountry}, ${accountData.pCity}, ${accountData.pAddress}*`;
      shortAddressSummary = `${accountData.rCountry}|${accountData.rCity}|${accountData.rAddress}|${accountData.pCountry}|${accountData.pCity}|${accountData.pAddress}`;
    } else {
      addressSummary =
        addressSummary + `Address: ${accountData.pCountry}, ${accountData.pCity}, ${accountData.pAddress}*`;
      shortAddressSummary = `${accountData.rCountry}|${accountData.rCity}|${accountData.rAddress}`;
    }

    if (accountData.bankCountry !== accountData.rCountry) {
      addressSummary = addressSummary + `Bank country: ${accountData.bankCountry}`;
      shortAddressSummary = shortAddressSummary + `|${accountData.bankCountry}`;
    }

    if (accountData.accountType === 'business') {
      businessSummary = businessSummary + `*Company Data* ID: ${accountData.companyId}*`;
      businessSummary = businessSummary + `Name: ${accountData.companyName}*`;
      businessSummary = businessSummary + `Address: ${accountData.companyAddress}*`;
      businessSummary = businessSummary + `VAT: ${accountData.vatNumber}`;
      shortBusinessSummary = `${accountData.companyId}|${accountData.companyName}|${accountData.companyAddress}|${accountData.vatNumber}`;
    }

    if (result.length + addressSummary.length <= 255) {
      result = result + addressSummary;
      if (accountData.accountType === 'business') {
        if (result.length + businessSummary.length <= 255) {
          result = result + businessSummary;
        } else {
          result = `${shortResult}|${shortAddressSummary}|${shortBusinessSummary}`;
          if (result.length > 255) {
            if (accountData.accountType === 'business') {
              result = `${shortResult}|${shortBusinessSummary}`;
            } else {
              result = `${shortResult}|${shortAddressSummary}`;
            }
          }
        }
      }
    } else {
      result = `${shortResult}|${shortAddressSummary}|${shortBusinessSummary}`;
      if (result.length > 255) {
        if (accountData.accountType === 'business') {
          result = `${shortResult}|${shortBusinessSummary}`;
        } else {
          result = `${shortResult}|${shortAddressSummary}`;
        }
      }
    }
    return result.substring(0, 255);
  }


}


