import { AppState } from '../reducers';
import { SimulationState } from '../reducers/simulation.reducer';
import { Simulation } from '../../shared/types/simulation.model';
import { createSelector } from '@ngrx/store';

export function getSimulationsState(state: AppState): SimulationState {
  return state.simulation;
}

export function getSimulations(state: SimulationState): Simulation[] {
  return state.simulations;
}

export function getSimulationId(state: SimulationState): number | string {
  return state.selectedSimulationId;
}

export const fetchSimulations = createSelector(getSimulationsState, getSimulations);
export const fetchSimulationId = createSelector(getSimulationsState, getSimulationId);
export const fetchSimulation = createSelector(
  fetchSimulations,
  fetchSimulationId,
  (simulations: Simulation[], id: number | string) =>
    simulations.find((simulation: Simulation) => simulation.id === id)
);
