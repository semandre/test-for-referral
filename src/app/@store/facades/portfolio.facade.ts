import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { fetchPortfolioList } from '../selectors/portfolio.selector';
import { LoadPortfolioDataAction } from '../actions/portfolio.actions';
import { AppState } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class PortfolioFacade {

  portfolioList$ = this.store.pipe(select(fetchPortfolioList));

  constructor(private store: Store<AppState>) {
  }

  fetchPortfolioList(id: number): void {
    this.store.dispatch(new LoadPortfolioDataAction(id));
  }
}
