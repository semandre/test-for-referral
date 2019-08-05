import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulation-table',
  templateUrl: './simulation-table.component.html',
  styleUrls: ['./simulation-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulationTableComponent implements OnInit {

  @Input() items: any[];

  objectKeys = Object.keys;

  header = [
    { name: 'CUSIP', value: 'cusip' },
    { name: 'Face amount', value: 'faceAmount' },
    { name: 'Market Place', value: 'marketPrice' },
    { name: 'Book Price', value: 'bookPrice' },
    { name: 'Book Value', value: 'bookValue' },
    { name: 'Maturity Date', value: 'maturityDate' },
    { name: 'Coupon Rate', value: 'couponRate' },
    { name: 'Par Value', value: 'parValue' },
    { name: 'Market Value', value: 'marketValue' },
    { name: 'Face amount', value: 'aveLife' },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  checkForColumn(value: string): boolean {
    console.log(value);
    return !!this.header.find((data: any) => data.value === value);
  }

}
