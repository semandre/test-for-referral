import { CusipData } from './cusipData';

export interface Simulation {
  id: number;
  name: string;
  portfolio: string;
  dateAsOf: string;
}

export interface SimulationDetails {
  portfolio: string;
  simulationId: number;
  name: string;
  dateAsOf: string;
  cusipData: CusipData[];
}


export interface Portfolio {
  name: string;
  account: string;
}
