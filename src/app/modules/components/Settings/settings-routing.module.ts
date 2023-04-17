import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormStatusComponent } from './forms/form-status/form-status.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  { path: '', component: SettingsComponent },
  { path: ':id', component: FormStatusComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
