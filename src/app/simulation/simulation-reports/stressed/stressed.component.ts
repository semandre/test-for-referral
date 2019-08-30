import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { StressedDetails } from '../../../shared/types/stressed.model';
import {
  GAIN_LOSS_COL,
  STRESSED_BEFORE_COL,
  STRESSED_VALUE_COL
} from '../../../shared/consts/stressed';

@Component({
  selector: 'app-stressed',
  templateUrl: './stressed.component.html',
  styleUrls: ['./stressed.component.scss']
})
export class StressedComponent implements OnChanges {

  @Input() items: StressedDetails;
  @Input() styles: any;

  gainLossColumns = GAIN_LOSS_COL;
  beforeColumns = STRESSED_BEFORE_COL;
  columns = STRESSED_VALUE_COL;
  chartsData = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.chartsData = this.items ? this.items.shift.reduce((acc: any[], cur: number, ind: number) => ([...acc, {
      shift: cur,
      before: this.items.before[ind].marketValue,
      after: this.items.after[ind].marketValue
    }]), []) : [];
  }

}
