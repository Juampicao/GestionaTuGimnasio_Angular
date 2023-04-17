import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSubPaymentsComponent } from './components/view-subscriptor/view-sub-payments/view-sub-payments.component';
import { ViewSubPersonalInformationComponent } from './components/view-subscriptor/view-sub-personal-information/view-sub-personal-information.component';
import { ViewSubPlanSubscriptionComponent } from './components/view-subscriptor/view-sub-plan-subscription/view-sub-plan-subscription.component';
import { ViewSubRegisterAccessComponent } from './components/view-subscriptor/view-sub-register-access/view-sub-register-access.component';
import { ViewSubscriptorComponent } from './components/view-subscriptor/view-subscriptor.component';
import { SUBSCRIPTOR_ROUTES } from './routes/SubscriptorRoutes';
// import { SubscriptorRoutes } from './routes/SubscriptorRoutes';
import { SubscriptorComponent } from './subscriptor.component';

const routes: Routes = [
  { path: '', component: SubscriptorComponent },
  {
    path: ':id',
    component: ViewSubscriptorComponent,
  },
  // Personal Information
  {
    path: SUBSCRIPTOR_ROUTES.PERSONALINFORMATION,
    component: ViewSubPersonalInformationComponent,
  },
  // Plan Subscription
  {
    path: SUBSCRIPTOR_ROUTES.SUBSCRIPTION,
    component: ViewSubPlanSubscriptionComponent,
  },
  // Register Access
  {
    path: SUBSCRIPTOR_ROUTES.REGISTERACCESS,
    component: ViewSubRegisterAccessComponent,
  },
  // Payments
  {
    path: SUBSCRIPTOR_ROUTES.PAYMENTS,
    component: ViewSubPaymentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptorsRoutingModule {}
