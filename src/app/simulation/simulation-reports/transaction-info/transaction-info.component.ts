import { Component, Input } from '@angular/core';
import { TransactionInfo } from '../../../shared/types/transaction-info.model';

@Component({
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss']
})
export class TransactionInfoComponent {

  @Input() info: TransactionInfo;

}
