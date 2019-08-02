export interface Portfolio {
  id?: number;
  cusip: string;
  faceAmount: string;
  marketPrice: string;
  bookPrice: string;
  bookValue: string;
  maturityDate: string;
  couponRate: string;
  parValue: string;
  marketValue: string;
  aveLife: string;
}

export class PortfolioMaker {
  static createEmpty(): Portfolio {
    return {
      cusip: '',
      faceAmount: '',
      marketPrice: '',
      bookPrice: '',
      bookValue: '',
      maturityDate: '',
      couponRate: '',
      parValue: '',
      marketValue: '',
      aveLife: ''
    };
  }
}
