import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimulationComponent } from './simulation.component';
import { SimulationListComponent } from './simulation-list/simulation-list.component';
import { SimulationItemComponent } from './simulation-item/simulation-item.component';


const routes: Routes = [
  {
    path: '',
    component: SimulationComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: SimulationListComponent,
      },
      {
        path: 'list/new',
        component: SimulationItemComponent
      },
      {
        path: 'list/:id',
        component: SimulationItemComponent
      }
    ]
  }
];

@NgModule ({
  imports: [RouterModule.forChild (routes)],
  exports: [RouterModule]
})
export class SimulationRoutingModule {
}
