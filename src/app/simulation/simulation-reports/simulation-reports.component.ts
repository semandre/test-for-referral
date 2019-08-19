import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Details } from '../../../mocks/details';
import { CASH_FLOW } from '../../../mocks/cash-flow';
import { STRESSED } from '../../../mocks/stressedMock';
import {
  ChartType,
  IWorkbookFont,
  Sheet,
  Workbook,
  WorkbookFormat,
  Worksheet
} from 'igniteui-angular-excel/ES5/excel.core';
import { ExcelUtility } from '../../shared/helpers/excel-utility';
import { upperCaseAlp } from '../../shared/consts/alphabet';
import { TRANSACTION_DETAILS } from '../../shared/consts/transaction-details';
import { TableColumn } from '../../shared/types/tableColumnsModel';
import { TransactionDetails } from '../../shared/types/transaction.model';

@Component({
  selector: 'app-simulation-reports',
  templateUrl: './simulation-reports.component.html',
  styleUrls: ['./simulation-reports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulationReportsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SimulationReportsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {
  }

  selectedTab = 'info';
  transactionDetails = Details;
  transactionDetailsCol = TRANSACTION_DETAILS;
  cashFlow = CASH_FLOW;
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
    const sheet3 = workbook.worksheets().add('CashFlow');
    this.transactionDetailsPage(workbook);

    ExcelUtility.save(workbook, 'report');
  }


  private transactionDetailsPage(workbook: Workbook): void {
    const sheet = workbook.worksheets().add('TransactionDetail');
    const header = sheet.getCell('A3');
    const sellLength = this.transactionDetails.sell.length;
    const buyLength = this.transactionDetails.buy.length;
    header.value = 'Transaction Details';

    this.generateColumnCells(this.transactionDetailsCol, sheet, 4);
    this.generateSellBuyCells(this.transactionDetails.sell, this.transactionDetailsCol, sheet, 5);
    this.generateTotalSellBuyCells(this.transactionDetails.totalSell, this.transactionDetailsCol, sheet, sellLength + 6);

    this.generateColumnCells(this.transactionDetailsCol, sheet, sellLength + 8);
    this.generateSellBuyCells(this.transactionDetails.buy, this.transactionDetailsCol, sheet, sellLength + 9);
    this.generateTotalSellBuyCells(this.transactionDetails.totalBuy, this.transactionDetailsCol, sheet, sellLength + buyLength + 10);

    this.generateTotalSellBuyCells(this.transactionDetails.difference, this.transactionDetailsCol, sheet, sellLength + buyLength + 12);

  }

  private generateColumnCells(columns: TableColumn[], sheet: Worksheet, offset: number): void {
    columns.forEach((data: TableColumn, index: number) =>
      sheet.getCell(`${this.alphabet[index]}${offset}`).value = data.name);
  }

  private generateSellBuyCells(array: TransactionDetails[], columns: TableColumn[], sheet: Worksheet, offset: number): void {
    array
      .forEach((cur: TransactionDetails, index: number) => {
        Object
          .keys(cur)
          .filter((res: string) => columns.find((val: TableColumn) => val.value === res))
          .forEach((data: string, i: number) => {
            sheet.getCell(`${this.alphabet[i]}${index + offset}`).value = cur[data];
          });
      });
  }

  private generateTotalSellBuyCells(object: TransactionDetails, columns: TableColumn[], sheet: Worksheet, offset: number): void {
    Object
      .keys(object)
      .filter((res: string) => columns.find((val: TableColumn) => val.value === res))
      .forEach((data: string, index: number) =>
        sheet.getCell(`${this.alphabet[index]}${offset}`).value = object[data]);
  }
}
