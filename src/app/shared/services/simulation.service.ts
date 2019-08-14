import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Simulation, SimulationDetails } from '../types/simulation.model';
import { simulationItems } from '../../../mocks/simulation-items';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  private list = [
    {
      id: 1,
      name: 'US646D132',
      portfolio: 'TestCust',
      dateAsOf: '11.10.2018'
    },
    {
      id: 2,
      name: '0S646D132',
      portfolio: 'TestCust1',
      dateAsOf: '11.10.2019'
    }];

  private bondList = simulationItems;

  constructor() {
  }

  fetchSimulations(): Observable<Simulation[]> {
    return of(this.list);
  }

  fetchSimulationData(id: number): Observable<SimulationDetails> {
    return of(this.bondList.find(((list: SimulationDetails) => list.simulationId === id)));
  }

}
