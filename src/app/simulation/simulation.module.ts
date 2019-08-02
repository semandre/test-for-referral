import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimulationRoutingModule } from './simulation-routing.module';
import { SimulationComponent } from './simulation.component';
import { SimulationListComponent } from './simulation-list/simulation-list.component';
import { SimulationItemComponent } from './simulation-item/simulation-item.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SimulationComponent,
    SimulationListComponent,
    SimulationItemComponent,
  ],
  imports: [
    CommonModule,
    SimulationRoutingModule,
    SharedModule
  ],
})
export class SimulationModule {
}
