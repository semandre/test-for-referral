import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { fetchBondList } from '../selectors/bond.selector';
import { LoadBondDataAction } from '../actions/bond.actions';
import { AppState } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class BondFacade {

  bondList$ = this.store.pipe(select(fetchBondList));

  constructor(private store: Store<AppState>) {
  }

  fetchBondList(id: number): void {
    this.store.dispatch(new LoadBondDataAction(id));
  }
}
