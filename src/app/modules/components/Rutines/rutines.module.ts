import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../../Shared/shared.module';
import { RutinesRoutingModule } from './rutines-routing.module';
import { RutinesComponent } from './rutines.component';

@NgModule({
  declarations: [RutinesComponent],
  imports: [CommonModule, RutinesRoutingModule, CoreModule, SharedModule],
})
export class RutinesModule {}
