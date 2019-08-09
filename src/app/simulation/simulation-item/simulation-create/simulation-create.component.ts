import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-simulation-create',
  templateUrl: './simulation-create.component.html',
  styleUrls: ['./simulation-create.component.scss']
})
export class SimulationCreateComponent implements OnInit {

  name: string;

  constructor(public dialogRef: MatDialogRef<SimulationCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { name: string }) {
  }

  ngOnInit(): void {
  }

}
