import { Component, OnInit } from '@angular/core';
import { Status } from './login.interface';
import { ApisService } from "../apis.service"
import { BundleinfoService } from '../service/bundleinfo.service';
import { IMEIService } from '../service/imei.service';
import { VisibilityService } from '../app.service';
import { Router } from '@angular/router';

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

  validImei:any = null
  referralCode:any = null
  isLoading:boolean = false
  isError:boolean = false

  constructor(
    private api:ApisService,
    private bundleInfo:BundleinfoService,
    private imeiService:IMEIService,
    private visibilityService: VisibilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('imei')){
      let imei:any = localStorage.getItem('imei')
      this.validImei = JSON.parse(imei)
      sessionStorage.setItem('imei',JSON.stringify(this.validImei))
      this.getBundleInfo()
    }
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

    this.imeiStatusMessage = {
      message : 'Checking your IMEI validity.....',
      class : 'text-primary'
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
      this.validImei = input
      sessionStorage.setItem('imeiInfo',JSON.stringify(resp))
      sessionStorage.setItem('imei',JSON.stringify(input))
      localStorage.setItem('imei',JSON.stringify(input))
    },(error)=>{
      this.imeiStatusMessage = {
        message : 'Invalid IMEI',
        class : 'text-danger'
      }
    })
  }

  getBundleInfo(){
    this.isLoading = true
    this.api.getBundles(this.validImei,null,this.referralCode).subscribe(resp => {
      this.bundleInfo.setBundleInfo(resp)
      sessionStorage.setItem('bundleInfo',JSON.stringify(resp))
      this.isLoading = false
      this.visibilityService.toggleNav(true);
      sessionStorage.setItem('visibleNav','1')
      this.router.navigate(['/my-account']);
    },(error)=>{
      this.isLoading = false
      this.isError = true
    })
  }

}
