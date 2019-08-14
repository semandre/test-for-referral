import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Simulation } from '../../shared/types/simulation.model';
import { SimulationService } from '../../shared/services/simulation.service';

@Component({
  selector: 'app-simulation-list',
  templateUrl: './simulation-list.component.html',
  styleUrls: ['./simulation-list.component.scss']
})
export class SimulationListComponent implements OnInit {

  list$: Observable<Simulation[]>;

  header = ['Report name', 'Base portfolio', 'Date'];

  constructor(
    private simulationService: SimulationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.list$ = this.simulationService.fetchSimulations();
  }

  navigateToBond(id: number | string): void {
    this.router.navigate(['/', 'list', id]);
  }

  onDuplicate(item: Simulation, $event: MouseEvent): void {
    $event.stopPropagation();
  }

  onExport(item: Simulation, $event: MouseEvent): void {
    $event.stopPropagation();
  }

  onDelete(item: Simulation, $event: MouseEvent): void {
    $event.stopPropagation();
  }
}
