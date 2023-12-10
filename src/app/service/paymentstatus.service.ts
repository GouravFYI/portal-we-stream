import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PaymentstatusService {
  paymentStatus:any = null
  constructor() { }

  setpaymentStatus(data:any){
    this.paymentStatus = data
  }

  getpaymentStatus(){
    return this.paymentStatus
  }
}
