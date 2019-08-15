import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { Portfolio } from '../types/simulation.model';


@Injectable()
export class PortfolioService {

  constructor(private apiService: ApiService) {
  }

  fetchPortfolios(): Observable<Portfolio[]> {
    return this.apiService.get('portfolios');
  }

}
