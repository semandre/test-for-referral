export interface CashFlowDetails {
  cashFlow5Year: CashFlow[];
  cashFlow12Month: CashFlow[];
  total12Month: CashFlow;
  Total5Year: CashFlow;
}

export interface CashFlow {
   dateAsOf: string;
   zBefore: number;
   zAfter: number;
   difference: number;
}
