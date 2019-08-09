import { ActionReducerMap } from '@ngrx/store';

import * as fromSimulation from './simulation.reducer';
import * as fromBond from './bond.reducer';

export interface AppState {
  simulation: fromSimulation.SimulationState;
  bond: fromBond.BondState;
}

export const reducers: ActionReducerMap<AppState> = {
  simulation: fromSimulation.simulationReducer,
  bond: fromBond.bondReducer
};


