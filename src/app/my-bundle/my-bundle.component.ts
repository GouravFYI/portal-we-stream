import { Component, OnInit } from '@angular/core';
import { BundleinfoService } from '../service/bundleinfo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-bundle',
  templateUrl: './my-bundle.component.html',
  styleUrls: ['./my-bundle.component.css']
})
export class MyBundleComponent implements OnInit {
  activeBundle: any = null
  readyForUsageBundle: any = null
  historyBundles: any = null

  constructor(private bundleInfo: BundleinfoService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('bundleInfo') !== null) {
      this.setBundleInfo()
    } else {
      this.router.navigate(['/login'])
    }
  }

  setBundleInfo() {
    let data: any = sessionStorage.getItem('bundleInfo')
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

}
