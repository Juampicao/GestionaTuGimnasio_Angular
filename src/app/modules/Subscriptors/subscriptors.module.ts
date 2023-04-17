import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../Shared/shared.module';

import { FormCreateSubComponent } from './components/forms/form-create-sub/form-create-sub.component';
import { FormFreezeSubComponent } from './components/forms/form-freeze-sub/form-freeze-sub.component';
import { MyFormComponent } from './components/forms/model/my-form.component';
import { QrRegisterAccessComponent } from './components/register-access-subscriptor/qr-register-access/qr-register-access.component';
import { RegisterAccessSubscriptorComponent } from './components/register-access-subscriptor/register-access-subscriptor.component';
import { SubscriptorListComponent } from './components/subscriptor-list/subscriptor-list.component';
import { TableSubscriptorListComponent } from './components/subscriptor-list/table-subscriptor-list/table-subscriptor-list.component';
import { ViewSubPaymentsComponent } from './components/view-subscriptor/view-sub-payments/view-sub-payments.component';
import { ViewSubPersonalInformationComponent } from './components/view-subscriptor/view-sub-personal-information/view-sub-personal-information.component';
import { ViewSubPlanSubscriptionComponent } from './components/view-subscriptor/view-sub-plan-subscription/view-sub-plan-subscription.component';
import { ViewSubRegisterAccessComponent } from './components/view-subscriptor/view-sub-register-access/view-sub-register-access.component';
import { ViewSubscriptorComponent } from './components/view-subscriptor/view-subscriptor.component';
import { SubscriptorComponent } from './subscriptor.component';
import { SubscriptorsRoutingModule } from './subscriptors-routing.module';

@NgModule({
  declarations: [
    SubscriptorComponent,
    // Components
    SubscriptorListComponent,
    RegisterAccessSubscriptorComponent,
    ViewSubscriptorComponent,
    // View - Childs
    ViewSubPaymentsComponent,
    ViewSubPersonalInformationComponent,
    ViewSubRegisterAccessComponent,
    ViewSubPlanSubscriptionComponent,
    FormFreezeSubComponent,
    MyFormComponent,
    FormCreateSubComponent,
    TableSubscriptorListComponent,
    QrRegisterAccessComponent,
  ],
  imports: [CommonModule, SubscriptorsRoutingModule, CoreModule, SharedModule],
  // providers: [PaymentManagerService],
})
export class SubscriptorsModule {}
