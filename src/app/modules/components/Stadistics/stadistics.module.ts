import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../../Shared/shared.module';
import { StadisticsRoutingModule } from './stadistics-routing.module';
import { StadisticsComponent } from './stadistics.component';

@NgModule({
  declarations: [StadisticsComponent],
  imports: [CommonModule, StadisticsRoutingModule, CoreModule, SharedModule],
})
export class StadisticsModule {}
