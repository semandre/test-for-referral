import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SimulationService } from '../../shared/services/simulation.service';
import { Simulation } from '../../shared/types/simulation.model';
import { SimulationFacade } from '../../@store/facades/simulation.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simulation-list',
  templateUrl: './simulation-list.component.html',
  styleUrls: ['./simulation-list.component.scss']
})
export class SimulationListComponent implements OnInit {

  list$: Observable<Simulation[]>;

  header = ['Report name', 'Base portfolio', 'Date'];

  constructor(
    private simulationFacade: SimulationFacade,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.list$ = this.simulationFacade.simulationList$;
  }

  navigateToPortfolio(id: number | string): void {
    this.simulationFacade.selectSimulation(id);
    this.router.navigate(['/', 'list', id]);
  }
}
