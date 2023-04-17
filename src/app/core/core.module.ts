import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../modules/Shared/shared.module';
import { MyReutilizableTableComponent } from './modules/components/01-table-reutilizable/my-reutilizable-table/my-reutilizable-table.component';
import { MyTablePaginatorComponent } from './modules/components/01-table-reutilizable/my-table-paginator/my-table-paginator.component';
import { MyMenuNavbarComponent } from './modules/components/02-menu-navbar/my-menu-navbar/my-menu-navbar.component';
import { MyDeleteComponent } from './modules/components/03-delete/my-delete.component';
import { MyHeaderComponent } from './modules/components/04-header/my-header.component';
import { MyInputComponent } from './modules/components/05-form-reutilizable/my-input/my-input.component';
import { MyTabButtonComponent } from './modules/components/06-tab-button/my-tab-button/my-tab-button.component';
import { MySearchBarComponent } from './modules/components/07-search-bar/my-search-bar/my-search-bar.component';
import { MyBackButtonComponent } from './modules/components/09-buttons/my-back-button/my-back-button.component';
import { MyButtonComponent } from './modules/components/09-buttons/my-button/my-button.component';
import { MyCancelButtonComponent } from './modules/components/09-buttons/my-cancel-button/my-cancel-button.component';
import { MyFloatingButtonComponent } from './modules/components/09-buttons/my-floating-button/my-floating-button.component';
import { MyWhatsappButtonComponent } from './modules/components/09-buttons/my-whatsapp-button/my-whatsapp-button.component';
import { MyDialogContainerComponent } from './modules/components/10-dialog-container/my-dialog-container/my-dialog-container.component';
import { MyConfirmComponent } from './modules/components/11-confirm-reutilizable/my-confirm/my-confirm.component';
import { ConstructionPageComponent } from './modules/components/12-pagina-construccion/construction-page/construction-page.component';
import { MyBarChartComponent } from './modules/components/13-stadistics/my-bar-chart/my-bar-chart.component';
import { CountryService } from './modules/components/13-stadistics/services/country.service';
import { MyMatChipsComponent } from './modules/components/14-mat-chips/my-mat-chips/my-mat-chips.component';
import { MyErrorAlertComponent } from './modules/error-alert/my-error-alert.component';
import { MySnackBarComponent } from './modules/snackbar/my-snack-bar.component';
import { MySpinerComponent } from './modules/spiner/my-spiner.component';
import { AuthGuard } from './services/auth-guard/auth-guard.component';
import { AuthService } from './services/auth-service/auth.service';
import { MyClientNotificationService } from './services/client-notificacion/my-client-notification.service';
import { MyDeleterNotificationService } from './services/deleleter-service/MyDeleterNotificationService';
import { MyDialogService } from './services/dialog-container-service/my-dialog-container.service';
import { MyCustomLogger } from './services/log/my-custom-logger';

@NgModule({
  declarations: [
    MySnackBarComponent,
    MySpinerComponent,
    MyErrorAlertComponent,
    MyReutilizableTableComponent,
    MyBackButtonComponent,
    MyMenuNavbarComponent,
    MyHeaderComponent,
    MyTabButtonComponent,
    MySearchBarComponent,
    MyWhatsappButtonComponent,
    MyFloatingButtonComponent,
    MyDeleteComponent,
    MyInputComponent,
    MyDialogContainerComponent,
    MyTablePaginatorComponent,
    MyButtonComponent,
    MyConfirmComponent,
    MyCancelButtonComponent,
    ConstructionPageComponent,
    AuthGuard,
    MyBarChartComponent,
    MyMatChipsComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    MySnackBarComponent,
    MySpinerComponent,
    MyErrorAlertComponent,
    MyReutilizableTableComponent,
    MyBackButtonComponent,
    MyMenuNavbarComponent,
    MyHeaderComponent,
    MyTabButtonComponent,
    MySearchBarComponent,
    MyWhatsappButtonComponent,
    MyFloatingButtonComponent,
    MyDeleteComponent,
    MyInputComponent,
    MyDialogContainerComponent,
    MyTablePaginatorComponent,
    MyButtonComponent,
    MyConfirmComponent,
    MyCancelButtonComponent,
    ConstructionPageComponent,
    MyBarChartComponent,
    AuthGuard,
    MyMatChipsComponent,
  ],
  providers: [
    MyClientNotificationService,
    MyCustomLogger,
    MyDeleterNotificationService,
    MyDialogService,
    AuthService,
    CountryService,
  ],
})
export class CoreModule {}
