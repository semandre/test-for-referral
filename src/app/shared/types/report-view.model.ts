import { TransactionInfo } from './transaction-info.model';
import { CashFlowDetails } from './cash-flow.model';
import { StressedDetails } from './stressed.model';
import { TransactionDetails } from './transaction.model';

export class ReportViewModel {
  reportBondSwapDetails: TransactionInfo;
  reportCashFlowResult: CashFlowDetails;
  reportInstantaneousRateShift: StressedDetails;
  reportTransactionDetails: TransactionDetails;
}
