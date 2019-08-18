export interface CashFlowDetails {
  reportCashFlow12Month: any;
  reportCashFlow5Year: any;
}

export interface CashFlow {
   cusip: string;
   action: string;
   dateAsOf: string;
   month: string;
   zBefore: number;
   zAfter: number;
   difference: number;
}
