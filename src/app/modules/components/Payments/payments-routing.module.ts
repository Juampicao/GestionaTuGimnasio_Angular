import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCreatePaymentComponent } from './components/forms/form-create-payment/form-create-payment.component';
import { ViewPaymentComponent } from './components/view-payment/view-payment.component';
import { PaymentsComponent } from './payments.component';

const routes: Routes = [
  { path: '', component: PaymentsComponent },
  {
    path: 'formulario-pago-suscripcion',
    component: FormCreatePaymentComponent,
  },
  { path: ':id', component: ViewPaymentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsRoutingModule {}
