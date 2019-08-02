import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppState } from '../reducers';
import { LoadSimulationDataAction, SimulationSelectAction } from '../actions/simulation.actions';
import { fetchSimulation, fetchSimulationId, fetchSimulations } from '../selectors/simulation.selector';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SimulationFacade {
  simulationList$ = this.store.pipe(select(fetchSimulations));
  selectedSimulation$ = this.store.pipe(select(fetchSimulation));

  constructor(private store: Store<AppState>) {
  }

  fetchSimulations(): void {
    this.store.dispatch(new LoadSimulationDataAction());
  }

  selectSimulation(id: number | string): void {
    this.store.dispatch(new SimulationSelectAction(id));
  }
}
