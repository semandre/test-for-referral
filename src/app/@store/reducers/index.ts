import { ActionReducerMap } from '@ngrx/store';

import * as fromSimulation from './simulation.reducer';
import * as fromPortfolio from './portfolio.reducer';

export interface AppState {
  simulation: fromSimulation.SimulationState;
  portfolio: fromPortfolio.PortfolioState;
}

export const reducers: ActionReducerMap<AppState> = {
  simulation: fromSimulation.simulationReducer,
  portfolio: fromPortfolio.portfolioReducer
};


