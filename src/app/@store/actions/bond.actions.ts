import { Bond } from '../../shared/types/bondModel';

export enum BondActionTypes {
  LoadBondData = '[bond] load data',
  BondDataLoaded = '[bond] loaded data',
}

export class LoadBondDataAction {
  readonly type = BondActionTypes.LoadBondData;

  constructor(public payload: number) {
  }
}

export class BondDataLoadedAction {
  readonly type = BondActionTypes.BondDataLoaded;

  constructor(public payload: Bond[]) {
  }
}

export type BondActions =
  LoadBondDataAction |
  BondDataLoadedAction;
