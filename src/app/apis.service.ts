import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from "./url.enums"

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private API_URL = Url.WebPortal;
  constructor(private httpClient: HttpClient) { }

  private performGetRequest(url: string, params?: any): Observable<any> {
    return this.httpClient.get(url, { params });
  }

  private performPostRequest(url: string, body?: any): Observable<any> {
    return this.httpClient.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  getCountries(): Observable<any> {
    return this.performGetRequest(`${this.API_URL}system/countries`);
  }

  imeiValidation(imei: string): Observable<any> {
    return this.performGetRequest(`${this.API_URL}system/status/${imei}`);
  }

  vatValidation(vatNumber: string, countryCode: string): Observable<any> {
    return this.performGetRequest(this.API_URL + 'system/status?vatNumber=' + vatNumber + '&countryCode=' + countryCode);
  }

  getBundles(imei: string, accountInfo: any, referralCode: any): Observable<any> {
    const dummyAccountInfo = {
      "accountType": '',
      "imei": '',
      "imei-valid-value": '',
      "firstName": '',
      "lastName": '',
      "email": "",
      "countryOfOrigin": '',
      "pCity": '',
      "pAddress": "",
      "pPostal": '',
      "sameAsPermanent": '',
      "rCity": '',
      "rAddress": "",
      "rPostal": '',
      "confirmInfo": '',
      "bankCountry": '',
      "rCountry": '',
      "pCountry": '',
      "countryName": ''
    };

    const url = `${this.API_URL}user/bundles?country=ALL&imei=${imei}&referralCode=${referralCode}`;
    return this.performPostRequest(url, accountInfo || JSON.stringify(dummyAccountInfo));
  }

  getOverviewCountries() {
    return [
      { "name": "Albania" },
      { "name": "Algeria" },
      { "name": "Anguilla" },
      { "name": "Antigua and Barbuda" },
      { "name": "Argentina" },
      { "name": "Armenia" },
      { "name": "Aruba" },
      { "name": "Australia" },
      { "name": "Austria" },
      { "name": "Azerbaijan" },
      { "name": "Bahamas" },
      { "name": "Bahrain" },
      { "name": "Bangladesh" },
      { "name": "Barbados" },
      { "name": "Belarus" },
      { "name": "Belgium" },
      { "name": "Bermuda" },
      { "name": "Bonaire" },
      { "name": "Bosnia & Herzegovina " },
      { "name": "Brazil" },
      { "name": "British Virgin Islands" },
      { "name": "Brunei" },
      { "name": "Bulgaria" },
      { "name": "Cambodia" },
      { "name": "Canada" },
      { "name": "Cayman Islands" },
      { "name": "Chad" },
      { "name": "Chile" },
      { "name": "China" },
      { "name": "Colombia" },
      { "name": "Congo Dem. Rep." },
      { "name": "Costa Rica" },
      { "name": "Croatia" },
      { "name": "Curacao" },
      { "name": "Cyprus" },
      { "name": "Czech Republic" },
      { "name": "Denmark" },
      { "name": "Desirade" },
      { "name": "Dominica" },
      { "name": "Dominican Republic" },
      { "name": "Ecuador" },
      { "name": "Egypt" },
      { "name": "El Salvador" },
      { "name": "Estonia" },
      { "name": "Faroe Islands" },
      { "name": "Fiji" },
      { "name": "Finland" },
      { "name": "France" },
      { "name": "French Guyana" },
      { "name": "Georgia" },
      { "name": "Germany" },
      { "name": "Ghana" },
      { "name": "Gibraltar" },
      { "name": "Greece" },
      { "name": "Grenada" },
      { "name": "Guadeloupe" },
      { "name": "Guam" },
      { "name": "Guatemala" },
      { "name": "Guernsey" },
      { "name": "Guyana" },
      { "name": "Haiti" },
      { "name": "Honduras" },
      { "name": "Hong Kong" },
      { "name": "Hungary" },
      { "name": "Iceland" },
      { "name": "India" },
      { "name": "Indonesia" },
      { "name": "Ireland" },
      { "name": "Isle of Man" },
      { "name": "Israel" },
      { "name": "Italy" },
      { "name": "Jamaica" },
      { "name": "Japan" },
      { "name": "Jersey" },
      { "name": "Kazakhstan" },
      { "name": "Kenya" },
      { "name": "Korea" },
      { "name": "Kuwait" },
      { "name": "Kyrgyzstan" },
      { "name": "Laos" },
      { "name": "Latvia" },
      { "name": "Liechtenstein" },
      { "name": "Lithuania" },
      { "name": "Luxembourg" },
      { "name": "Macao" },
      { "name": "Macedonia" },
      { "name": "Madagascar" },
      { "name": "Malaysia" },
      { "name": "Malta" },
      { "name": "Marie-Galante" },
      { "name": "Martinique" },
      { "name": "Mauritius" },
      { "name": "Mexico" },
      { "name": "Moldova" },
      { "name": "Mongolia" },
      { "name": "Montenegro" },
      { "name": "Montserrat" },
      { "name": "Morocco" },
      { "name": "Myanmar" },
      { "name": "Nepal" },
      { "name": "Netherlands" },
      { "name": "New Zealand" },
      { "name": "Nicaragua" },
      { "name": "Nigeria" },
      { "name": "Norway" },
      { "name": "Oman" },
      { "name": "Pakistan" },
      { "name": "Panama" },
      { "name": "Paraguay" },
      { "name": "Peru" },
      { "name": "Philippines" },
      { "name": "Poland" },
      { "name": "Portugal" },
      { "name": "Puerto Rico" },
      { "name": "Qatar" },
      { "name": "Reunion" },
      { "name": "Romania" },
      { "name": "Russia" },
      { "name": "Saint Barthelemy" },
      { "name": "Saint Kitts & Nevis" },
      { "name": "Saint Lucia" },
      { "name": "Saint Martin" },
      { "name": "Saint Vincent and the Grenadines " },
      { "name": "Saintes" },
      { "name": "Saipan" },
      { "name": "Saudi Arabia" },
      { "name": "Serbia" },
      { "name": "Singapore" },
      { "name": "Slovakia" },
      { "name": "Slovenia" },
      { "name": "South Africa" },
      { "name": "Spain" },
      { "name": "Sri Lanka" },
      { "name": "Surinam" },
      { "name": "Sweden" },
      { "name": "Switzerland" },
      { "name": "Taiwan" },
      { "name": "Tajikistan" },
      { "name": "Tanzania" },
      { "name": "Thailand" },
      { "name": "Trinidad & Tobago" },
      { "name": "Tunisia" },
      { "name": "Turkey" },
      { "name": "Turks and Caicos Islands" },
      { "name": "Ukraine" },
      { "name": "United Arab Emirates" },
      { "name": "United Kingdom" },
      { "name": "United States" },
      { "name": "Uruguay" },
      { "name": "Uzbekistan" },
      { "name": "Venezuela" },
      { "name": "Vietnam" },
      { "name": "Zambia" }
    ]
  }

  payPaypal(code: string, params: any): Observable<any> {
    const url = `${this.API_URL}user/bundles/${code}?country=CWS&${new URLSearchParams(params).toString()}`;
    return this.performPostRequest(url, null);
  }

  payCreditCard(params: any, accountData: any): Observable<any> {
    if (params.ait) {
      accountData = {
        "accountType": '',
        "imei": '',
        "imei-valid-value": '',
        "firstName": '',
        "lastName": '',
        "email": "",
        "countryOfOrigin": '',
        "pCity": '',
        "pAddress": "",
        "pPostal": '',
        "sameAsPermanent": '',
        "rCity": '',
        "rAddress": "",
        "rPostal": '',
        "confirmInfo": '',
        "bankCountry": '',
        "rCountry": '',
        "pCountry": '',
        "countryName": ''
      };
    } else {
      params.ait = 'NA';
    }

    const url = `${this.API_URL}payment?${new URLSearchParams(params).toString()}`;
    return this.performPostRequest(url, JSON.stringify(accountData));
  }

  directPurchase(params: any, accountData: any): Observable<any> {
    if (params.ait) {
      accountData = {
        "accountType": '',
        "imei": '',
        "imei-valid-value": '',
        "firstName": '',
        "lastName": '',
        "email": "",
        "countryOfOrigin": '',
        "pCity": '',
        "pAddress": "",
        "pPostal": '',
        "sameAsPermanent": '',
        "rCity": '',
        "rAddress": "",
        "rPostal": '',
        "confirmInfo": '',
        "bankCountry": '',
        "rCountry": '',
        "pCountry": '',
        "countryName": ''
      };
    }

    const url = `${this.API_URL}payment?${new URLSearchParams(params).toString()}`;
    return this.performPostRequest(url, JSON.stringify(accountData));
  }

  verifyCreditCardPayment(orderId: string, imei: string): Observable<any> {
    const params = {
      orderId: orderId,
      imei: imei
    };

    const url = `${this.API_URL}payment_callback?${new URLSearchParams(params).toString()}`;
    return this.performPostRequest(url, null);
  }

  saveAccount(accountData: any): Observable<any> {
    return this.performPostRequest(`${this.API_URL}user/account/save`, JSON.stringify(accountData));
  }

  getAccountInfoFromToken(ait: string): Observable<any> {
    return this.performGetRequest(`${this.API_URL}user/ait?tokenValue=${ait}`);
  }

  topUpKLM(imei: string, email: string): Observable<any> {
    const data = {
      imei: imei,
      email: email
    };
    return this.performPostRequest(`${this.API_URL}payment/klm-initial`, JSON.stringify(data));
  }

  topUpFlyingBlue(imei: string, email: string): Observable<any> {
    const data = {
      imei: imei,
      email: email
    };
    return this.performPostRequest(`${this.API_URL}payment/flying-blue-initial`, JSON.stringify(data));
  }

  topUpLengers(imei: string, email: string): Observable<any> {
    const data = {
      imei: imei,
      email: email
    };
    return this.performPostRequest(`${this.API_URL}payment/lengers-initial`, JSON.stringify(data));
  }

  initPaypalPayment(accountData: any, bundle: any, ait: string): Observable<any> {
    let params = `imei=${accountData.imei || bundle.imei}&dataPlan=${bundle.dataPlan}&bundleCode=${bundle.code}&currency=${bundle.currency}`;

    if (ait) {
      params += `&ait=${ait}`;
      accountData = {
        "accountType": '',
        "imei": '',
        "imei-valid-value": '',
        "firstName": '',
        "lastName": '',
        "email": "",
        "countryOfOrigin": '',
        "pCity": '',
        "pAddress": "",
        "pPostal": '',
        "sameAsPermanent": '',
        "rCity": '',
        "rAddress": "",
        "rPostal": '',
        "confirmInfo": '',
        "bankCountry": '',
        "rCountry": '',
        "pCountry": '',
        "countryName": ''
      };
    } else {
      params += '&ait=NA';
    }

    return this.performPostRequest(`${this.API_URL}payment/paypal/init-payment?${params}`, JSON.stringify(accountData));
  }

  getLocation(): Observable<any> {
    const countryToContinentMap: { [key: string]: string } = {
      "Afghanistan": "Asia",
      "Aland Islands": "Europe",
      "Albania": "Europe",
      "Algeria": "Africa",
      "Andorra": "Europe",
      "Angola": "Africa",
      "Anguilla": "North America",
      "Antigua and Barbuda": "North America",
      "Argentina": "South America",
      "Armenia": "Europe",
      "Aruba": "North America",
      "Australia": "Oceania",
      "Austria": "Europe",
      "Azerbaijan": "Europe",
      "Bahamas": "North America",
      "Bahamas, The": "North America",
      "Bahrain": "Asia",
      "Bangladesh": "Asia",
      "Barbados": "North America",
      "Belarus": "Europe",
      "Belgium": "Europe",
      "Belize": "North America",
      "Benin": "Africa",
      "Bermuda": "North America",
      "Bhutan": "Asia",
      "Bolivia": "South America",
      "Bosnia and Herzegovina": "Europe",
      "Botswana": "Africa",
      "Bouvet Island": "South America",
      "Brazil": "South America",
      "British Indian Ocean Territory": "Asia",
      "British Virgin Islands": "North America",
      "Brunei": "Asia",
      "Bulgaria": "Europe",
      "Burkina": "Africa",
      "Burkina Faso": "Africa",
      "Burma": "Asia",
      "Burma (Myanmar)": "Asia",
      "Burundi": "Africa",
      "Cambodia": "Asia",
      "Cameroon": "Africa",
      "Canada": "North America",
      "Cape Verde": "Africa",
      "Cayman Islands": "North America",
      "Central African Republic": "Africa",
      "Chad": "Africa",
      "Chile": "South America",
      "China": "Asia",
      "Christmas Island": "Oceania",
      "Cocos (Keeling) Islands": "Oceania",
      "Colombia": "South America",
      "Comoros": "Africa",
      "Congo": "Africa",
      "Congo, Democratic Republic of": "Africa",
      "Congo, Democratic Republic of the": "Africa",
      "Congo, Republic of the": "Africa",
      "Cook Islands": "Oceania",
      "Costa Rica": "North America",
      "Cote d'Ivoire": "Africa",
      "Croatia": "Europe",
      "Cuba": "North America",
      "Cyprus": "Europe",
      "Czech Republic": "Europe",
      "Denmark": "Europe",
      "Djibouti": "Africa",
      "Dominica": "North America",
      "Dominican Republic": "North America",
      "East Timor": "Asia",
      "Ecuador": "South America",
      "Egypt": "Africa",
      "El Salvador": "North America",
      "Equatorial Guinea": "Africa",
      "Eritrea": "Africa",
      "Estonia": "Europe",
      "Ethiopia": "Africa",
      "Falkland Islands (Islas Malvinas)": "South America",
      "Faroe Islands": "Oceania",
      "Fiji": "Oceania",
      "Finland": "Europe",
      "France": "Europe",
      "French Guiana": "South America",
      "French Polynesia": "Oceania",
      "French Southern and Antarctic Lands": "Oceania",
      "Gabon": "Africa",
      "Gambia": "Africa",
      "Gambia, The": "Africa",
      "Georgia": "Europe",
      "Germany": "Europe",
      "Ghana": "Africa",
      "Gibraltar": "Europe",
      "Greece": "Europe",
      "Greenland": "North America",
      "Grenada": "North America",
      "Guadeloupe": "North America",
      "Guam": "Oceania",
      "Guatemala": "North America",
      "Guernsey": "Europe",
      "Guinea": "Africa",
      "Guinea-Bissau": "Africa",
      "Guyana": "South America",
      "Haiti": "North America",
      "Heard Island and McDonald Islands": "Oceania",
      "Holy See (Vatican City)": "Europe",
      "Honduras": "North America",
      "Hong Kong": "Asia",
      "Hungary": "Europe",
      "Iceland": "Europe",
      "India": "Asia",
      "Indonesia": "Asia",
      "Iran": "Asia",
      "Iraq": "Asia",
      "Ireland": "Europe",
      "Isle of Man": "Europe",
      "Israel": "Asia",
      "Italy": "Europe",
      "Ivory Coast": "Africa",
      "Jamaica": "North America",
      "Japan": "Asia",
      "Jersey": "Europe",
      "Jordan": "Asia",
      "Kazakhstan": "Asia",
      "Kenya": "Africa",
      "Kiribati": "Oceania",
      "Korea, North": "Asia",
      "Korea, South": "Asia",
      "Kuwait": "Asia",
      "Kyrgyzstan": "Asia",
      "Laos": "Asia",
      "Latvia": "Europe",
      "Lebanon": "Asia",
      "Lesotho": "Africa",
      "Liberia": "Africa",
      "Libya": "Africa",
      "Liechtenstein": "Europe",
      "Lithuania": "Europe",
      "Luxembourg": "Europe",
      "Macau": "Asia",
      "Macedonia": "Europe",
      "Madagascar": "Africa",
      "Malawi": "Africa",
      "Malaysia": "Asia",
      "Maldives": "Asia",
      "Mali": "Africa",
      "Malta": "Europe",
      "Marshall Islands": "Oceania",
      "Martinique": "North America",
      "Mauritania": "Africa",
      "Mauritius": "Africa",
      "Mayotte": "Africa",
      "Mexico": "North America",
      "Micronesia": "Oceania",
      "Micronesia, Federated States of": "Oceania",
      "Moldova": "Europe",
      "Monaco": "Europe",
      "Mongolia": "Asia",
      "Montenegro": "Europe",
      "Montserrat": "North America",
      "Morocco": "Africa",
      "Mozambique": "Africa",
      "Namibia": "Africa",
      "Nauru": "Oceania",
      "Nepal": "Asia",
      "Netherlands": "Europe",
      "Netherlands Antilles": "North America",
      "New Caledonia": "Oceania",
      "New Zealand": "Oceania",
      "Nicaragua": "North America",
      "Niger": "Africa",
      "Nigeria": "Africa",
      "Niue": "Oceania",
      "Norfolk Island": "Oceania",
      "Northern Mariana Islands": "Oceania",
      "Norway": "Europe",
      "Oman": "Asia",
      "Pakistan": "Asia",
      "Palau": "Oceania",
      "Palestine": "Asia",
      "Panama": "North America",
      "Papua New Guinea": "Oceania",
      "Paraguay": "South America",
      "Peru": "South America",
      "Philippines": "Asia",
      "Pitcairn Islands": "Asia",
      "Poland": "Europe",
      "Portugal": "Europe",
      "Puerto Rico": "North America",
      "Qatar": "Asia",
      "Reunion": "Africa",
      "Romania": "Europe",
      "Russia": "Asia",
      "Russian Federation": "Asia",
      "Rwanda": "Africa",
      "Saint Barthelemy": "North America",
      "Saint Helena": "Africa",
      "Saint Kitts and Nevis": "North America",
      "Saint Lucia": "North America",
      "Saint Martin": "North America",
      "Saint Pierre and Miquelon": "North America",
      "Saint Vincent and the Grenadines": "North America",
      "Samoa": "Oceania",
      "San Marino": "Europe",
      "Sao Tome and Principe": "Africa",
      "Saudi Arabia": "Asia",
      "Senegal": "Africa",
      "Serbia": "Europe",
      "Seychelles": "Africa",
      "Sierra Leone": "Africa",
      "Singapore": "Asia",
      "Slovakia": "Europe",
      "Slovenia": "Europe",
      "Solomon Islands": "Oceania",
      "Somalia": "Africa",
      "South Africa": "Africa",
      "South Georgia South Sandwich Islands": "South America",
      "South Sudan": "Africa",
      "Spain": "Europe",
      "Sri Lanka": "Asia",
      "Sudan": "Africa",
      "Suriname": "South America",
      "Svalbard": "Europe",
      "Swaziland": "Africa",
      "Sweden": "Europe",
      "Switzerland": "Europe",
      "Syria": "Asia",
      "Taiwan": "Asia",
      "Tajikistan": "Asia",
      "Tanzania": "Africa",
      "Thailand": "Asia",
      "Timor-Leste": "Asia",
      "Togo": "Africa",
      "Tokelau": "Oceania",
      "Tonga": "Oceania",
      "Trinidad and Tobago": "North America",
      "Tunisia": "Africa",
      "Turkey": "Asia",
      "Turkmenistan": "Asia",
      "Turks and Caicos Islands": "North America",
      "Tuvalu": "Oceania",
      "Uganda": "Africa",
      "Ukraine": "Europe",
      "United Arab Emirates": "Asia",
      "United Kingdom": "Europe",
      "United States": "North America",
      "Uruguay": "South America",
      "Uzbekistan": "Asia",
      "Vanuatu": "Oceania",
      "Vatican City": "Europe",
      "Venezuela": "South America",
      "Vietnam": "Asia",
      "Virgin Islands": "North America",
      "Wallis and Futuna": "Oceania",
      "Western Sahara": "Africa",
      "Yemen": "Asia",
      "Zambia": "Africa",
      "Zimbabwe": "Africa"
    };

    const def = new Observable(observer => {
      this.performGetRequest('http://ip-api.com/json')
        .subscribe(
          (data: any) => {
            data.continent = countryToContinentMap[data.country];
            observer.next(data);
            observer.complete();
          },
          () => {
            observer.error();
          }
        );
    });

    return def;
  }

}
