import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

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
export class StressedComponent implements OnInit, OnChanges {

  @Input() items: StressedDetails;
  @Input() styles: any;

  gainLossColumns = GAIN_LOSS_COL;
  beforeColumns = STRESSED_BEFORE_COL;
  columns = STRESSED_VALUE_COL;
  chartsData = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chartsData = this.items.shift.reduce((acc, cur, ind) => ([...acc, {
      shift: cur,
      before: this.items.before[ind].marketValue,
      after: this.items.after[ind].marketValue
    }]), []);
  }

}
