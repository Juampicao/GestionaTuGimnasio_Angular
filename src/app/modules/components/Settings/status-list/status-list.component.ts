import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { ISubscriptionStatus } from 'src/app/modules/Models/Subscriptor/.subscription/interface/ISubscriptionStatus';
import { StatusManager2Service } from 'src/app/modules/Subscriptors/services/status-manager/2/status-manager2.service';
import { StatusManagerInjectorService } from 'src/app/modules/Subscriptors/services/status-manager/injector/status-manager-injector.service';
import { StatusManagerService } from 'src/app/modules/Subscriptors/services/status-manager/status-manager.service';

import { ICondition } from '../../../Models/Subscriptor/.subscription/interface/IConditions';
import { FormStatusComponent } from '../forms/form-status/form-status.component';

export interface IStatusList {
  status: ISubscriptionStatus;
  color: string;
  condition: ICondition;
  message: string;
  icon: string | null;
  id: any;
}

export class StatusList {
  constructor(
    public status: ISubscriptionStatus,
    public color: string,
    public condition: ICondition,
    public message: string,
    public icon: string | null,
    public id: any
  ) {}
}

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css'],
})
export class StatusListComponent implements OnInit {
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

  private _statusManagerList: StatusList[] = [];

  conditionOptions: ICondition[] = [
    ICondition.HABILITADO,
    ICondition.INHABILITADO,
  ];

  private _statusManagerService2!: StatusManager2Service;

  constructor(
    private _customLogger: MyCustomLogger,
    private _statusManagerService: StatusManagerService,
    private _clientNotificacion: MyClientNotificationService,
    private _dialog: Dialog,
    // private _statusManagerService2: StatusManager2Service,
    private _router: Router
  ) {
    //! Injector Service
    this._statusManagerService2 =
      StatusManagerInjectorService.selectService('mock');
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.getData();
    this._statusManagerService2.refreshData$.subscribe(() => {
      this.getData();
    });
  }

  /**
   * Retornar lista de statusManagerList.
   */
  getData() {
    this._statusManagerService2.getStatusManagerList().subscribe((response) => {
      this._statusManagerList = response;
    });
  }

  getStatusManagerList(): StatusList[] {
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

  getStatusObject(): StatusList {
    try {
      return this._statusManagerService2.getStatusObject(
        ISubscriptionStatus.DEUDA2
      );
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  onViewStatus(item: StatusList) {
    // return this._clientNotificacion.functionNotImplemented();
    this._router.navigate(['settings/' + item.id]);
  }

  onEditStatus(item: StatusList) {
    console.info(item);
    console.log(
      'Data que se pasa al formulario:',
      item.status,
      item.condition,
      item.message
    );

    // const dialogRef = this._dialog.open(FormStatusComponent, {
    //   data: new DataFormStatus(item.status, item.condition, item.message),
    // });
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
