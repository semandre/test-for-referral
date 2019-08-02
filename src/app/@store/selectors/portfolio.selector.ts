import { PortfolioState } from '../reducers/portfolio.reducer';
import { Portfolio } from '../../shared/types/portfolioModel';
import { AppState } from '../reducers';
import { createSelector } from '@ngrx/store';

export function getPortfolioState(state: AppState): PortfolioState {
  return state.portfolio;
}

export function getPortfolioList(state: PortfolioState): Portfolio[] {
  return state.portfolioList;
}

export const fetchPortfolioList = createSelector(getPortfolioState, getPortfolioList);
