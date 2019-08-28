import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, CanDeactivate, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDatepicker, MatDialog } from '@angular/material';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { Portfolio, SimulationDetails } from '../../shared/types/simulation.model';
import { CusipData } from '../../shared/types/cusipData';
import { TableColumn } from '../../shared/types/tableColumnsModel';
import { MAIN_COLUMNS, OPTIONAL_COLUMNS } from '../../shared/consts/simulationProps';
import { SimulationCreateComponent } from './simulation-create/simulation-create.component';
import { SimulationService } from '../../shared/services/simulation.service';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { SimulationReportsComponent } from '../simulation-reports/simulation-reports.component';
import { SimulationTableComponent } from './simulation-table/simulation-table.component';
import { getChanges } from '../../shared/helpers/checkObjectChanges';
import { ConfirmLeaveComponent } from './confirm-leave/confirm-leave.component';
import { CanDeactivateGuard } from '../../shared/helpers/canDeactivate';

@Component({
  selector: 'app-simulation-item',
  templateUrl: './simulation-item.component.html',
  styleUrls: ['./simulation-item.component.scss']
})
export class SimulationItemComponent implements OnInit, OnDestroy, CanDeactivate<CanDeactivateGuard> {

  @ViewChild('simTable', { static: true }) simTable: SimulationTableComponent;
  @ViewChild('picker', { static: true }) picker: MatDatepicker<any>;

  leaveAfterSave = false;
  selectedPortfolio: string;
  simulationDetails: SimulationDetails;
  dateControl: FormControl;
  mainColumns: TableColumn[] = MAIN_COLUMNS;
  optionalColumns: TableColumn[] = OPTIONAL_COLUMNS;
  portfolios$: Observable<Portfolio[]>;
  simDetCopy: SimulationDetails;

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

  onOpenPicker(): void {
    if (getChanges(this.simDetCopy, this.simTable.simulationDetails)) {
      this.picker.open();
    }
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
        } else {
          this.leaveAfterSave = false;
        }
      });
  }

  openReportsDialog(): void {
    if (!this.simulationDetails.simulationId || !getChanges(this.simDetCopy, this.simTable.simulationDetails)) {
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

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!getChanges(this.simDetCopy, this.simTable.simulationDetails)) {
      return this.dialog
        .open(ConfirmLeaveComponent, {
          width: '370px',
        })
        .afterClosed()
        .pipe(
          takeUntil(this._destroy$),
          map((data: boolean) => {
            if (data) {
              this.leaveAfterSave = true;
              this.openDialog();
              return false;
            } else {
              return true;
            }
          }));
    } else {
      return true;
    }
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
        this.simDetCopy = Object.assign(new SimulationDetails(), this.simulationDetails);
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
        this.simulationDetails = Object.assign(new SimulationDetails(), simulation);
        this.simDetCopy = Object.assign(
          new SimulationDetails(),
          simulation,
          {
            cusipData: simulation.cusipData.map((data: CusipData) => ({ ...data }))
          });
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
        if (this.leaveAfterSave) {
          this.router.navigate(['/list']);
        }
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
        this.leaveAfterSave ?
          this.router.navigateByUrl(`list/${response.simulationId}`) :
          this.router.navigate(['/list']);
      }, (error: HttpErrorResponse) => {
        console.error(error);
      });
  }
}
