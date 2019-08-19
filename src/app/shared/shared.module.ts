import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { IgxExcelExporterService } from 'igniteui-angular';
import { IgxCategoryChartModule } from 'igniteui-angular-charts/ES2015/igx-category-chart-module';

import { SelectComponent } from './components/select/select.component';
import { TableColumnsDropdownComponent } from './components/table-columns-dropdown/table-columns-dropdown.component';
import { IgxExcelModule } from 'igniteui-angular-excel/ES2015/igx-excel-module';

@NgModule({
  declarations: [SelectComponent, TableColumnsDropdownComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ScrollingModule,
    IgxCategoryChartModule,
    IgxExcelModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    ScrollingModule,
    IgxCategoryChartModule,
    IgxExcelModule,
    SelectComponent,
    TableColumnsDropdownComponent,
  ],
  providers: [IgxExcelExporterService],
})
export class SharedModule {
}
