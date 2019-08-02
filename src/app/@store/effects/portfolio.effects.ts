import { Injectable } from '@angular/core';
import { SimulationService } from '../../shared/services/simulation.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { PortfolioActionTypes } from '../actions/portfolio.actions';
import { Portfolio } from '../../shared/types/portfolioModel';

@Injectable({
  providedIn: 'root'
})
export class PortfolioEffects {

  simulationList$ = createEffect(() =>
    this.actions.pipe(
      ofType(PortfolioActionTypes.LoadPortfolioData),
      switchMap((action: any) => this.simulationService.fetchSimulationData(action.payload)),
      map((portfolios: Portfolio[]) => {
        return { type: PortfolioActionTypes.PortfolioDataLoaded, payload: portfolios };
      })
    )
  );

  constructor(
    private simulationService: SimulationService,
    private actions: Actions
  ) {
  }
}
