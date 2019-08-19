import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Details } from '../../../mocks/details';
import { CASH_FLOW } from '../../../mocks/cash-flow';
import { STRESSED } from '../../../mocks/stressedMock';

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
  cashFlow = CASH_FLOW;
  stressed = STRESSED;

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
