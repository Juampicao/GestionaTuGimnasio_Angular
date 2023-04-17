import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCreatePlanSubscriptionComponent } from './components/forms/form-create-plan-subscription/form-create-plan-subscription.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'formulario-plan-suscripcion',
    component: FormCreatePlanSubscriptionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
