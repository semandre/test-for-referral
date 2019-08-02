import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { SimulationActionTypes } from '../actions/simulation.actions';
import { SimulationService } from '../../shared/services/simulation.service';
import { Simulation } from '../../shared/types/simulation.model';

@Injectable({
  providedIn: 'root'
})
export class SimulationEffects {

  simulationList$ = createEffect(() => this.actions.pipe(
    ofType(SimulationActionTypes.LoadSimulationData),
    switchMap(() => this.simulationService.fetchSimulations()),
    map((simulations: Simulation[]) => {
      return { type: SimulationActionTypes.SimulationDataLoaded, payload: simulations };
    })
  ));

  constructor(
    private actions: Actions,
    private simulationService: SimulationService
  ) {
  }
}
