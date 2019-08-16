import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Details } from '../../../mocks/details';

@Component({
  selector: 'app-simulation-reports',
  templateUrl: './simulation-reports.component.html',
  styleUrls: ['./simulation-reports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulationReportsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SimulationReportsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {
  }

  selectedTab = 'info';
  transactionDetails = Details;

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
