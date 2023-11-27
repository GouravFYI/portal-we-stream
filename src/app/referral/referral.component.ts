import { Component, OnInit } from '@angular/core';
import { BundleinfoService } from '../service/bundleinfo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.css']
})
export class ReferralComponent implements OnInit {

  referral: string = ''
  buttonText:string = 'Copy code'
  iconType:string = 'bi-clipboard'
  iconTimer:any = null
  constructor(private bundleInfo: BundleinfoService, private router:Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('bundleInfo') !== null){
      let data:any = sessionStorage.getItem('bundleInfo')
      this.referral = JSON.parse(data)?.referralCode
    }else{
      this.router.navigate(['/login'])
    }
    clearTimeout(this.iconTimer);
  }

  setReferral() {
    const data = this.bundleInfo.getBundleInfo()
    this.referral = data?.referralCode
  }

  copyReferralCode() {
    const referralCodeElement = document.getElementById('referralCode');
    const referralCode = referralCodeElement?.textContent;

    if (referralCode) {
      const tempTextarea = document.createElement('textarea');
      tempTextarea.value = referralCode;

      document.body.appendChild(tempTextarea);

      tempTextarea.select();
      tempTextarea.setSelectionRange(0, 99999); /* For mobile devices */

      document.execCommand('copy');

      document.body.removeChild(tempTextarea);

      this.buttonText = 'Copied!'
      this.iconType = 'bi-clipboard-check'

      this.iconTimer = setTimeout(()=>{
        this.buttonText = 'Copy code'
        this.iconType = 'bi-clipboard'
      },2000)
    }
  }

}
