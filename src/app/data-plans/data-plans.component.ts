import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-data-plans',
  templateUrl: './data-plans.component.html',
  styleUrls: ['./data-plans.component.css']
})
export class DataPlansComponent implements OnInit {

  bundleInfo: any = []
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getBundleInfo()
  }

  getBundleInfo() {
    let data: any = sessionStorage.getItem('bundleInfo')
    let parsedData = JSON.parse(data)
    if (parsedData !== undefined || parsedData !== null) {
      this.bundleInfo = parsedData['bundles']
      console.log(this.bundleInfo)
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
    return name.replace('<br/>', ' - ')
  }

  computeBundlePrice(currencyType: string, goodsPrice: string) {
    let resp = ''
    let price = Number(goodsPrice.slice(0, -2));
    switch (currencyType) {
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

  bytesToNearestGB(bytes:string) {
    const gigabyte = 1024 * 1024 * 1024; // 1 GB in bytes
    const nearestGB = Math.round(Number(bytes) / gigabyte);
    if(nearestGB == 0){
      const megabyte = 1024 * 1024
      const nearestMB = Math.round(Number(bytes) / megabyte);
      return `${nearestMB} MB`
    }
    return `${nearestGB} GB`
  }

}


