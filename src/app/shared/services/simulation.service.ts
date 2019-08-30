import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiService } from './api.service';
import { Simulation, SimulationDetails } from '../types/simulation.model';
import { CusipData } from '../types/cusipData';
import { Simulations } from '../../../mocks/simulations';
import { simulationItems } from '../../../mocks/simulation-items';


@Injectable()
export class SimulationService {

  constructor(private apiService: ApiService) {
  }

  fetchSimulationsTemplate(portfolio: string, dateAsOf: any): Observable<CusipData[]> {
    return this.apiService.get(`cusipDataTemplate?portfolio=${portfolio}&dateAsOf=${dateAsOf}`);
    // return of(simulationItems.cusipData);
  }

  fetchSimulations(): Observable<Simulation[]> {
    return this.apiService.get('simulations');
    // return of(Simulations);
  }

  fetchSimulationData(id: number): Observable<any> {
    return this.apiService.get(`simulations/${id}`);
    // return of(simulationItems);
  }

  updateSimulation(simulationDetails: SimulationDetails): Observable<SimulationDetails> {
    return this.apiService.put(`simulations`, simulationDetails);
  }

  saveSimulation(simulationDetails: SimulationDetails): Observable<SimulationDetails> {
    return this.apiService.post(`simulations`, simulationDetails);
  }

  deleteSimulation(id: number): Observable<number> {
    return this.apiService.delete(`simulations/${id}`);
  }

}
