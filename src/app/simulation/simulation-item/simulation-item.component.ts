import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Simulation } from '../../shared/types/simulation.model';
import { SimulationFacade } from '../../@store/facades/simulation.facade';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-simulation-item',
  templateUrl: './simulation-item.component.html',
  styleUrls: ['./simulation-item.component.scss']
})
export class SimulationItemComponent implements OnInit {

  selectedItemId: number;
  selectedPortfolio: Simulation;
  list$: Observable<Simulation[]>;

  private _destroy$ = new Subject<any>();

  constructor(
    private simulationFacade: SimulationFacade,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.list$ = this.simulationFacade.simulationList$;
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.simulationFacade.selectSimulation(+params.id);
          return this.simulationFacade.selectedSimulation$;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((simulation: Simulation) => this.selectedPortfolio = simulation);
  }

}
