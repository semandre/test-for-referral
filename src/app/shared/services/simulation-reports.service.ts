import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { ReportViewModel } from '../types/report-view.model';
import { REPORTS } from '../../../mocks/reports';


@Injectable()
export class SimulationReportsService {

  constructor(private apiService: ApiService) {
  }

  fetchReport(portfolio: string, dateAsOf: any, simulationId): Observable<any> {
    // return this.apiService.get(`reports/${portfolio}/${dateAsOf}/${simulationId}`)
    return of(REPORTS)
      .pipe(
        map( (result: ReportViewModel) => {
          console.log(result);
          result.reportInstantaneousRateShift.shift = [
            -100, 0, 200, 300, 400, 500
          ];
          result.reportCashFlowResult.total12Month.dateAsOf = 'Total';
          result.reportCashFlowResult.total5Year.dateAsOf = 'Total';
          result.reportTransactionDetails.totalBuy.action = 'Total';
          result.reportTransactionDetails.totalSell.action = 'Total';
          result.reportTransactionDetails.difference.action = 'Change';
          return result;
        })
      );
  }
}
