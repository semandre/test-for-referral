import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {
  ChartType,
  IWorkbookFont,
  Workbook, WorkbookColorInfo,
  WorkbookFormat, Worksheet,
} from 'igniteui-angular-excel/ES5/excel.core';

import { Details } from '../../../mocks/details';
import { CASH_FLOW } from '../../../mocks/cash-flow';
import { STRESSED } from '../../../mocks/stressedMock';
import { ExcelUtility } from '../../shared/helpers/excel-utility';
import { upperCaseAlp } from '../../shared/consts/alphabet';
import { TRANSACTION_DETAILS } from '../../shared/consts/transaction-details';
import { CASH_FLOW_COL } from '../../shared/consts/cash-flow';
import { ExcelExporterService } from '../../shared/services/excel-exporter.service';
import { ChartOptions } from '../../shared/types/chart-options.model';
import {
  GAIN_LOSS_COL,
  STRESSED_BEFORE_COL,
  STRESSED_VALUE_COL
} from '../../shared/consts/stressed';
import { TRANSACTION_INFO_MOCK } from '../../../mocks/transaction-info-mock';
import { transactionInfoPage } from './transaction-info/transaction-info-excel';
import { SimulationDetails } from '../../shared/types/simulation.model';
import { Subject } from 'rxjs';
import { SimulationReportsService } from '../../shared/services/simulation-reports.service';
import { map, takeUntil } from 'rxjs/operators';
import { ReportViewModel } from '../../shared/types/report-view.model';
import { CashFlowDetails } from '../../shared/types/cash-flow.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-simulation-reports',
  templateUrl: './simulation-reports.component.html',
  styleUrls: ['./simulation-reports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulationReportsComponent implements OnInit {

  private _destroy$ = new Subject<any>();
  private _simulationId: number;
  private _portfolio: string;
  private _dateAsOf: string;
  constructor(
    public dialogRef: MatDialogRef<SimulationReportsComponent>,
    private excelService: ExcelExporterService,
    private cdRef: ChangeDetectorRef,
    private simulationReportsService: SimulationReportsService,
    private ngxLoaderService: NgxUiLoaderService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, portfolio: string, dateAsOf: string }
  ) {
    this._simulationId = data.id;
    this._portfolio = data.portfolio;
    this._dateAsOf = data.dateAsOf;
  }

  isLoading = true;
  selectedTab = 'info';
  transactionDetails = null;
  transactionDetailsCol = TRANSACTION_DETAILS;
  cashFlow: CashFlowDetails = null;
  cashFlowCol = CASH_FLOW_COL;
  stressed = null;
  gainLossCol = GAIN_LOSS_COL;
  stressedBeforeCol = STRESSED_BEFORE_COL;
  stressedBaseCol = STRESSED_VALUE_COL;
  transactionInfo = null;
  alphabet = upperCaseAlp;

  ngOnInit(): void {
    setTimeout(() => {
      this.ngxLoaderService.startLoader('main-content-loader');
    });
    this.isLoading = true;
    this.simulationReportsService.fetchReport(this._portfolio, this._dateAsOf, this._simulationId)
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe( (report: ReportViewModel) => {
        console.log(report);
        this.transactionDetails = report.reportTransactionDetails;
        this.transactionInfo = report.reportBondSwapDetails;
        this.stressed = report.reportInstantaneousRateShift;
        this.cashFlow = report.reportCashFlowResult;
      }, error => {
        console.error(error);
      }, () => {
        this.isLoading = false;
        this.ngxLoaderService.stopLoader('main-content-loader');
        this.cdRef.detectChanges();
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onExport(): void {
    this.ngxLoaderService.startLoader('main-content-loader');
    const workbook = new Workbook(WorkbookFormat.Excel2007);
    const font: IWorkbookFont = workbook.styles().normalStyle.styleFormat.font;
    font.name = 'Verdana';
    font.height = 16 * 10;
    this.transactionDetailsPage(workbook);
    transactionInfoPage(workbook, this.transactionInfo);
    this.stressedPage(workbook);
    this.cashFlowPage(workbook);

    ExcelUtility
      .save(workbook, 'report')
      .then(() => {
        this.ngxLoaderService.stopLoader('main-content-loader');
        this.cdRef.markForCheck();
      })
      .catch(() => {
        this.cdRef.markForCheck();
      });
  }


  private transactionDetailsPage(workbook: Workbook): void {
    const sheet = workbook.worksheets().add('TransactionDetail');
    const header = sheet.getCell('A2');
    const sellLength = this.transactionDetails.sell.length;
    const buyLength = this.transactionDetails.buy.length;
    const colWidth = 5000;
    header.value = 'Transaction Details';
    sheet.rows(1).cells(0).cellFormat.font.bold = true;

    this.excelService
      .setColumns(this.transactionDetailsCol, sheet, 4, 0, colWidth);
    this.excelService
      .setCellsWithNestedData(this.transactionDetails.sell, this.transactionDetailsCol, sheet, 5, 0);
    this.excelService
      .setCells(this.transactionDetails.totalSell, this.transactionDetailsCol, sheet, 0, sellLength + 6 );

    this.excelService
      .setColumns(this.transactionDetailsCol, sheet, sellLength + 8, 0, colWidth);
    this.excelService
      .setCellsWithNestedData(this.transactionDetails.buy, this.transactionDetailsCol, sheet, sellLength + 9, 0);
    this.excelService
      .setCells(this.transactionDetails.totalBuy, this.transactionDetailsCol, sheet, 0, sellLength + buyLength + 10);

    this.excelService
      .setCells(this.transactionDetails.difference, this.transactionDetailsCol, sheet, 0, sellLength + buyLength + 12, );

  }

  private stressedPage(workbook: Workbook): void {
    const sheet = workbook.worksheets().add('Stressed');
    const header = sheet.getCell('A2');
    const secondRowOffset = this.stressed.gainLoss.length + 7;
    const firstColOffset = this.stressedBeforeCol.length + 3;
    const secondColOffset = this.stressedBaseCol.length + firstColOffset + 1;
    const colWidth = 3000;
    header.value = 'Instantaneous Rate Shift Gain / Loss';
    sheet.rows(1).cells(0).cellFormat.font.bold = true;

    this.excelService.setColumns(this.gainLossCol, sheet, 5, 1, colWidth);
    this.excelService.setCellsWithNestedData(this.stressed.gainLoss, this.gainLossCol, sheet, 6, 1);

    sheet.getCell(`A${secondRowOffset}`).value = 'Shift';
    this.excelService.setHeaderColStyle(sheet, secondRowOffset - 1, 0);
    this.excelService.setCellWithDataArray(this.stressed.shift, sheet, secondRowOffset + 1, 0);

    this.excelService.setColumns(this.stressedBeforeCol, sheet, secondRowOffset, 2, colWidth);
    const res = this.excelService.setCellsWithNestedData(this.stressed.before, this.stressedBeforeCol, sheet, secondRowOffset + 1, 2);

    this.excelService.setColumns(this.stressedBaseCol, sheet, secondRowOffset, firstColOffset, colWidth);
    this.excelService.setCellsWithNestedData(this.stressed.after, this.stressedBaseCol, sheet, secondRowOffset + 1, firstColOffset);

    this.excelService.setColumns(this.stressedBaseCol, sheet, secondRowOffset, secondColOffset, colWidth);
    this.excelService.setCellsWithNestedData(this.stressed.change, this.stressedBaseCol, sheet, secondRowOffset + 1, secondColOffset);

    this.generateStressedChart(sheet);
  }

  private generateStressedChart(sheet: Worksheet): void {
    const start = 100;
    sheet.getCell(`${this.alphabet.slice(-3)[0]}${start}`).value = 'Shift';
    sheet.getCell(`${this.alphabet.slice(-3)[1]}${start}`).value = 'Before';
    sheet.getCell(`${this.alphabet.slice(-3)[2]}${start}`).value = 'After';
    sheet.rows(start - 1).cells(23).cellFormat.font.colorInfo = WorkbookColorInfo.l_op_Implicit_WorkbookColorInfo_Color('white');
    sheet.rows(start - 1).cells(24).cellFormat.font.colorInfo = WorkbookColorInfo.l_op_Implicit_WorkbookColorInfo_Color('white');
    sheet.rows(start - 1).cells(25).cellFormat.font.colorInfo = WorkbookColorInfo.l_op_Implicit_WorkbookColorInfo_Color('white');
    this.stressed.shift.forEach((shift: number, index: number) => {
      sheet.getCell(`${this.alphabet.slice(-3)[0]}${start + index + 1}`).value = shift.toString();
      sheet.getCell(`${this.alphabet.slice(-3)[1]}${start + index + 1}`).applyFormula(`=E${15 + index}`);
      sheet.getCell(`${this.alphabet.slice(-3)[2]}${start + index + 1}`).applyFormula(`=I${15 + index}`);
      sheet.rows(start + index).cells(23).cellFormat.font.colorInfo = WorkbookColorInfo.l_op_Implicit_WorkbookColorInfo_Color('white');
      sheet.rows(start + index).cells(24).cellFormat.font.colorInfo = WorkbookColorInfo.l_op_Implicit_WorkbookColorInfo_Color('white');
      sheet.rows(start + index).cells(25).cellFormat.font.colorInfo = WorkbookColorInfo.l_op_Implicit_WorkbookColorInfo_Color('white');

    });

    const chart: ChartOptions = {
      startRow: 23,
      endRow: 33,
      chartType: ChartType.ColumnClustered,
      startCell: 7,
      endCell: 12,
      byRows: false,
      dataRange: `X101:Z106`
    };
    this.excelService.generateChart(sheet, chart);
  }

  private cashFlowPage(workbook: Workbook): void {
    const sheet = workbook.worksheets().add('CashFlow');
    const yearLength = this.cashFlow.cashFlow5Year.length;
    const monthLength = this.cashFlow.cashFlow12Month.length;
    const cashFLowColLength = this.cashFlowCol.length;
    const header = sheet.getCell('A3');
    const monthHeader = sheet.getCell('A7');
    const yearHeader = sheet.getCell(`${this.alphabet[cashFLowColLength + 3]}7`);
    const startRow = 14 + monthLength;
    const colWidth = 3000;
    header.value = 'Horizon Cashflow';
    monthHeader.value = '12 Month Horizon';
    yearHeader.value = '5 Year Horizon';
    sheet.rows(2).cells(0).cellFormat.font.bold = true;
    sheet.rows(6).cells(0).cellFormat.font.bold = true;
    sheet.rows(6).cells(cashFLowColLength + 3).cellFormat.font.bold = true;


    this.excelService
      .setColumns(this.cashFlowCol, sheet, 9, 0, colWidth);
    this.excelService
      .setCellsWithNestedData(this.cashFlow.cashFlow12Month, this.cashFlowCol, sheet, 10, 0);

    this.excelService.setCells(this.cashFlow.total12Month, this.cashFlowCol, sheet, 0, this.cashFlow.cashFlow12Month.length + 10);

    this.excelService
      .setColumns(this.cashFlowCol, sheet, 9, cashFLowColLength + 3, colWidth);
    this.excelService
      .setCellsWithNestedData(this.cashFlow.cashFlow5Year, this.cashFlowCol, sheet, 10, cashFLowColLength + 3);

    this.excelService
      .setCells(this.cashFlow.total5Year, this.cashFlowCol, sheet, cashFLowColLength + 3, this.cashFlow.cashFlow5Year.length + 10);

    const monthChart: ChartOptions = {
      startRow,
      endRow: startRow + 10,
      chartType: ChartType.ColumnClustered,
      startCell: 0,
      endCell: 5,
      byRows: false,
      dataRange: `${this.alphabet[0]}10:${this.alphabet[cashFLowColLength - 2]}${9 + monthLength}`
    };
    sheet.getCell(`A${startRow - 1}`).value = '12 Month Swapped Items Cashflow Comparison';
    sheet.rows(startRow - 2).cells(0).cellFormat.font.bold = true;
    this.excelService.generateChart(sheet, monthChart);

    const yearChart: ChartOptions = {
      startRow,
      endRow: startRow + 10,
      chartType: ChartType.ColumnClustered,
      startCell: 7,
      endCell: 12,
      byRows: false,
      dataRange: `${this.alphabet[cashFLowColLength + 3]}10:${this.alphabet[cashFLowColLength + 5]}${9 + yearLength}`
    };
    sheet.getCell(`${this.alphabet[7]}${startRow - 1}`).value = '12 Month Swapped Items Cashflow Comparison';
    sheet.rows(startRow - 2).cells(7).cellFormat.font.bold = true;

    this.excelService.generateChart(sheet, yearChart);
  }
}
