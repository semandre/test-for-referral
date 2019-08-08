import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { SimulationFacade } from '../../@store/facades/simulation.facade';
import { PortfolioFacade } from '../../@store/facades/portfolio.facade';
import { Simulation } from '../../shared/types/simulation.model';
import { Portfolio, PortfolioMaker } from '../../shared/types/portfolioModel';
import { isEmpty } from '../../shared/helpers/isEmpty';
import { TableColumn } from '../../shared/types/tableColumnsModel';
import { MAIN_COLUMNS, OPTIONAL_COLUMNS } from '../../shared/consts/simulationProps';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SimulationCreateComponent } from './simulation-create/simulation-create.component';

@Component({
  selector: 'app-simulation-item',
  templateUrl: './simulation-item.component.html',
  styleUrls: ['./simulation-item.component.scss']
})
export class SimulationItemComponent implements OnInit {


  selectedPortfolio: Simulation;
  portfolioItems: Portfolio[];
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
    private portfolioFacade: PortfolioFacade
  ) {
  }

  ngOnInit(): void {
    this.list$ = this.simulationFacade.simulationList$;
    this.fetchSelectedSimulation();
  }

  onSelectedData($event: any): void {
    this.router.navigate(['/', 'list', $event.id]);
  }

  onAddNewLine(): void {
    this.portfolioItems = isEmpty(this.portfolioItems.slice(-1)[0]) ?
      this.portfolioItems :
      [...this.portfolioItems, PortfolioMaker.createEmpty()];
  }

  private fetchSelectedSimulation(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.simulationFacade.selectSimulation(+params.id);
          return this.simulationFacade.selectedSimulation$;
        }),
        switchMap((simulation: Simulation) => {
          this.selectedPortfolio = simulation;
          this.dateControl = new FormControl(new Date(simulation.date));
          this.portfolioFacade.fetchPortfolioList(simulation.id);
          return this.portfolioFacade.portfolioList$;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((portfolioList: Portfolio[]) => {
        this.portfolioItems = portfolioList;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SimulationCreateComponent, {
      width: '370px'
    });
  }
}
