import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Simulation, SimulationDetails} from '../types/simulation.model';
import {simulationItems} from '../../../mocks/simulation-items';
import { ApiService } from './api.service';


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

  constructor(private apiService: ApiService) {
  }

  fetchSimulations(): Observable<Simulation[]> {
    return this.apiService.get('simulations');
  }

  fetchSimulationData(id: number): Observable<SimulationDetails> {
    return this.apiService.get(`simulations/${id}`);
  }

  deleteSimulation(id: number): Observable<number> {
    return this.apiService.delete(`simulations/${id}`);
  }

}
