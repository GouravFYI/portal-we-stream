import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-country-overview',
  templateUrl: './country-overview.component.html',
  styleUrls: ['./country-overview.component.css']
})
export class CountryOverviewComponent implements OnInit {

  filteredCountries: any[] = [];

  countries = [
    {
      "cc": "AE",
      "name": "United Arab Emirates"
    },
    {
      "cc": "AG",
      "name": "Antigua and Barbuda"
    },
    {
      "cc": "AI",
      "name": "Anguilla"
    },
    {
      "cc": "AL",
      "name": "Albania"
    },
    {
      "cc": "AM",
      "name": "Armenia"
    },
    {
      "cc": "AR",
      "name": "Argentina"
    },
    {
      "cc": "AT",
      "name": "Austria"
    },
    {
      "cc": "AU",
      "name": "Australia"
    },
    {
      "cc": "AW",
      "name": "Aruba"
    },
    {
      "cc": "AZ",
      "name": "Azerbaijan"
    },
    {
      "cc": "BA",
      "name": "Bosnia and Herzegovina"
    },
    {
      "cc": "BB",
      "name": "Barbados"
    },
    {
      "cc": "BD",
      "name": "Bangladesh"
    },
    {
      "cc": "BE",
      "name": "Belgium"
    },
    {
      "cc": "BG",
      "name": "Bulgaria"
    },
    {
      "cc": "BH",
      "name": "Bahrain"
    },
    {
      "cc": "BM",
      "name": "Bermuda"
    },
    {
      "cc": "BN",
      "name": "Brunei"
    },
    {
      "cc": "BR",
      "name": "Brazil"
    },
    {
      "cc": "BS",
      "name": "Bahamas"
    },
    {
      "cc": "BY",
      "name": "Belarus"
    },
    {
      "cc": "CA",
      "name": "Canada"
    },
    {
      "cc": "CD",
      "name": "The Democratic Republic Of Congo"
    },
    {
      "cc": "CH",
      "name": "Switzerland"
    },
    {
      "cc": "CL",
      "name": "Chile"
    },
    {
      "cc": "CN",
      "name": "China"
    },
    {
      "cc": "CO",
      "name": "Colombia"
    },
    {
      "cc": "CR",
      "name": "Costa Rica"
    },
    {
      "cc": "CW",
      "name": "Curaçao"
    },
    {
      "cc": "CY",
      "name": "Cyprus"
    },
    {
      "cc": "CZ",
      "name": "Czech Republic"
    },
    {
      "cc": "DE",
      "name": "Germany"
    },
    {
      "cc": "DK",
      "name": "Denmark"
    },
    {
      "cc": "DM",
      "name": "Dominica"
    },
    {
      "cc": "DO",
      "name": "Dominican Republic"
    },
    {
      "cc": "DZ",
      "name": "Algeria"
    },
    {
      "cc": "EC",
      "name": "Ecuador"
    },
    {
      "cc": "EE",
      "name": "Estonia"
    },
    {
      "cc": "EG",
      "name": "Egypt"
    },
    {
      "cc": "ES",
      "name": "Spain"
    },
    {
      "cc": "FI",
      "name": "Finland"
    },
    {
      "cc": "FJ",
      "name": "Fiji"
    },
    {
      "cc": "FO",
      "name": "Faroe Islands"
    },
    {
      "cc": "FR",
      "name": "France"
    },
    {
      "cc": "GB",
      "name": "United Kingdom"
    },
    {
      "cc": "GD",
      "name": "Grenada"
    },
    {
      "cc": "GE",
      "name": "Georgia"
    },
    {
      "cc": "GG",
      "name": "Guernsey"
    },
    {
      "cc": "GH",
      "name": "Ghana"
    },
    {
      "cc": "GI",
      "name": "Gibraltar"
    },
    {
      "cc": "GR",
      "name": "Greece"
    },
    {
      "cc": "GT",
      "name": "Guatemala"
    },
    {
      "cc": "GU",
      "name": "Guam"
    },
    {
      "cc": "GY",
      "name": "Guyana"
    },
    {
      "cc": "HK",
      "name": "Hong Kong"
    },
    {
      "cc": "HN",
      "name": "Honduras"
    },
    {
      "cc": "HR",
      "name": "Croatia"
    },
    {
      "cc": "HT",
      "name": "Haiti"
    },
    {
      "cc": "HU",
      "name": "Hungary"
    },
    {
      "cc": "ID",
      "name": "Indonesia"
    },
    {
      "cc": "IE",
      "name": "Ireland"
    },
    {
      "cc": "IL",
      "name": "Israel"
    },
    {
      "cc": "IM",
      "name": "Isle Of Man"
    },
    {
      "cc": "IN",
      "name": "India"
    },
    {
      "cc": "IS",
      "name": "Iceland"
    },
    {
      "cc": "IT",
      "name": "Italy"
    },
    {
      "cc": "JE",
      "name": "Jersey"
    },
    {
      "cc": "JM",
      "name": "Jamaica"
    },
    {
      "cc": "JP",
      "name": "Japan"
    },
    {
      "cc": "KE",
      "name": "Kenya"
    },
    {
      "cc": "KG",
      "name": "Kyrgyzstan"
    },
    {
      "cc": "KH",
      "name": "Cambodia"
    },
    {
      "cc": "KN",
      "name": "Saint Kitts And Nevis"
    },
    {
      "cc": "KR",
      "name": "South Korea"
    },
    {
      "cc": "KW",
      "name": "Kuwait"
    },
    {
      "cc": "KY",
      "name": "Cayman Islands"
    },
    {
      "cc": "KZ",
      "name": "Kazakhstan"
    },
    {
      "cc": "LA",
      "name": "Laos"
    },
    {
      "cc": "LC",
      "name": "Saint Lucia"
    },
    {
      "cc": "LI",
      "name": "Liechtenstein"
    },
    {
      "cc": "LK",
      "name": "Sri Lanka"
    },
    {
      "cc": "LT",
      "name": "Lithuania"
    },
    {
      "cc": "LU",
      "name": "Luxembourg"
    },
    {
      "cc": "LV",
      "name": "Latvia"
    },
    {
      "cc": "MA",
      "name": "Morocco"
    },
    {
      "cc": "MD",
      "name": "Moldova"
    },
    {
      "cc": "ME",
      "name": "Montenegro"
    },
    {
      "cc": "MF",
      "name": "Saint Martin"
    },
    {
      "cc": "MG",
      "name": "Madagascar"
    },
    {
      "cc": "MK",
      "name": "Macedonia"
    },
    {
      "cc": "MM",
      "name": "Myanmar"
    },
    {
      "cc": "MN",
      "name": "Mongolia"
    },
    {
      "cc": "MO",
      "name": "Macao"
    },
    {
      "cc": "MQ",
      "name": "Martinique"
    },
    {
      "cc": "MS",
      "name": "Montserrat"
    },
    {
      "cc": "MT",
      "name": "Malta"
    },
    {
      "cc": "MU",
      "name": "Mauritius"
    },
    {
      "cc": "MX",
      "name": "Mexico"
    },
    {
      "cc": "MY",
      "name": "Malaysia"
    },
    {
      "cc": "NG",
      "name": "Nigeria"
    },
    {
      "cc": "NI",
      "name": "Nicaragua"
    },
    {
      "cc": "NL",
      "name": "Netherlands"
    },
    {
      "cc": "NO",
      "name": "Norway"
    },
    {
      "cc": "NP",
      "name": "Nepal"
    },
    {
      "cc": "NZ",
      "name": "New Zealand"
    },
    {
      "cc": "OM",
      "name": "Oman"
    },
    {
      "cc": "PA",
      "name": "Panama"
    },
    {
      "cc": "PE",
      "name": "Peru"
    },
    {
      "cc": "PH",
      "name": "Philippines"
    },
    {
      "cc": "PK",
      "name": "Pakistan"
    },
    {
      "cc": "PL",
      "name": "Poland"
    },
    {
      "cc": "PR",
      "name": "Puerto Rico"
    },
    {
      "cc": "PT",
      "name": "Portugal"
    },
    {
      "cc": "PY",
      "name": "Paraguay"
    },
    {
      "cc": "QA",
      "name": "Qatar"
    },
    {
      "cc": "RE",
      "name": "Reunion"
    },
    {
      "cc": "RO",
      "name": "Romania"
    },
    {
      "cc": "MP",
      "name": "Saipan"
    },
    {
      "cc": "FR",
      "name": "Saintes"
    },
    {
      "cc": "RS",
      "name": "Serbia"
    },
    {
      "cc": "RU",
      "name": "Russia"
    },
    {
      "cc": "SA",
      "name": "Saudi Arabia"
    },
    {
      "cc": "SE",
      "name": "Sweden"
    },
    {
      "cc": "SG",
      "name": "Singapore"
    },
    {
      "cc": "SI",
      "name": "Slovenia"
    },
    {
      "cc": "SK",
      "name": "Slovakia"
    },
    {
      "cc": "SR",
      "name": "Suriname"
    },
    {
      "cc": "SV",
      "name": "El Salvador"
    },
    {
      "cc": "TC",
      "name": "Turks And Caicos Islands"
    },
    {
      "cc": "TD",
      "name": "Chad"
    },
    {
      "cc": "TH",
      "name": "Thailand"
    },
    {
      "cc": "TJ",
      "name": "Tajikistan"
    },
    {
      "cc": "TN",
      "name": "Tunisia"
    },
    {
      "cc": "TR",
      "name": "Turkey"
    },
    {
      "cc": "TT",
      "name": "Trinidad and Tobago"
    },
    {
      "cc": "TW",
      "name": "Taiwan"
    },
    {
      "cc": "TZ",
      "name": "Tanzania"
    },
    {
      "cc": "UA",
      "name": "Ukraine"
    },
    {
      "cc": "US",
      "name": "United States"
    },
    {
      "cc": "UY",
      "name": "Uruguay"
    },
    {
      "cc": "UZ",
      "name": "Uzbekistan"
    },
    {
      "cc": "VC",
      "name": "Saint Vincent And The Grenadines"
    },
    {
      "cc": "VE",
      "name": "Venezuela"
    },
    {
      "cc": "VG",
      "name": "British Virgin Islands"
    },
    {
      "cc": "VN",
      "name": "Vietnam"
    },
    {
      "cc": "ZA",
      "name": "South Africa"
    },
    {
      "cc": "ZM",
      "name": "Zambia"
    }
  ]

  constructor() { }

  ngOnInit(): void {
    this.filteredCountries = this.countries;
  }

  filterCountries(event:any): void {
    let text = event.target.value
    if(text == '' || /^\s*$/.test(text)){
      this.filteredCountries = this.countries;
    }else{
      this.filteredCountries = this.countries.filter(country =>
        country.name.toLowerCase().includes(text.toLowerCase())
      );
    }
  }

}
