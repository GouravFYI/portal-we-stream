import { Component, OnInit } from '@angular/core';
import { BundleinfoService } from '../service/bundleinfo.service';
import { Router } from '@angular/router';
import { ApisService } from '../apis.service';
@Component({
  selector: 'app-my-bundle',
  templateUrl: './my-bundle.component.html',
  styleUrls: ['./my-bundle.component.css']
})
export class MyBundleComponent implements OnInit {
  activeBundle: any = null
  readyForUsageBundle: any = null
  historyBundles: any = null
  isSpeedLimitApplied:boolean = false

  constructor(private bundleInfo: BundleinfoService, private router: Router, private api: ApisService) { }

  ngOnInit(): void {
    this.fetchUpdatedBundleInfo()
  }

  setBundleInfo() {
    let data: any = sessionStorage.getItem('bundleInfo')
    this.isSpeedLimitApplied = JSON.parse(data)?.deviceIsSpeedLimited
    let purchaseHistory: any = JSON.parse(data)?.purchaseHistory
    let activeBundle: any = [], readyForUsageBundle: any = [], historyBundles: any = []
    let today = new Date();
    for (let i = 0; i < purchaseHistory.length; i++) {
      let item = purchaseHistory[i]
      if (item.goodsType === 'PKAG') {
        if (item.status === 'IN_USING') {
          activeBundle.push(item)
        } else if (item.status === 'NOT_ACTIVATED') {
          readyForUsageBundle.push(item)
        } else if ((item.status === 'USE_END') || (item.status === 'EXPIRE')) {
          historyBundles.push(item)
        }
      } else if (item.goodsType === 'DISC') {
        if (item.status === 'VALID') {
          let bundlePeriodIsNow = (item.effectiveTime <= today.getTime()) && (item.expiryTime >= today.getTime())
          if (bundlePeriodIsNow) {
            activeBundle.push(item)
          } else if (item.effectiveTime > today.getTime()) {
            readyForUsageBundle.push(item)
          }
        } else if (item.status === 'INVALID') {
          historyBundles.push(item)
        }
      }
    }
    this.activeBundle = activeBundle
    this.readyForUsageBundle = readyForUsageBundle
    this.historyBundles = historyBundles
  }

  convertTimestamp(timestamp: string) {
    let options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = new Date(Number(timestamp)).toLocaleDateString('en-US', options)
    return formattedDate
  }

  navigateToDataPlans(){
    let accountInfoData = localStorage.getItem('account-data')
    if(accountInfoData){
      this.router.navigate(['/data-plans'])
    }else{
      this.router.navigate(['/my-account'])
    }
  }

  fetchUpdatedBundleInfo(){
    let imei: any = localStorage.getItem('imei')
    let imeival = JSON.parse(imei)
    this.api.getBundles(imeival,null,null).subscribe(resp => {
      sessionStorage.setItem('bundleInfo',JSON.stringify(resp))
      this.setBundleInfo()
    })
  }

}
