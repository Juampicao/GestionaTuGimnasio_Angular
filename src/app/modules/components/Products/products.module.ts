import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../../Shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, ProductsRoutingModule, CoreModule, SharedModule],
})
export class ProductsModule {}
