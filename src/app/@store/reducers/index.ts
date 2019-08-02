import * as fromSimulation from './simulation.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  simulation: fromSimulation.SimulationState;
}

export const reducers: ActionReducerMap<AppState> = {
  simulation: fromSimulation.simulationReducer
};


