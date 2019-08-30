export interface TransactionDetailsView {
  buy: TransactionDetails[];
  sell: TransactionDetails[];
  totalBuy: TransactionDetails;
  totalSell: TransactionDetails;
  difference: TransactionDetails;
}

export interface TransactionDetails {
  action: string;
  faceAmt: number;
  securityDesc: string;
  factor: number;
  coupon: number;
  currentPar: number;
  maturity: string;
  bookPrice: number;
  bookVal: number;
  marketPrice: number;
  marketVal: number;
  gainLoss: number;
  mktYield: number;
  bookYield: number;
  avgLife: number;
  effDuration: number;
  annualIncome: number;
  annualAmortization: number;
  annualAccretion: number;
  taxableBond: string;
  searchStr: string;
  afterTaxAnnual: number;
}
