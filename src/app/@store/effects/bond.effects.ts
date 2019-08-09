import { Injectable } from '@angular/core';
import { SimulationService } from '../../shared/services/simulation.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { BondActionTypes } from '../actions/bond.actions';
import { Bond } from '../../shared/types/bondModel';

@Injectable({
  providedIn: 'root'
})
export class BondEffects {

  bondList$ = createEffect(() =>
    this.actions.pipe(
      ofType(BondActionTypes.LoadBondData),
      switchMap((action: any) => this.simulationService.fetchSimulationData(action.payload)),
      map((bondList: Bond[]) => {
        return { type: BondActionTypes.BondDataLoaded, payload: bondList };
      })
    )
  );

  constructor(
    private simulationService: SimulationService,
    private actions: Actions
  ) {
  }
}
