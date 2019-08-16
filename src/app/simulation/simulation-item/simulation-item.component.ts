import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { Portfolio, SimulationDetails } from '../../shared/types/simulation.model';
import { CusipData } from '../../shared/types/cusipData';
import { TableColumn } from '../../shared/types/tableColumnsModel';
import { MAIN_COLUMNS, OPTIONAL_COLUMNS } from '../../shared/consts/simulationProps';
import { SimulationCreateComponent } from './simulation-create/simulation-create.component';
import { SimulationService } from '../../shared/services/simulation.service';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SimulationReportsComponent } from '../simulation-reports/simulation-reports.component';

@Component({
  selector: 'app-simulation-item',
  templateUrl: './simulation-item.component.html',
  styleUrls: ['./simulation-item.component.scss']
})
export class SimulationItemComponent implements OnInit {


  selectedPortfolio: string;
  simulationDetails: SimulationDetails;
  dateControl: FormControl;
  mainColumns: TableColumn[] = MAIN_COLUMNS;
  optionalColumns: TableColumn[] = OPTIONAL_COLUMNS;
  portfolios$: Observable<Portfolio[]>;

  private _destroy$ = new Subject<any>();

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private simulationService: SimulationService,
    private portfolioService: PortfolioService,
  ) {
  }

  onSelectedPortfolio($event: any): void {
    this.selectedPortfolio = $event.name;
  }

  onSelectedDate($event: any): void {
    if (this.selectedPortfolio) {
      this.fetchSimulationTemplate($event.value.toISOString());
    }
  }

  openDialog(): void {
    this.dialog.open(SimulationCreateComponent, {
      width: '370px',
      data: {
        name: this.simulationDetails.name
      }
    })
      .afterClosed()
      .pipe(takeUntil(this._destroy$))
      .subscribe((response: any) => {
        if (response && response.name) {
          this.simulationDetails.name = response.name;
          if (this.simulationDetails.simulationId) {
            this.updateSimulationDetails(this.simulationDetails);
          } else {
            this.saveSimulationDetails(this.simulationDetails);
          }
        }
      });
  }

  openReportsDialog(): void {
    if (!this.simulationDetails.simulationId) {
      return;
    }

    this.dialog.open(SimulationReportsComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      panelClass: 'reports-dialog',
      data: {
        id: this.simulationDetails.simulationId
      }
    });
  }

  ngOnInit(): void {
    this.dateControl = new FormControl({ value: Date.now(), disabled: true });
    this.portfolios$ = this.portfolioService.fetchPortfolios();
    this.fetchSelectedSimulation();
  }

  private fetchSimulationTemplate(dateAsOf: any): void {
    this.simulationService.fetchSimulationsTemplate(this.selectedPortfolio, dateAsOf)
      .pipe(takeUntil(this._destroy$))
      .subscribe(templates => {
        this.simulationDetails.cusipData = templates.map((template, index) => {
          template.id = index;
          return template;
        }) as Array<CusipData>;
        this.simulationDetails.portfolio = this.selectedPortfolio;
        this.simulationDetails.dateAsOf = dateAsOf;
        this.simulationDetails = Object.assign(new SimulationDetails(), this.simulationDetails);
      });
  }

  private fetchSelectedSimulation(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => !params.id ?
          of(new SimulationDetails()) :
          this.simulationService.fetchSimulationData(+params.id)),
        takeUntil(this._destroy$)
      )
      .subscribe((simulation: SimulationDetails) => {
        simulation.cusipData = simulation.cusipData.map((cusipData, index) => {
          cusipData.id = index;
          return cusipData;
        }) as Array<CusipData>;
        this.dateControl = new FormControl({ value: new Date(simulation.dateAsOf), disabled: true });
        this.simulationDetails = simulation;
        this.selectedPortfolio = simulation.portfolio;
      });
  }

  private updateSimulationDetails(simulationDetails: SimulationDetails): void {
    if (!simulationDetails) {
      return;
    }
    this.simulationService.updateSimulation(simulationDetails)
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((response: SimulationDetails) => {
        response.cusipData = response.cusipData.map((cusipData: CusipData, index: number) => {
          cusipData.id = index;
          return cusipData;
        }) as Array<CusipData>;
        this.simulationDetails = Object.assign(new SimulationDetails(), response as SimulationDetails);
      }, (error: HttpErrorResponse) => {
        console.error(error);
      });
  }

  private saveSimulationDetails(simulationDetails: SimulationDetails): void {
    if (!simulationDetails) {
      return;
    }
    this.simulationService.saveSimulation(simulationDetails)
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((response: SimulationDetails) => {
        this.router.navigateByUrl(`list/${response.simulationId}`);
      }, error => {
        console.error(error);
      });
  }
}
