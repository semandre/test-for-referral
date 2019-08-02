import { Simulation } from '../../shared/types/simulation.model';
import { SimulationActionTypes } from '../actions/simulation.actions';
import * as fromActions from '../actions/simulation.actions';

export interface SimulationState {
  simulations: Simulation[];
  selectedSimulationId: number | string | null;
}

export const initialState: SimulationState = {
  simulations: [],
  selectedSimulationId: null
};

export function simulationReducer(state: SimulationState = initialState, action: fromActions.SimulationActions): SimulationState {
  switch (action.type) {
    case SimulationActionTypes.SimulationDataLoaded: {
      return {
        ...state,
        simulations: action.payload
      };
    }
    case SimulationActionTypes.SimulationSelect: {
      return {
        ...state,
        selectedSimulationId: action.payload
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
}
