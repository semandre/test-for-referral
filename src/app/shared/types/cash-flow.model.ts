export interface CashFlowDetails {
  reportCashFlow12Month: CashFlow[];
  reportCashFlow5Year: CashFlow[];
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
