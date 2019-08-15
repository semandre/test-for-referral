import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Simulation, SimulationDetails} from '../types/simulation.model';
import { ApiService } from './api.service';
import { CusipData } from '../types/cusipData';


@Injectable()
export class SimulationService {

  constructor(private apiService: ApiService) {
  }

  fetchSimulationsTemplate(portfolio: string, dateAsOf: any): Observable<CusipData[]> {
    return this.apiService.get(`cusipDataTemplate?portfolio=${portfolio}&dateAsOf=${dateAsOf}`);
  }

  fetchSimulations(): Observable<Simulation[]> {
    return this.apiService.get('simulations');
  }

  fetchSimulationData(id: number): Observable<SimulationDetails> {
    return this.apiService.get(`simulations/${id}`);
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
