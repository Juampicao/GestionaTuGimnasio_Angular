import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../../Shared/shared.module';
import { FormCreatePlanSubscriptionComponent } from './components/forms/form-create-plan-subscription/form-create-plan-subscription.component';
import { PlanSubscriptionListComponent } from './components/plan-subscription-list/plan-subscription-list.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FormCreatePlanSubscriptionComponent,
    PlanSubscriptionListComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, CoreModule, SharedModule],
  providers: [
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
  ],
})
export class DashboardModule {}
