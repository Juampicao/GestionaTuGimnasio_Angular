import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { FormStatusComponent } from 'src/app/modules/components/Settings/forms/form-status/form-status.component';
import { IStatusList } from 'src/app/modules/components/Settings/status-list/status-list.component';
import { ICondition } from 'src/app/modules/Models/Subscriptor/.subscription/interface/IConditions';
import { ISubscriptionStatus } from 'src/app/modules/Models/Subscriptor/.subscription/interface/ISubscriptionStatus';
import { StatusManager2Service } from 'src/app/modules/Subscriptors/services/status-manager/2/status-manager2.service';
import { statusManagerList } from 'src/app/modules/Subscriptors/services/status-manager/2/statusManagerList';
import { StatusManagerService } from 'src/app/modules/Subscriptors/services/status-manager/status-manager.service';

@Component({
  selector: 'app-status-list-prueba',
  templateUrl: './status-list-prueba.component.html',
  styleUrls: ['./status-list-prueba.component.css'],
})
export class StatusListPruebaComponent implements OnInit {
  isLoading: boolean = true;
  headArrayStatusList = [
    {
      Head: 'Estado',
      FieldName: 'status',
      ClassName: ' text-center ',
    },
    {
      Head: 'Condicion',
      FieldName: 'condition',
      ClassName: 'text-center ',
    },
    { Head: 'Mensaje', FieldName: 'message' },
    { Head: 'Action', FieldName: '' }, // Activando esta fila aparecen las funciones.
  ];

  private _statusManagerList: IStatusList[] = [];

  conditionOptions: ICondition[] = [
    ICondition.HABILITADO,
    ICondition.INHABILITADO,
  ];

  constructor(
    private _customLogger: MyCustomLogger,
    private _statusManagerService: StatusManagerService,
    private _clientNotificacion: MyClientNotificationService,
    private _dialog: Dialog,
    private _statusManagerService2: StatusManager2Service
  ) {
    this._statusManagerList = statusManagerList;
  }

  ngOnInit(): void {
    this.isLoading = false;
  }
  getStatusManagerList(): IStatusList[] {
    return this._statusManagerList;
  }
  getCondition(): ICondition {
    try {
      return this._statusManagerService2.getCondition(
        ISubscriptionStatus.DEUDA2
      );
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  getStatusObject(): IStatusList {
    try {
      return this._statusManagerService2.getStatusObject(
        ISubscriptionStatus.DEUDA2
      );
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  onViewStatus(item: any) {
    return this._clientNotificacion.functionNotImplemented();
  }

  onEditStatus(item: IStatusList) {
    console.info(item);
    console.log(
      'Data que se pasa al formulario:',
      item.status,
      item.condition,
      item.message
    );

    const dialogRef = this._dialog.open(FormStatusComponent, {
      data: {
        status: item.status,
        condition: item.condition,
        message: item.message,
      },
    });
  }

  onDeleteStatus(item: any) {
    return this._clientNotificacion.functionNotImplemented();
  }
}
