import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppState } from '../reducers';
import { LoadSimulationDataAction, SimulationSelectAction } from '../actions/simulation.actions';
import { fetchSimulationId, fetchSimulations } from '../selectors/simulation.selector';

@Injectable({
  providedIn: 'root'
})
export class SimulationFacade {
  simulationList$ = this.store.pipe(select(fetchSimulations));
  selectedSimulationId$ = this.store.pipe(select(fetchSimulationId));

  constructor(
    private store: Store<AppState>,
  ) {
  }

  fetchSimulations(): void {
    this.store.dispatch(new LoadSimulationDataAction());
  }

  selectSimulation(id: number | string): void {
    this.store.dispatch(new SimulationSelectAction(id));
  }
}
