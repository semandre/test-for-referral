import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { IgxExcelExporterService } from 'igniteui-angular';

import { SelectComponent } from './components/select/select.component';
import { TableColumnsDropdownComponent } from './components/table-columns-dropdown/table-columns-dropdown.component';

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
    SelectComponent,
    TableColumnsDropdownComponent,

  ],
  providers: [IgxExcelExporterService],
})
export class SharedModule {
}
