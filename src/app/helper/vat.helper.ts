export class Vat {
    percent: number
    constructor(account: any) {
        this.percent = 0
        let euList = euCountryList()
        if (
            account.countryOfOrigin === 'NL' ||
            (euList[account.countryOfOrigin] && account.accountType === 'personal') ||
            (euList[account.countryOfOrigin] && account.accountType === 'business' && account['vatNumber'] == "") ||
            !euList[account.countryOfOrigin]
        ) {
            this.percent = 21;
        }

    }
}

function euCountryList(): any {
    return {
        'AT': 'Austria',
        'BE': 'Belgium',
        'BG': 'Bulgaria',
        'CY': 'Cyprus',
        'CZ': 'Czechia',
        'DE': 'Germany',
        'DK': 'Denmark',
        'EE': 'Estonia',
        'ES': 'Spain',
        'FI': 'Finland',
        'FR': 'France',
        'GR': 'Greece',
        'HR': 'Croatia',
        'HU': 'Hungary',
        'IE': 'Ireland',
        'IT': 'Italy',
        'LT': 'Lithuania',
        'LU': 'Luxembourg',
        'LV': 'Latvia',
        'MT': 'Malta',
        'NL': 'Netherlands',
        'PL': 'Poland',
        'PT': 'Portugal',
        'RO': 'Romania',
        'SE': 'Sweden',
        'SI': 'Slovenia',
        'SK': 'Slovakia'
    };
}
