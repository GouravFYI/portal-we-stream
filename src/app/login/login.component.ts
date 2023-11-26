import { Component, OnInit } from '@angular/core';
import { Status } from './login.interface';
import { ApisService } from "../apis.service"
import { BundleinfoService } from '../service/bundleinfo.service';
import { IMEIService } from '../service/imei.service';
import { VisibilityService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  imeiStatusMessage:Status = {
    message : 'The IMEI number must belong to your device',
    class : 'text-muted'
  }
  disableLoginNotIMEIValid:boolean = true
  disableReferralCode:boolean = true
  referralStatusMessage:Status = {
    message : 'Referral Code is only valid for first time users',
    class : 'text-danger'
  }

  constructor(
    private api:ApisService,
    private bundleInfo:BundleinfoService,
    private imeiService:IMEIService,
    private visibilityService: VisibilityService
  ) { }

  ngOnInit(): void {

  }

  validateIMEI(event:any){
    let input = event.target.value
    let typecheck = Number(input)
    if(input == ''){
      this.imeiStatusMessage = {
        message : 'The IMEI number must belong to your device',
        class : 'text-muted'
      }
      this.disableLoginNotIMEIValid = true
      return
    }
    if(isNaN(typecheck) || input.length < 14 || input.length > 17){
      this.imeiStatusMessage = {
        message : 'Invalid IMEI',
        class : 'text-danger'
      }
      this.disableLoginNotIMEIValid = true
      return
    }

    this.api.imeiValidation(input).subscribe(resp => {
      this.imeiService.setImeiInfo(resp)
      this.imeiStatusMessage = {
        message : 'Your IMEI is Valid',
        class : 'text-primary'
      }
      this.disableLoginNotIMEIValid = false
      if(resp?.firstTime){
        this.disableReferralCode = false
        this.referralStatusMessage = {
          message : "Congratulations! You qualify for our referral program!",
          class : 'text-success'
        }
      }
    },(error)=>{
      this.imeiStatusMessage = {
        message : 'Invalid IMEI',
        class : 'text-danger'
      }
    })
  }
  
  // this.visibilityService.toggleNav(true);
}
