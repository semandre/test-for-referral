import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Simulation } from '../types/simulation.model';
import { simulationItems } from '../../../mocks/simulation-items';
import { Portfolio } from '../types/portfolioModel';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  private list = [
    {
      id: 1,
      name: 'US646D132',
      base: 'TestCust',
      date: '11.10.2018'
    },
    {
      id: 2,
      name: '0S646D132',
      base: 'TestCust1',
      date: '11.10.2019'
    }];

  private portfolioItems = simulationItems;

  constructor() {
  }

  fetchSimulations(): Observable<Simulation[]> {
    return of(this.list);
  }

  fetchSimulationData(id: number): Observable<Portfolio[]> {
    return of(this.portfolioItems[id]);
  }

}
