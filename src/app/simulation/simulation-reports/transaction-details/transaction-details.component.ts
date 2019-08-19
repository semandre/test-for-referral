import { Component, Input, OnInit } from '@angular/core';

import { TRANSACTION_DETAILS } from '../../../shared/consts/transaction-details';
import { TransactionDetailsView } from '../../../shared/types/transaction.model';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {

  @Input() items: TransactionDetailsView;

  columns = TRANSACTION_DETAILS;

  constructor() {
  }

  ngOnInit(): void {
  }

}
