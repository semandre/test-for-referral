import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { SimulationFacade } from '../../@store/facades/simulation.facade';
import { BondFacade } from '../../@store/facades/bond.facade';
import { Simulation } from '../../shared/types/simulation.model';
import { Bond, BondMaker } from '../../shared/types/bondModel';
import { isEmpty } from '../../shared/helpers/isEmpty';
import { TableColumn } from '../../shared/types/tableColumnsModel';
import { MAIN_COLUMNS, OPTIONAL_COLUMNS } from '../../shared/consts/simulationProps';
import { SimulationCreateComponent } from './simulation-create/simulation-create.component';

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
    private simulationFacade: SimulationFacade,
    private bondFacade: BondFacade
  ) {
  }

  ngOnInit(): void {
    this.dateControl = new FormControl({value: Date.now(), disabled: true});
    this.list$ = this.simulationFacade.simulationList$;
    this.fetchSelectedSimulation();
  }

  onSelectedData($event: any): void {
    this.router.navigate(['/', 'list', $event.id]);
  }

  onAddNewLine(): void {
    this.bondItems = this.bondItems.length && isEmpty(this.bondItems.slice(-1)[0]) ?
      this.bondItems :
      [...this.bondItems, BondMaker.createEmpty()];
  }

  private fetchSelectedSimulation(): void {
    this.route.params
      .pipe(
        filter((params: Params) => !!params.id),
        switchMap((params: Params) => {
          this.simulationFacade.selectSimulation(+params.id);
          return this.simulationFacade.selectedSimulation$;
        }),
        switchMap((simulation: Simulation) => {
          this.selectedBond = simulation;
          this.dateControl = new FormControl({value: new Date(simulation.date), disabled: true});
          this.bondFacade.fetchBondList(simulation.id);
          return this.bondFacade.bondList$;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((bondList: Bond[]) => {
        this.bondItems = bondList;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SimulationCreateComponent, {
      width: '370px'
    });
  }
}
