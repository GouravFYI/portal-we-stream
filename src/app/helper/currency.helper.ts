export class Currency {
    name: string;
    sign: string;

    constructor(client: { customCountry?: string; countryOfOrigin?: string }) {
        if (client.customCountry) {
            switch (client.customCountry) {
                case 'PH':
                    this.name = 'PHP';
                    this.sign = '&#8369;';
                    break;
                default:
                    this.name = 'EUR';
                    this.sign = '&euro;';
                    break;
            }
        } else {
            switch (client.countryOfOrigin) {
                case 'US':
                    this.name = 'USD';
                    this.sign = '&dollar;';
                    break;
                case 'GB':
                    this.name = 'GBP';
                    this.sign = '&pound;';
                    break;
                default:
                    this.name = 'EUR';
                    this.sign = '&euro;';
                    break;
            }
        }
    }
}