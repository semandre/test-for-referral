import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IgxExcelExporterOptions, IgxExcelExporterService } from 'igniteui-angular';

import { TableColumn } from '../../../shared/types/tableColumnsModel';
import { Portfolio } from '../../../shared/types/portfolioModel';

@Component({
  selector: 'app-simulation-table',
  templateUrl: './simulation-table.component.html',
  styleUrls: ['./simulation-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulationTableComponent implements OnInit {


  @Input() items: any[];
  @Input() columns: TableColumn[];

  objectKeys = Object.keys;
  selectedRows = [];

  constructor(private excelExportService: IgxExcelExporterService) {
  }

  ngOnInit(): void {
  }

  checkForColumn(value: string): boolean {
    return !!this.columns.find((data: any) => data.value === value && data.show);
  }

  checkIfSelected(id: any): boolean {
    return !!this.selectedRows.find((data: any) => data.id === id);
  }

  selectRow(item: any, event: MouseEvent): void {
    if (event.shiftKey && this.selectedRows.length) {
      this.selectedRows = this.onShiftKey(item);
    } else if (event.ctrlKey) {
      this.selectedRows = this.onCtrlKey(item);
    } else {
      this.selectedRows = [item];
    }
    console.log(this.selectedRows);
  }

  onExport(): void {
    // Changing items keys name to have as in table view
    const data = this.selectedRows.map((item: Portfolio) => {
      return this.columns.reduce((acc: any, cur: TableColumn) => {
        return cur.show ? { ...acc, [cur.name]: item[cur.value] } : acc;
      }, {});
    });
    this.excelExportService.exportData(data, new IgxExcelExporterOptions('ExportedDataFile'));
  }

  private onCtrlKey(item: any): any[] {
    return this.selectedRows.find((data: any) => data.id === item.id) ?
      this.selectedRows.filter((data: any) => data.id !== item.id) :
      [...this.selectedRows, item];
  }


  private onShiftKey(item: any): any[] {
    const rowIndex = this.selectedRows.findIndex((data: any) => data.id === item.id);
    const lastIndex = this.items.findIndex((row: any) => row.id === item.id);
    if (rowIndex !== -1) {
      console.log(1);
      const index = this.items.findIndex((row: any) => row.id === this.selectedRows[0].id);
      return this.items.slice(index, lastIndex + 1);
    } else {
      console.log(2);
      const index = this.items.findIndex((row: any) => row.id === this.selectedRows.slice(-1)[0].id);
      return lastIndex <= index ? this.items.slice(lastIndex, index + 1) : this.items.slice(index, lastIndex + 1);
    }
  }
}
