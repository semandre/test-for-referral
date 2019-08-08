export interface Portfolio {
  id?: number;
  CUSIP: string;
  OriginalFace: string;
  MarketPrice: string;
  BookPrice: string;
  BookValue: string;
  MaturityDate: string;
  CouponRate: string;
  ParValue: string;
  MarketValue: string;
  AveLife: string;
  EffectiveDuration: string;
  CallDate: string;
  CallPrice: string;
  CUSIPDescription: string;
  SettlementDates: string;
}

export class PortfolioMaker {
  static createEmpty(): Portfolio {
    return {
      CUSIP: '',
      OriginalFace: '',
      MarketPrice: '',
      BookPrice: '',
      BookValue: '',
      MaturityDate: '',
      CouponRate: '',
      ParValue: '',
      MarketValue: '',
      AveLife: '',
      EffectiveDuration: '',
      CallDate: '',
      CallPrice: '',
      CUSIPDescription: '',
      SettlementDates: ''
    };
  }
}
