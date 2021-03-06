import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { Simulation } from '../../shared/types/simulation.model';
import { SimulationService } from '../../shared/services/simulation.service';
import { map, takeUntil } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SimulationReportsComponent } from '../simulation-reports/simulation-reports.component';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

@Component({
  selector: 'app-simulation-list',
  templateUrl: './simulation-list.component.html',
  styleUrls: ['./simulation-list.component.scss']
})
export class SimulationListComponent implements OnInit, OnDestroy {

  list: Simulation[];

  header = ['Simulation name', 'Base portfolio', 'Date'];

  private _destroy$ = new Subject<any>();

  constructor(
    private simulationService: SimulationService,
    private router: Router,
    public dialog: MatDialog,
    private ngxLoaderService: NgxUiLoaderService,
    private errorHandler: ErrorHandlerService
  ) {
  }

  ngOnInit(): void {
    this.ngxLoaderService.startLoader('main-content-loader');
    this.simulationService.fetchSimulations().pipe(
      takeUntil(this._destroy$)
    ).subscribe(simulations => {
      this.list = simulations;
      this.ngxLoaderService.stopLoader('main-content-loader');
    }, error => {
      this.ngxLoaderService.stopLoader('main-content-loader');
      this.errorHandler.showError(error);
    });
  }

  navigateToBond(id: number | string): void {
    this.router.navigate(['/', 'list', id]);
  }

  onDuplicate(item: Simulation, $event: MouseEvent): void {
    $event.stopPropagation();
  }

  onExport(item: Simulation, $event: MouseEvent): void {
    if (!item || !item.id) {
      return;
    }

    this.dialog.open(SimulationReportsComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      panelClass: 'reports-dialog',
      data: {
        id: item.id,
        portfolio: item.portfolio,
        dateAsOf: item.dateAsOf
      }
    });
    $event.stopPropagation();
  }

  onDelete(item: Simulation, $event: MouseEvent): void {
    this.dialog
      .open(ConfirmComponent, {
        width: '370px',
        data: {
          message: `Do you want to remove simulation ${item.name}?`,
          confirmText: 'Remove',
          cancelText: 'Cancel',
          title: 'Confirmation'
        }
      })
      .afterClosed()
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((confirm) => {
        if (confirm) {
          this.ngxLoaderService.startLoader('main-content-loader');
          this.simulationService.deleteSimulation(item.id).pipe(
            takeUntil(this._destroy$)
          ).subscribe((id: number | string) => {
            this.list = this.list.filter((simulation: Simulation) => simulation.id !== id);
            this.ngxLoaderService.stopLoader('main-content-loader');
          }, error => {
            this.ngxLoaderService.stopLoader('main-content-loader');
            this.errorHandler.showError(error);
          });
        }
      });

    $event.stopPropagation();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
