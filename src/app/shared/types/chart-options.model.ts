import { ChartType } from 'igniteui-angular-excel/ES5/excel.core';

export interface ChartOptions {
  chartType: ChartType;
  dataRange: string;
  startRow?: number;
  endRow?: number;
  startCell?: number;
  endCell?: number;
  byRows?: boolean;
}
