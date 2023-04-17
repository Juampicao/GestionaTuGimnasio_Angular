import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutinesComponent } from './rutines.component';

const routes: Routes = [{ path: '', component: RutinesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutinesRoutingModule {}
