import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { MyDeleterNotificationService } from 'src/app/core/services/deleleter-service/MyDeleterNotificationService';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { PlanSubscription } from 'src/app/modules/Models/PlanSubscription/models/PlanSubscription';
import { SubscriptorManagerService } from 'src/app/modules/Subscriptors/services/subscriptor-manager/subscriptor-manager.service';
import { PlanSubscriptionManagerService } from '../../../Payments/services/plan-subscription-manager/plan-subscription-manager.service';
import { PlanSubscriptionListVisual } from './model/PlanSubscriptionListVisual';

@Component({
  selector: 'app-plan-subscription-list',
  templateUrl: './plan-subscription-list.component.html',
  styleUrls: ['./plan-subscription-list.component.css'],
})
export class PlanSubscriptionListComponent implements OnInit {
  isLoading: boolean = true;

  headArrayPlanSubscription = [
    { Head: 'Nombre', FieldName: 'nombre' },
    { Head: 'Id', FieldName: 'id' },
    { Head: 'Monto', FieldName: 'monto' },
    { Head: 'Recurrencia', FieldName: 'recurrencia' },
    { Head: 'Usos', FieldName: 'cantidad' },
    { Head: 'Fecha Expiracion Plan', FieldName: 'expirationDate' },
    { Head: 'Fecha Expiracion Pago', FieldName: 'paymentExpirationDate' },

    { Head: 'Action', FieldName: '' }, // Activando esta fila aparecen las funciones.
  ];

  planSubscriptionsList: any[] = [];
  constructor(
    private _customLogger: MyCustomLogger,
    private _router: Router,
    private _dialog: MatDialog,
    private _clientNotificacion: MyClientNotificationService,
    private _subscriptorManagerService: SubscriptorManagerService,
    // private _paymentManagerService: PaymentManagerService,
    private _deleteNotificationService: MyDeleterNotificationService,
    private _planSubscriptionService: PlanSubscriptionManagerService
  ) {}

  ngOnInit(): void {
    try {
      this.getData();
      this.isLoading = false;
    } catch (error) {
      this._customLogger.logError(
        'PlanSubscriptionListComponent, getData()',
        error
      );
      this._clientNotificacion.openNotification(
        'Error al Cargar la lista de planes',
        'error'
      );
      throw new Error(`${error}`);
    }
  }

  getData() {
    try {
      this._planSubscriptionService.getAllPlanSubscription().subscribe(
        (data: PlanSubscription[]) => {
          this._customLogger.logInfo(
            'PlanSubscriptionList',
            'getAllPlanSubscription()',
            data
          );

          this.planSubscriptionsList = data.map(
            (planSubscription: PlanSubscription) => {
              return new PlanSubscriptionListVisual(planSubscription);
            }
          );

          this._customLogger.logDebug(
            'PlanSubsiptionList, lista:',
            this.planSubscriptionsList
          );
        },
        (error) => {
          this._customLogger.logError('PlanSubscriptionList, getData', error);
        }
      );
    } catch (error) {
      this._customLogger.logError('PlanSusbcriptionList, getData', error);
      this._clientNotificacion.openNotification(
        'Cargar lista de planes',
        'error'
      );
    }
  }

  onEditPlanSubscription(item: any) {
    this._clientNotificacion.functionNotImplemented();
  }

  onViewPlanSubscription(item: any) {
    this._customLogger.logInfo('onViewPlan', JSON.stringify(item, null, 2));
    this._clientNotificacion.functionNotImplemented();
  }

  onDeletePlanSubscription(item: any) {
    this._clientNotificacion.functionNotImplemented();
  }
}
