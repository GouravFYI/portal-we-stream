import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentstatusService } from '../service/paymentstatus.service';
import { ApisService } from '../apis.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentType: any = null
  status: string | null = null
  isConfirmReturnLoading:boolean = false
  isLoading:boolean  = true
  constructor(private router: Router, private paymentService: PaymentstatusService, private api: ApisService) { }

  ngOnInit(): void {
    this.getPaymentStatus()
  }

  getPaymentStatus() {
    let imei: any = sessionStorage.getItem('imei')
    let imeival = JSON.parse(imei)
    let data = this.paymentService.getpaymentStatus()
    console.log(data)
    // For Direct Purchase
    if (data) {
      this.status = data?.status || 'success'
      this.paymentType = data?.paymentType
    } else {
      // For Paypal and CreditCard 
      let data = new URLSearchParams(new URL(window.location.href).search)
      let paymentType = data.get('paymentType')
      if (paymentType == 'cc') {
        let orderId: string = data.get('orderId') || ''
        let goodsCode:any = data.get('goodsCode')
        console.log(orderId,goodsCode)
        // Call CC Payment Confirmation API here  
        this.api.verifyCreditCardPayment(orderId,imeival).subscribe(resp => {
          this.isLoading = false
          switch (resp) {
            case 'COMPLETED':
              this.status = 'success'
              this.removePurchasedBundleFromSession(goodsCode)
              break;
            case 'CANCELLED':
              this.status = 'error'
              break;
            case 'EXPIRED':
              this.status = 'expired'
              break;
            default:
              this.status = 'default'
              break;
          }
        }, (error) => {
          this.isLoading = false
          this.status = 'default'
        })
      }else{
        let data = new URLSearchParams(new URL(window.location.href).search)
        let status = data.get('status')
        this.isLoading = false
        switch (status) {
          case 'OK':
            this.status = 'success'
            break;
          default:
            this.status = 'default'
            break;
        }
      }
    }
  }

  returnToDataPlans() {
    this.router.navigate(['/data-plans'])
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

  fetchUpdatedBundleInfo(){
    let imei: any = sessionStorage.getItem('imei')
    let imeival = JSON.parse(imei)
    this.isConfirmReturnLoading = true
    this.api.getBundles(imeival,null,null).subscribe(resp => {
      sessionStorage.setItem('bundleInfo',JSON.stringify(resp))
      this.isConfirmReturnLoading = false
      this.router.navigate(['/data-plans'])
    },(error) => {
      this.isConfirmReturnLoading = false
    })
  }

}
