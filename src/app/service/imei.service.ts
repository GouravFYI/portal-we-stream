import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IMEIService {

  imeiInfo:any = null
  constructor() { }

  setImeiInfo(data:any){
    this.imeiInfo = data
  }

  getImeiInfo(){
    return this.imeiInfo
  }

}
