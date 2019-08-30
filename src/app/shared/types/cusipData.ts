export interface CusipData {
  id?: number;
  cusip: string;
  originalFace: number;
  remainingFace: number;
  marketPrice: number;
  bookPrice: number;
  bookValue: number;
  maturityDate: string;
  couponRate: string;
  parValue: number;
  marketValue: number;
  aveLife: string;
  effectiveDuration: string;
  nextCallDateAndCallPrice: string;
  cusipDescription: string;
  settlementDate: string;
  action: string;
}

export class CusipDataMaker {
  static createEmpty(id: number): CusipData {
    return {
      id,
      cusip: '',
      originalFace: 0,
      remainingFace: 0,
      marketPrice: 0,
      bookPrice: 0,
      bookValue: 0,
      maturityDate: '',
      couponRate: '',
      parValue: 0,
      marketValue: 0,
      aveLife: '',
      effectiveDuration: '',
      nextCallDateAndCallPrice: '',
      cusipDescription: '',
      settlementDate: '',
      action: '',
    };
  }
}
