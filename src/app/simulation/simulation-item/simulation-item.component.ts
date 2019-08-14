import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { Simulation, SimulationDetails } from '../../shared/types/simulation.model';
import { Bond } from '../../shared/types/bondModel';
import { TableColumn } from '../../shared/types/tableColumnsModel';
import { MAIN_COLUMNS, OPTIONAL_COLUMNS } from '../../shared/consts/simulationProps';
import { SimulationCreateComponent } from './simulation-create/simulation-create.component';
import { SimulationService } from '../../shared/services/simulation.service';

@Component({
  selector: 'app-simulation-item',
  templateUrl: './simulation-item.component.html',
  styleUrls: ['./simulation-item.component.scss']
})
export class SimulationItemComponent implements OnInit {


  selectedBond: Simulation;
  bondItems: Bond[] = [];
  dateControl: FormControl;
  mainColumns: TableColumn[] = MAIN_COLUMNS;
  optionalColumns: TableColumn[] = OPTIONAL_COLUMNS;
  list$: Observable<Simulation[]>;

  private _destroy$ = new Subject<any>();

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private simulationService: SimulationService
  ) {
  }

  ngOnInit(): void {
    this.dateControl = new FormControl({value: Date.now(), disabled: true});
    this.list$ = this.simulationService.fetchSimulations();
    this.fetchSelectedSimulation();
  }

  onSelectedData($event: any): void {
    // this.router.navigate(['/', 'list', $event.id]);
  }

  private fetchSelectedSimulation(): void {
    this.route.params
      .pipe(
        filter((params: Params) => !!params.id),
        switchMap((params: Params) => {
          return this.simulationService.fetchSimulationData(+params.id);
        }),
        filter((simulation: SimulationDetails) => !!simulation),
        takeUntil(this._destroy$)
      )
      .subscribe((simulation: SimulationDetails) => {
        this.dateControl = new FormControl({value: new Date(simulation.dateAsOf), disabled: true});
        this.bondItems = simulation.cusipData;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SimulationCreateComponent, {
      width: '370px'
    });
  }
}
