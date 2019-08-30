import { Injectable } from '@angular/core';
import { CellFill, Worksheet } from 'igniteui-angular-excel/ES5/excel.core';

import { TableColumn } from '../types/tableColumnsModel';
import { ChartOptions } from '../types/chart-options.model';
import { upperCaseAlp } from '../consts/alphabet';

@Injectable({
  providedIn: 'root'
})
export class ExcelExporterService {

  alphabet = upperCaseAlp;

  constructor() {
  }

  setColumns(
    columns: TableColumn[],
    sheet: Worksheet,
    rowOffset: number,
    columnOffset: number,
    colWidth: number
  ): void {
    columns.forEach((data: TableColumn, index: number) => {
      sheet.getCell(`${this.alphabet[index + columnOffset]}${rowOffset}`).value = data.name;
      const cell = sheet.rows(rowOffset - 1).cells(index + columnOffset).cellFormat;
      cell.fill = CellFill.createSolidFill('#969696');
      cell.font.bold = true;
      cell.alignment = 2;
      cell.verticalAlignment = 1;
      cell.wrapText = true;
      sheet.rows(rowOffset - 1).height = 500;
      sheet.columns(index + columnOffset).width = colWidth;
    });
  }

  setCells(
    object: any,
    columns: TableColumn[],
    sheet: Worksheet,
    colOffset: number,
    rowOffset: number
  ): void {
    Object
      .keys(object)
      .filter((res: string) => columns.find((val: TableColumn) => val.value === res))
      .forEach((data: string, index: number) =>
        sheet.getCell(`${this.alphabet[index + colOffset]}${rowOffset}`).value = typeof object[data] === 'number' && object[data] < 0 ?
          `(${Math.abs(object[data])})` : object[data]);
    sheet.rows(rowOffset - 1).cells(colOffset).cellFormat.font.bold = true;
  }

  setCellsWithNestedData(array: any[],
                         columns: TableColumn[],
                         sheet: Worksheet,
                         rowOffset: number,
                         columnOffset: number,
  ): void {
    array
      .forEach((cur: any, index: number) => {
        Object
          .keys(cur)
          .filter((res: string) => columns.find((val: TableColumn) => val.value === res))
          .forEach((data: string, i: number) => {
            sheet.getCell(
              `${this.alphabet[i + columnOffset]}${index + rowOffset}`).value = typeof cur[data] === 'number' && cur[data] < 0 ?
              `(${Math.abs(cur[data])})` : cur[data];
          });
      });
  }

  setCellWithDataArray(
    array: any[],
    sheet: Worksheet,
    rowOffset: number,
    columnOffset: number,
  ): void {
    array.forEach((cur: any, i: number) =>
      sheet.getCell(`${this.alphabet[columnOffset]}${i + rowOffset}`).value = cur);
  }

  generateChart(sheet: Worksheet, opts: ChartOptions): void {
    const chart = sheet.shapes().addChart(opts.chartType,
      sheet.rows(opts.startRow || 0).cells(opts.startCell || 0), { x: 0, y: 0 },
      sheet.rows(opts.endRow || 0).cells(opts.endCell || 0), { x: 100, y: 100 });
    chart.setSourceData(opts.dataRange, opts.byRows || false);
  }

  setHeaderColStyle(sheet: Worksheet, rowOffset: number, columnOffset: number): void {
    const cell = sheet.rows(rowOffset).cells(columnOffset).cellFormat;
    cell.fill = CellFill.createSolidFill('#969696');
    cell.font.bold = true;
    cell.alignment = 2;
    cell.verticalAlignment = 1;
    cell.wrapText = true;
  }
}
