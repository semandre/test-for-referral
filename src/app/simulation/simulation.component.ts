import { Component, OnInit } from '@angular/core';
import { SimulationFacade } from '../@store/facades/simulation.facade';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {

  constructor(private simulationFacade: SimulationFacade) {
  }

  ngOnInit(): void {
    this.simulationFacade.fetchSimulations();
  }

}
