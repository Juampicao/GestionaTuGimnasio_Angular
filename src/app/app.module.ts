import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Core Module
import { CoreModule } from './core/core.module';
import { MyDialogService } from './core/services/dialog-container-service/my-dialog-container.service';
import { MyMainLayoutComponent } from './modules/Layout/my-main-layout/my-main-layout.component';
import { MainLoginComponent } from './modules/Login/layout/main-login/main-login.component';
import { SharedModule } from './modules/Shared/shared.module';
import { StatusManager2Service } from './modules/Subscriptors/services/status-manager/2/status-manager2.service';

// Servicio

@NgModule({
  declarations: [AppComponent, MyMainLayoutComponent, MainLoginComponent],
  imports: [
    CoreModule,
    SharedModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],

  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    MyDialogService,
    MatDialog,
    StatusManager2Service,
  ],
})
export class AppModule {}
