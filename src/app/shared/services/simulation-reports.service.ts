import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { ReportViewModel } from '../types/report-view.model';


@Injectable()
export class SimulationReportsService {

  constructor(private apiService: ApiService) {
  }

  fetchReport(portfolio: string, dateAsOf: any, simulationId): Observable<any> {
    return this.apiService.get(`reports/${portfolio}/${dateAsOf}/${simulationId}`)
      .pipe(
        map( (result: ReportViewModel) => {
          result.reportInstantaneousRateShift.shift = [
            -100, 0, 200, 300, 400, 500
          ];
          result.reportCashFlowResult.total12Month.dateAsOf = 'Total';
          result.reportCashFlowResult.total5Year.dateAsOf = 'Total';
          return result;
        })
      );
  }
}
