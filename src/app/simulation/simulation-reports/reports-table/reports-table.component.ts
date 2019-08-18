import { Component, Input, OnInit } from '@angular/core';
import { TableColumn } from '../../../shared/types/tableColumnsModel';

@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss']
})
export class ReportsTableComponent implements OnInit {

  @Input() columns: TableColumn[];
  @Input() items: any[];
  @Input() styles: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
