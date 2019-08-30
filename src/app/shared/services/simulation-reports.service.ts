import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiService } from './api.service';


@Injectable()
export class SimulationReportsService {

  constructor(private apiService: ApiService) {
  }

  fetchReport(portfolio: string, dateAsOf: any, simulationId): Observable<any> {
    return this.apiService.get(`reports/${portfolio}/${dateAsOf}/${simulationId}`);
    // return of(simulationItems.cusipData);
  }
  /*updateSimulation(simulationDetails: SimulationDetails): Observable<SimulationDetails> {
    return this.apiService.put(`simulations`, simulationDetails);
  }

  saveSimulation(simulationDetails: SimulationDetails): Observable<SimulationDetails> {
    return this.apiService.post(`simulations`, simulationDetails);
  }

  deleteSimulation(id: number): Observable<number> {
    return this.apiService.delete(`simulations/${id}`);
  }
*/
}
