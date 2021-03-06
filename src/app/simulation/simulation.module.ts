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
import { PortfolioService } from '../shared/services/portfolio.service';
import { SimulationReportsComponent } from './simulation-reports/simulation-reports.component';
import { TransactionDetailsComponent } from './simulation-reports/transaction-details/transaction-details.component';
import { TransactionInfoComponent } from './simulation-reports/transaction-info/transaction-info.component';
import { StressedComponent } from './simulation-reports/stressed/stressed.component';
import { CashFlowComponent } from './simulation-reports/cash-flow/cash-flow.component';
import { ReportsTableComponent } from './simulation-reports/reports-table/reports-table.component';
import { SimulationReportsService } from '../shared/services/simulation-reports.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ConfirmComponent } from '../shared/components/confirm/confirm.component';
import { CanDeactivateGuard } from '../shared/helpers/canDeactivate';


@NgModule({
  declarations: [
    SimulationComponent,
    SimulationListComponent,
    SimulationItemComponent,
    SimulationTableComponent,
    SimulationCreateComponent,
    SimulationReportsComponent,
    TransactionDetailsComponent,
    TransactionInfoComponent,
    StressedComponent,
    CashFlowComponent,
    ReportsTableComponent,
  ],
  entryComponents: [
    SimulationCreateComponent,
    SimulationReportsComponent
  ],
  imports: [
    CommonModule,
    SimulationRoutingModule,
    SharedModule,
    PerfectScrollbarModule,
  ],
  providers: [
    SimulationService,
    PortfolioService,
    SimulationReportsService,
    CanDeactivateGuard
  ]
})
export class SimulationModule {
}
