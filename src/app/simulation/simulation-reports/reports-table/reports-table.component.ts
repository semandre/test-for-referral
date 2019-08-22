import { Component, Input } from '@angular/core';
import { TableColumn } from '../../../shared/types/tableColumnsModel';

@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss']
})
export class ReportsTableComponent {

  @Input() columns: TableColumn[];
  @Input() boldCol: boolean;
  @Input() items: any[];
  @Input() styles: any;
  @Input() additionalData: any;

}
