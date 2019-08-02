import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Simulation } from '../../shared/types/simulation.model';
import { SimulationFacade } from '../../@store/facades/simulation.facade';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Portfolio, PortfolioMaker } from '../../shared/types/portfolioModel';
import { isEmpty } from '../../shared/helpers/isEmpty';
import { PortfolioFacade } from '../../@store/facades/portfolio.facade';

@Component({
  selector: 'app-simulation-item',
  templateUrl: './simulation-item.component.html',
  styleUrls: ['./simulation-item.component.scss']
})
export class SimulationItemComponent implements OnInit {

  selectedPortfolio: Simulation;
  list$: Observable<Simulation[]>;
  portfolioItems: Portfolio[];

  private _destroy$ = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private simulationFacade: SimulationFacade,
    private portfolioFacade: PortfolioFacade
  ) {
  }

  ngOnInit(): void {
    this.list$ = this.simulationFacade.simulationList$;
    this.fetchSelectedSimulation();
  }

  onSelectedData($event: any): void {
    this.router.navigate(['/', 'list', $event.id]);
  }

  onAddNewLine(): void {
    this.portfolioItems = isEmpty(this.portfolioItems.slice(-1)[0]) ?
      this.portfolioItems :
      [...this.portfolioItems, PortfolioMaker.createEmpty()];
  }

  private fetchSelectedSimulation(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.simulationFacade.selectSimulation(+params.id);
          return this.simulationFacade.selectedSimulation$;
        }),
        switchMap((simulation: Simulation) => {
          this.selectedPortfolio = simulation;
          this.portfolioFacade.fetchPortfolioList(simulation.id);
          return this.portfolioFacade.portfolioList$;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((portfolioList: Portfolio[]) => {
        this.portfolioItems = portfolioList;
      });
  }
}
