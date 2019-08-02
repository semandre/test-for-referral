import { Simulation } from '../../shared/types/simulation.model';

export enum SimulationActionTypes {
  LoadSimulationData = '[simulation] data load',
  SimulationDataLoaded = '[simulation] data loaded',
  SimulationSelect = '[simulation] selected',
}

export class LoadSimulationDataAction {
  readonly type = SimulationActionTypes.LoadSimulationData;
}

export class SimulationDataLoadedAction {
  readonly type = SimulationActionTypes.SimulationDataLoaded;

  constructor(public payload: Simulation[]) {
  }
}

export class SimulationSelectAction {
  readonly type = SimulationActionTypes.SimulationSelect;

  constructor(public payload: number | string) {
  }
}

export type SimulationActions =
  LoadSimulationDataAction |
  SimulationDataLoadedAction |
  SimulationSelectAction;
