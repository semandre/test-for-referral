import { Injectable } from '@angular/core';
import { TableColumn } from '../types/tableColumnsModel';
import { Worksheet } from 'igniteui-angular-excel/ES5/excel.core';
import { upperCaseAlp } from '../consts/alphabet';
import { ChartOptions } from '../types/chart-options.model';

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
    columnOffset: number
  ): void {
    columns.forEach((data: TableColumn, index: number) =>
      sheet.getCell(`${this.alphabet[index + columnOffset]}${rowOffset}`).value = data.name);
  }

  setCells(
    object: any,
    columns: TableColumn[],
    sheet: Worksheet,
    offset: number
  ): void {
    Object
      .keys(object)
      .filter((res: string) => columns.find((val: TableColumn) => val.value === res))
      .forEach((data: string, index: number) =>
        sheet.getCell(`${this.alphabet[index]}${offset}`).value = object[data]);
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
            sheet.getCell(`${this.alphabet[i + columnOffset]}${index + rowOffset}`).value = cur[data];
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
}
