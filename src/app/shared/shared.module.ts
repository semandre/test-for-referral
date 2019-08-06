import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectComponent } from './components/select/select.component';
import { IgxExcelExporterService } from 'igniteui-angular';

@NgModule({
  declarations: [SelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ScrollingModule,
  ],
  exports: [
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    ScrollingModule,
    MatInputModule,
    SelectComponent,

  ],
  providers: [IgxExcelExporterService],
})
export class SharedModule {
}
