import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BundleinfoService {

  bundleInfo:any = null
  constructor() { }

  setBundleInfo(data:any){
    this.bundleInfo = data
  }

  getBundleInfo(){
    return this.bundleInfo
  }

}
