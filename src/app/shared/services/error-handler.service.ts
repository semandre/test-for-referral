import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class ErrorHandlerService {

  constructor(
    public dialog: MatDialog,
  ) {
  }

  showError(error: HttpErrorResponse): Observable<any> {
    const errorMessage = error && error.error ? error.error.Message : '';
    return this.dialog
      .open(ConfirmComponent, {
        width: '370px',
        data: {
          message: errorMessage,
          confirmText: 'Ok',
          title: 'Error'
        }
      }).afterClosed();
  }
}
