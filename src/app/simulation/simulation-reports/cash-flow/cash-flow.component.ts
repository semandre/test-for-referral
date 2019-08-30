import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CashFlow, CashFlowDetails } from '../../../shared/types/cash-flow.model';
import { CASH_FLOW_COL } from '../../../shared/consts/cash-flow';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss']
})
export class CashFlowComponent implements OnChanges {

  @Input() items: CashFlowDetails;

  columns = CASH_FLOW_COL;
  styles = { overflow: 'hidden', marginTop: 0 };
  selectedTab = '5y';
  yearChartData = [];
  monthChartData = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.yearChartData = this.items.cashFlow5Year.map((data: CashFlow) => ({
        month: data.dateAsOf,
        before: data.zBefore,
        after: data.zAfter
      }));
      this.monthChartData = this.items.cashFlow12Month.map((data: CashFlow) => ({
        month: data.dateAsOf,
        before: data.zBefore,
        after: data.zAfter
      }));
    }
  }

}
