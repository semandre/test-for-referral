import { BondState } from '../reducers/bond.reducer';
import { Bond } from '../../shared/types/bondModel';
import { AppState } from '../reducers';
import { createSelector } from '@ngrx/store';

export function getBondState(state: AppState): BondState {
  return state.bond;
}

export function getBondList(state: BondState): Bond[] {
  return state.bondList;
}

export const fetchBondList = createSelector(getBondState, getBondList);
