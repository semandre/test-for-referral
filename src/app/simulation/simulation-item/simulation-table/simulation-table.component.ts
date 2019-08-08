import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, NgZone, OnInit } from '@angular/core';
import { IgxExcelExporterOptions, IgxExcelExporterService } from 'igniteui-angular';

import { TableColumn } from '../../../shared/types/tableColumnsModel';

@Component({
  selector: 'app-simulation-table',
  templateUrl: './simulation-table.component.html',
  styleUrls: ['./simulation-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulationTableComponent implements OnInit {


  @Input() items: any[];
  @Input() mainColumns: TableColumn[];
  @Input() optionalColumns: TableColumn[];

  onMenuOpen = false;
  objectKeys = Object.keys;
  columns = [];
  selectedRows = [];

  constructor(
    private excelExportService: IgxExcelExporterService,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.columns = this.initColumns();
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('click', this.onDocumentClick.bind(this));
    });
  }

  checkForColumn(value: string): boolean {
    return !!this.columns.find((data: any) => data.value === value && !data.hide);
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

    event.stopPropagation();
  }

  onExport(): void {
    // Changing items keys name to have as in table view
    const data = this.selectedRows.map((item: any) => {
      return this.columns.reduce((acc: any, cur: TableColumn) => {
        return !cur.hide ? { ...acc, [cur.name]: item[cur.value] } : acc;
      }, {});
    });
    this.excelExportService.exportData(data, new IgxExcelExporterOptions('ExportedDataFile'));
  }

  onUpdateColumns($event: TableColumn[]): void {
    this.optionalColumns = $event;
    this.columns = this.initColumns();
  }

  openMenu(): void {
    this.onMenuOpen = !this.onMenuOpen;
  }

  onDocumentClick(): void {
    this.selectedRows = [];
    this.cdRef.detectChanges();
  }

  private initColumns(): TableColumn[] {
    return [...this.mainColumns, ...this.optionalColumns];
  }

  private onCtrlKey(item: any): any[] {
    return this.selectedRows.find((data: any) => data.id === item.id) ?
      this.selectedRows.filter((data: any) => data.id !== item.id) :
      [...this.selectedRows, item];
  }


  private onShiftKey(item: any): any[] {
    const rowIndex = this.selectedRows.findIndex((data: any) => data.id === item.id);
    const lastIndex = this.items.findIndex((row: any) => row.id === item.id);
    const index = this.items.findIndex((row: any) => row.id === this.selectedRows[0].id);
    if (rowIndex !== -1) {
      return this.items.slice(index, lastIndex + 1);
    } else {
      return lastIndex <= index ? this.items.slice(lastIndex, index + 1) : this.items.slice(index, lastIndex + 1);
    }
  }
}
