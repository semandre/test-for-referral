import * as fromActions from '../actions/portfolio.actions';
import { PortfolioActionTypes } from '../actions/portfolio.actions';
import { Portfolio } from '../../shared/types/portfolioModel';

export interface PortfolioState {
  portfolioList: Portfolio[];
}

export const initialState: PortfolioState = {
  portfolioList: []
};

export function portfolioReducer(state: PortfolioState = initialState, action: fromActions.PortfolioActions): PortfolioState {
  switch (action.type) {
    case PortfolioActionTypes.PortfolioDataLoaded: {
      return {
        ...state,
        portfolioList: action.payload
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
}
