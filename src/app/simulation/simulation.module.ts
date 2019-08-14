import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SimulationRoutingModule } from './simulation-routing.module';
import { SimulationComponent } from './simulation.component';
import { SimulationListComponent } from './simulation-list/simulation-list.component';
import { SimulationItemComponent } from './simulation-item/simulation-item.component';
import { SimulationTableComponent } from './simulation-item/simulation-table/simulation-table.component';
import { SimulationCreateComponent } from './simulation-item/simulation-create/simulation-create.component';
import { SimulationService } from '../shared/services/simulation.service';


@NgModule({
  declarations: [
    SimulationComponent,
    SimulationListComponent,
    SimulationItemComponent,
    SimulationTableComponent,
    SimulationCreateComponent,
  ],
  entryComponents: [SimulationCreateComponent],
  imports: [
    CommonModule,
    SimulationRoutingModule,
    SharedModule
  ],
  providers: [
    SimulationService
  ]
})
export class SimulationModule {
}
