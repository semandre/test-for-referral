import * as fromActions from '../actions/bond.actions';
import { BondActionTypes } from '../actions/bond.actions';
import { Bond } from '../../shared/types/bondModel';

export interface BondState {
  bondList: Bond[];
}

export const initialState: BondState = {
  bondList: []
};

export function bondReducer(state: BondState = initialState, action: fromActions.BondActions): BondState {
  switch (action.type) {
    case BondActionTypes.BondDataLoaded: {
      return {
        ...state,
        bondList: action.payload
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
}
