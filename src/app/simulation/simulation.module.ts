import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimulationRoutingModule } from './simulation-routing.module';
import { SimulationComponent } from './simulation.component';
import { SimulationListComponent } from './simulation-list/simulation-list.component';


@NgModule({
  declarations: [
    SimulationComponent,
    SimulationListComponent
  ],
  imports: [
    CommonModule,
    SimulationRoutingModule
  ],
})
export class SimulationModule { }
