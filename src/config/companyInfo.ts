export const COMPANY_INFO = {
  brandName: 'Giftz Gallerei',
  legalName: 'Giftz Gallerei',
  registeredOfficeLabel: 'Registered Office',
  addressLines: [
    '19-25, Shanthi Bhavan, 4th Floor,',
    'D.K. Lane, Chickpet Cross,',
    'Bangalore - 560053',
  ],
  get fullAddress(): string {
    return this.addressLines.join('\n');
  },
  get singleLineAddress(): string {
    return this.addressLines.join(', ');
  },
  city: 'Bangalore',
  pincode: '560053',
  msme: 'UDYAM-KR-03-0257709',
  gstin: '29AEVPC5531P1ZR',
  state: 'Karnataka',
  stateCode: '29',
  phone: '+918748035555',
  phoneDisplay: '+91 87480 35555',
  whatsapp: '918748035555',
  email: 'Info@giftzgallerei.com',
} as const;
