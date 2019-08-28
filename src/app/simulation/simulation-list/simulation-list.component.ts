import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { Simulation } from '../../shared/types/simulation.model';
import { SimulationService } from '../../shared/services/simulation.service';
import { takeUntil } from 'rxjs/operators';

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
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.simulationService.fetchSimulations().pipe(
      takeUntil(this._destroy$)
    ).subscribe(simulations => {
      this.list = simulations;
    });
  }

  navigateToBond(id: number | string): void {
    this.router.navigate(['/', 'list', id]);
  }

  onDuplicate(item: Simulation, $event: MouseEvent): void {
    $event.stopPropagation();
  }

  onExport(item: Simulation, $event: MouseEvent): void {
    $event.stopPropagation();
  }

  onDelete(item: Simulation, $event: MouseEvent): void {
    this.simulationService.deleteSimulation(item.id).pipe(
      takeUntil(this._destroy$)
    ).subscribe( (id: number | string) => {
      this.list = this.list.filter((simulation: Simulation) => simulation.id !== id);
    });
    $event.stopPropagation();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
