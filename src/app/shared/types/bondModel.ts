export interface Bond {
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
  Action: string;
}

export class BondMaker {
  static createEmpty(): Bond {
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
      SettlementDates: '',
      Action: '',
    };
  }
}
