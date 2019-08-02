import { Component, Input, OnInit } from '@angular/core';
import { Portfolio } from '../../../shared/types/portfolioModel';

@Component({
  selector: 'app-simulation-table',
  templateUrl: './simulation-table.component.html',
  styleUrls: ['./simulation-table.component.scss']
})
export class SimulationTableComponent implements OnInit {

  @Input() items: Portfolio[];

  header = [
    'CUSIP',
    'Face amount',
    'Market Place',
    'Book Price',
    'Book Value',
    'Maturity Date',
    'Coupon Rate',
    'Par Value',
    'Market Value',
    'Aver Life'
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
