import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {
  ChartType,
  IWorkbookFont,
  Workbook,
  WorkbookFormat,
} from 'igniteui-angular-excel/ES5/excel.core';

import { ExcelUtility } from '../../shared/helpers/excel-utility';
import { upperCaseAlp } from '../../shared/consts/alphabet';
import { TRANSACTION_DETAILS } from '../../shared/consts/transaction-details';
import { CASH_FLOW_COL } from '../../shared/consts/cash-flow';
import { ExcelExporterService } from '../../shared/services/excel-exporter.service';
import { ChartOptions } from '../../shared/types/chart-options.model';
import { Details } from '../../../mocks/details';
import { CASH_FLOW } from '../../../mocks/cash-flow';
import { STRESSED } from '../../../mocks/stressedMock';

@Component({
  selector: 'app-simulation-reports',
  templateUrl: './simulation-reports.component.html',
  styleUrls: ['./simulation-reports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulationReportsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SimulationReportsComponent>,
    private excelService: ExcelExporterService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {
  }

  isLoading = false;
  selectedTab = 'info';
  transactionDetails = Details;
  transactionDetailsCol = TRANSACTION_DETAILS;
  cashFlow = CASH_FLOW;
  cashFlowCol = CASH_FLOW_COL;
  stressed = STRESSED;
  alphabet = upperCaseAlp;

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onExport(): void {
    const workbook = new Workbook(WorkbookFormat.Excel2007);
    const font: IWorkbookFont = workbook.styles().normalStyle.styleFormat.font;
    font.name = 'Times New Roman';
    font.height = 16 * 20;
    const sheet2 = workbook.worksheets().add('Stressed');
    this.transactionDetailsPage(workbook);
    this.cashFlowPage(workbook);

    this.isLoading = true;
    ExcelUtility
      .save(workbook, 'report')
      .then(() => this.isLoading = false)
      .catch(() => this.isLoading = false);
  }


  private transactionDetailsPage(workbook: Workbook): void {
    const sheet = workbook.worksheets().add('TransactionDetail');
    const header = sheet.getCell('A3');
    const sellLength = this.transactionDetails.sell.length;
    const buyLength = this.transactionDetails.buy.length;
    header.value = 'Transaction Details';

    this.excelService
      .setColumns(this.transactionDetailsCol, sheet, 4, 0);
    this.excelService
      .setCellsWithNestedData(this.transactionDetails.sell, this.transactionDetailsCol, sheet, 5, 0);
    this.excelService
      .setCells(this.transactionDetails.totalSell, this.transactionDetailsCol, sheet, sellLength + 6);

    this.excelService
      .setColumns(this.transactionDetailsCol, sheet, sellLength + 8, 0);
    this.excelService
      .setCellsWithNestedData(this.transactionDetails.buy, this.transactionDetailsCol, sheet, sellLength + 9, 0);
    this.excelService
      .setCells(this.transactionDetails.totalBuy, this.transactionDetailsCol, sheet, sellLength + buyLength + 10);

    this.excelService
      .setCells(this.transactionDetails.difference, this.transactionDetailsCol, sheet, sellLength + buyLength + 12);

  }

  private cashFlowPage(workbook: Workbook): void {
    const sheet = workbook.worksheets().add('CashFlow');
    const yearLength = this.cashFlow.reportCashFlow5Year.length;
    const monthLength = this.cashFlow.reportCashFlow12Month.length;
    const cashFLowColLength = this.cashFlowCol.length;
    const header = sheet.getCell('A3');
    const monthHeader = sheet.getCell('A7');
    const yearHeader = sheet.getCell(`${this.alphabet[cashFLowColLength + 3]}7`);
    const startRow = 11 + monthLength;
    header.value = 'Horizon Cashflow';
    monthHeader.value = '12 Month Horizon';
    yearHeader.value = '5 Year Horizon';

    this.excelService
      .setColumns(this.cashFlowCol, sheet, 9, 0);
    this.excelService
      .setCellsWithNestedData(this.cashFlow.reportCashFlow12Month, this.cashFlowCol, sheet, 10, 0);

    this.excelService
      .setColumns(this.cashFlowCol, sheet, 9, cashFLowColLength + 3);
    this.excelService
      .setCellsWithNestedData(this.cashFlow.reportCashFlow5Year, this.cashFlowCol, sheet, 10, cashFLowColLength + 3);
    const monthChart: ChartOptions = {
      startRow,
      endRow: startRow + 10,
      chartType: ChartType.ColumnClustered,
      startCell: 0,
      endCell: 5,
      byRows: false,
      dataRange: `${this.alphabet[0]}9:${this.alphabet[cashFLowColLength]}${10 + monthLength}`
    };
    sheet.getCell(`A${startRow - 1}`).value = '';
    this.excelService.generateChart(sheet, monthChart);

    const yearChart: ChartOptions = {
      startRow,
      endRow: startRow + 10,
      chartType: ChartType.ColumnClustered,
      startCell: 7,
      endCell: 12,
      byRows: false,
      dataRange: `${this.alphabet[cashFLowColLength + 3]}9:${this.alphabet[cashFLowColLength + 6]}${10 + yearLength}`
    };
    this.excelService.generateChart(sheet, yearChart);
  }
}
