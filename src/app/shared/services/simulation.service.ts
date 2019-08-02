import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Simulation } from '../types/simulation.model';

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

  constructor() {
  }

  fetchSimulations(): Observable<Simulation[]> {
    return of(this.list);
  }

}
