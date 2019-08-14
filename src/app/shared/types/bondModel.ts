export interface Bond {
  id?: number;
  cusip: string;
  originalFace: string;
  remainingFace: string;
  marketPrice: string;
  bookPrice: string;
  bookValue: string;
  maturityDate: string;
  couponRate: string;
  parValue: string;
  marketValue: string;
  aveLife: string;
  effectiveDuration: string;
  nextCallDateAndCallPrice: string;
  cusipDescription: string;
  settlementDate: string;
  action: string;
}

export class BondMaker {
  static createEmpty(): Bond {
    return {
      cusip: '',
      originalFace: '',
      remainingFace: '',
      marketPrice: '',
      bookPrice: '',
      bookValue: '',
      maturityDate: '',
      couponRate: '',
      parValue: '',
      marketValue: '',
      aveLife: '',
      effectiveDuration: '',
      nextCallDateAndCallPrice: '',
      cusipDescription: '',
      settlementDate: '',
      action: '',
    };
  }
}
