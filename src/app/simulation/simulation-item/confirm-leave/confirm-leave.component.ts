import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-leave',
  templateUrl: './confirm-leave.component.html',
  styleUrls: ['./confirm-leave.component.scss']
})
export class ConfirmLeaveComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmLeaveComponent>) {
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  saveSimulation(): void {
    this.dialogRef.close(true);
  }
}
