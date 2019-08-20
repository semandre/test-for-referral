import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { CashFlow, CashFlowDetails } from '../../../shared/types/cash-flow.model';
import { CASH_FLOW_COL } from '../../../shared/consts/cash-flow';
import { ChartType } from 'igniteui-angular-excel/ES5/excel.core';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss']
})
export class CashFlowComponent implements OnInit, OnChanges {

  @Input() items: CashFlowDetails;

  columns = CASH_FLOW_COL;
  styles = { overflow: 'hidden', marginTop: 0 };
  selectedTab = '5y';
  yearChartData = [];
  monthChartData = [];
  chartType = ChartType.ColumnStacked;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.yearChartData = this.items.reportCashFlow5Year.map((data: CashFlow) => ({
        month: data.month,
        before: data.zBefore,
        after: data.zAfter
      }));
      this.monthChartData = this.items.reportCashFlow12Month.map((data: CashFlow) => ({
        month: data.month,
        before: data.zBefore,
        after: data.zAfter
      }));
    }
  }

}
