import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SelectComponent } from './components/select/select.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SelectComponent],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    ScrollingModule,
  ],
  exports: [
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    ScrollingModule,
    SelectComponent,

  ],
  providers: [],
})
export class SharedModule {
}
