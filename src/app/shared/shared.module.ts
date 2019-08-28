import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { IgxExcelExporterService } from 'igniteui-angular';
import { IgxCategoryChartModule } from 'igniteui-angular-charts/ES5/igx-category-chart-module';

import { SelectComponent } from './components/select/select.component';
import { TableColumnsDropdownComponent } from './components/table-columns-dropdown/table-columns-dropdown.component';
import { NegativeNumberPipe } from './pipes/negative-number.pipe';

@NgModule({
  declarations: [SelectComponent, TableColumnsDropdownComponent, NegativeNumberPipe],
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
    SelectComponent,
    TableColumnsDropdownComponent,
    NegativeNumberPipe,
  ],
  providers: [IgxExcelExporterService],
})
export class SharedModule {
}
