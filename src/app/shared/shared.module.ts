import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  exports: [
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  providers: [],
})
export class SharedModule {
}
