import { Portfolio } from '../../shared/types/portfolioModel';

export enum PortfolioActionTypes {
  LoadPortfolioData = '[portfolio] load data',
  PortfolioDataLoaded = '[portfolio] loaded data',
}

export class LoadPortfolioDataAction {
  readonly type = PortfolioActionTypes.LoadPortfolioData;

  constructor(public payload: number) {
  }
}

export class PortfolioDataLoadedAction {
  readonly type = PortfolioActionTypes.PortfolioDataLoaded;

  constructor(public payload: Portfolio[]) {
  }
}

export type PortfolioActions =
  LoadPortfolioDataAction |
  PortfolioDataLoadedAction;
