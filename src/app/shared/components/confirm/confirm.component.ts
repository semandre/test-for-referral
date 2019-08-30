import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-leave',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  message = '';
  title = '';
  confirmText = '';
  cancelText = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, confirmText: string, cancelText: string, title: string }
  ) {
    this.message = data.message;
    this.confirmText = data.confirmText;
    this.cancelText = data.cancelText;
    this.title = data.title;
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
