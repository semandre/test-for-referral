import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { IgxExcelExporterOptions, IgxExcelExporterService } from 'igniteui-angular';

import { TableColumn } from '../../../shared/types/tableColumnsModel';
import { CusipData, CusipDataMaker } from '../../../shared/types/cusipData';
import { isEmpty } from '../../../shared/helpers/isEmpty';
import { SimulationDetails } from '../../../shared/types/simulation.model';

@Component({
  selector: 'app-simulation-table',
  templateUrl: './simulation-table.component.html',
  styleUrls: ['./simulation-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulationTableComponent implements OnInit, OnChanges {


  @Input() simulationDetails: SimulationDetails;
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
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('click', this.onDocumentClick.bind(this));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['simulationDetails']) {
      this.columns = this.initColumns();
    }
  }

  checkForColumn(value: string): boolean {
    return !!this.columns.find((data: TableColumn) => data.value === value && !data.hide);
  }

  checkIfSelected(id: number): boolean {
    return !!this.selectedRows.find((data: CusipData) => data.id === id);
  }

  selectRow(item: CusipData, event: MouseEvent): void {
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
    // Changing simulationDetails.cusipData keys name to have as in table view
    const data = this.selectedRows.map((item: CusipData) => {
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

  onRowsRemove(): void {
    this.simulationDetails.cusipData = this.simulationDetails.cusipData.filter((item: CusipData) =>
      !this.selectedRows.find((row: CusipData) => row.id === item.id));
  }

  onMakeAction(action: string): void {
    this.simulationDetails.cusipData = this.simulationDetails.cusipData.map((item: CusipData) => {
      const index = this.selectedRows.findIndex((row: CusipData) => row.id === item.id);
      return index > -1 ? { ...item, action } : item;
    });
  }

  onDocumentClick(): void {
    if (!this.cdRef['destroyed']) {
      this.selectedRows = [];
      this.cdRef.detectChanges();
    }
  }

  onAddNewLine(): void {
    this.simulationDetails.cusipData = this.simulationDetails.cusipData.length && isEmpty(this.simulationDetails.cusipData.slice(-1)[0]) ?
      this.simulationDetails.cusipData :
      [...this.simulationDetails.cusipData, CusipDataMaker.createEmpty()];
  }

  private initColumns(): TableColumn[] {
    return [...this.mainColumns, ...this.optionalColumns];
  }

  private onCtrlKey(item: CusipData): CusipData[] {
    return this.selectedRows.find((data: CusipData) => data.id === item.id) ?
      this.selectedRows.filter((data: CusipData) => data.id !== item.id) :
      [...this.selectedRows, item];
  }


  private onShiftKey(item: CusipData): CusipData[] {
    const rowIndex = this.selectedRows.findIndex((row: CusipData) => row.id === item.id);
    const lastIndex = this.simulationDetails.cusipData.findIndex((row: CusipData) => row.id === item.id);
    const index = this.simulationDetails.cusipData.findIndex((row: CusipData) => row.id === this.selectedRows[0].id);
    if (rowIndex !== -1) {
      return lastIndex <= index ?
        this.simulationDetails.cusipData.slice(lastIndex, index + 1) : this.simulationDetails.cusipData.slice(index, lastIndex + 1);
    } else {
      return lastIndex <= index ?
        this.simulationDetails.cusipData.slice(lastIndex, index + 1) : this.simulationDetails.cusipData.slice(index, lastIndex + 1);
    }
  }
}
