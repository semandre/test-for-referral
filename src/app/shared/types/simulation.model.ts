import { CusipData } from './cusipData';

export interface ISimulation {
  id: number;
  name: string;
  portfolio: string;
  dateAsOf: string;
}

export interface ISimulationDetails {
  portfolio: string;
  simulationId: number;
  name: string;
  dateAsOf: string;
  cusipData: CusipData[];
}

export interface IPortfolio {
  name: string;
  account: string;
}

export class Portfolio implements IPortfolio {
  name: string;
  account: string;

  constructor() {
    this.name = '';
    this.account = '';
  }
}

export class Simulation implements ISimulation {
  id: number;
  name: string;
  portfolio: string;
  dateAsOf: string;

  constructor() {
    this.name = '';
    this.portfolio = '';
  }
}

export class SimulationDetails implements ISimulationDetails {
  cusipData: CusipData[];
  dateAsOf: string;
  name: string;
  portfolio: string;
  simulationId: number;

  constructor() {
    this.cusipData = [];
    this.name = '';
    this.portfolio = '';
  }
}
