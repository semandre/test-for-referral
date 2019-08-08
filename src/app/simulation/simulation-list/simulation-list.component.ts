import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Simulation } from '../../shared/types/simulation.model';
import { SimulationFacade } from '../../@store/facades/simulation.facade';

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

  onMenuClick(index: number, $event: MouseEvent): void {
    const element = (document.querySelector(`#menu-${index}`) as HTMLElement);
    element.style.top = `${$event.clientY + 17}px`;
    element.style.left = `${$event.clientX + 10}px`;
    console.log(element);
    console.log();
    console.log($event.clientY);
    $event.stopPropagation();
  }
}
