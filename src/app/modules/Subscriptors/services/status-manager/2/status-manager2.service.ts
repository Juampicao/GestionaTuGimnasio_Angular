import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap } from 'rxjs';
import { MySearchClass } from 'src/app/core/modules/components/07-search-bar/my-search-bar/my-search-bar.component';
import {
  Helper,
  IOperationCompareTwoDates,
} from 'src/app/core/services/helper/Helper';
import { StatusList } from 'src/app/modules/components/Settings/status-list/status-list.component';
import { ICondition } from 'src/app/modules/Models/Subscriptor/.subscription/interface/IConditions';
import { ISubscriptionStatus } from 'src/app/modules/Models/Subscriptor/.subscription/interface/ISubscriptionStatus';
import { statusManagerList } from './statusManagerList';

@Injectable({
  providedIn: 'root',
})
export class StatusManager2Service {
  //! Lista  con la infromacion oficial de estados.
  private _refreshData$ = new Subject<void>();

  private statusManagerList: StatusList[] = [
    {
      status: ISubscriptionStatus.DEUDA1,
      color: 'bg-red-500',
      condition: ICondition.HABILITADO,
      message: 'Debe 1 pago',
      icon: 'done',
      id: 1,
    },
    {
      status: ISubscriptionStatus.DEUDA2,
      color: 'bg-red-500',
      condition: ICondition.INHABILITADO,
      message: 'Debe 2 pagos',
      icon: 'done',
      id: 2,
    },
    {
      status: ISubscriptionStatus.DEUDA3,
      color: 'bg-red-500',
      condition: ICondition.INHABILITADO,
      message: 'Debe 3 pagos',
      icon: 'done',
      id: 3,
    },
    {
      status: ISubscriptionStatus.DEUDA4,
      color: 'bg-red-500',
      condition: ICondition.INHABILITADO,
      message: 'Debe 4 pagos',
      icon: 'done',
      id: 4,
    },
    {
      status: ISubscriptionStatus.MOROSO1,
      color: 'bg-red-500',
      condition: ICondition.INHABILITADO,
      message: 'Debe mas de 4 pagos',
      icon: 'done',
      id: 5,
    },
    {
      status: ISubscriptionStatus.MOROSO2,
      color: 'bg-red-500',
      condition: ICondition.INHABILITADO,
      message: 'Debe mas de 4 pagos',
      icon: 'done',
      id: 6,
    },
    {
      status: ISubscriptionStatus.CONGELADO,
      color: 'bg-slate-500',
      condition: ICondition.INHABILITADO,
      message: 'Tiene la suscripcion congelada',
      icon: 'done',
      id: 7,
    },
    {
      status: ISubscriptionStatus.PENDIENTE,
      color: 'bg-yellow-500',
      condition: ICondition.INHABILITADO,
      message: 'No tiene suscripcion',
      icon: 'done',
      id: 8,
    },
    {
      status: ISubscriptionStatus.ACTIVO,
      color: 'bg-green-500',
      condition: ICondition.HABILITADO,
      message: 'Puede pasar!',
      icon: 'done',
      id: 9,
    },
    {
      status: ISubscriptionStatus.ALTA,
      color: 'bg-yellow-500',
      condition: ICondition.INHABILITADO,
      message: 'Necesita pagar la primer cuota / matricula.',
      icon: 'done',
      id: 10,
    },
    {
      status: ISubscriptionStatus.PRUEBA,
      color: 'bg-blue-500',
      condition: ICondition.HABILITADO,
      message: 'Esta en el periodo de prueba',
      icon: 'done',
      id: 11,
    },
  ];

  constructor() {}

  get refreshData$() {
    return this._refreshData$;
  }

  getStatusManagerList(): Observable<StatusList[]> {
    return of(this.statusManagerList);
  }

  /**
   * @param status: ISubscriptionStatus
   * @returns ICondition
   */
  getCondition(statusSubscription: ISubscriptionStatus): ICondition {
    const statusObj = this.statusManagerList.find(
      (status) => status.status === statusSubscription
    );
    if (statusObj) {
      return statusObj.condition;
    } else {
      throw new Error(`Status ${statusSubscription} no fue encontrado.`);
    }
  }

  /**
   * @param status: ISubscriptionStatus
   * @returns IStatusListList
   */
  getStatusObject(statusSubscription: ISubscriptionStatus): StatusList {
    const statusObj = this.statusManagerList.find(
      (status) => status.status === statusSubscription
    );
    if (statusObj) {
      return statusObj;
    } else {
      throw new Error(`Status ${statusSubscription} no fue encontrado.`);
    }
  }

  /**
   * @returns className color of status
   */
  statusColor(statusSubscription: ISubscriptionStatus): string {
    const status = this.getStatusObject(statusSubscription).color;

    if (status) {
      return status;
    }

    return `bg-slate-900`;
  }

  /**
   *
   * @param dateExpired Date
   * @returns Dias que faltan para vencer o dias que ya vencio.
   */
  getNumberDaysToExpired(dateExpired: Date | null) {
    const expirationDate = dateExpired;
    const today = Helper.TodayDate();

    if (!expirationDate) {
      return `No Hay Fecha`;
    }

    if (
      Helper.compareTwoDates(
        IOperationCompareTwoDates.GREATER,
        expirationDate,
        today
      )
    ) {
      return `Faltan ${Helper.daysUntil(
        today,
        expirationDate
      )} Dias para vencer`;
    } else {
      return `Vencio hace ${Helper.daysUntil(today, expirationDate)} Dias.`;
    }
  }

  /**
   *
   * @param dateExpired Date
   * @returns Fecha Parseada para mostrar.
   */
  parseDateToExpired(dateExpired: Date | null) {
    if (!dateExpired) {
      return `No Hay Fecha`;
    } else {
      return `${dateExpired.toISOString().split('T')[0]}`;
    }
  }

  // Buscar por id
  // getStatusListById(id: any = 2): Observable<StatusList> {
  getStatusListById(id: any): Observable<StatusList> {
    try {
      console.info('El id recibido al servicio es:', id);
      const statusObj = this.statusManagerList.find((item) => item.id === id);

      if (statusObj) {
        console.info('Encontrado:', statusObj);
        return of(statusObj);
      } else {
        console.info('lista', this.statusManagerList);
        throw new Error(`Id ${id} no fue encontrado.`);
      }
    } catch (error) {
      console.error('error', error);
      throw new Error(`Id ${id} no fue encontrado.`);
    }
  }

  getStatusToSelect(): Observable<MySearchClass[]> {
    const response = statusManagerList.map(({ status, id }) => ({
      label: status,
      value: id,
    }));

    return of(response);
  }

  editStatusObject(data: StatusList): Observable<StatusList> {
    try {
      const statusObj = this.statusManagerList.find(
        (item) => item.id === data.id
      );
      if (statusObj) {
        statusObj.condition = data.condition;
        statusObj.message = data.message;

        this.statusManagerList.push(statusObj);
      } else {
        // Si el objeto no existe en el array, agregamos el objeto editado al final del array
        throw new Error(`No existe este status o no se encontro.`);
      }

      console.info(
        'Editado correcto',
        statusObj,
        'nueva lista',
        this.statusManagerList
      );
      // return of(true);
      return of(statusObj).pipe(
        tap(() => {
          this.refreshData$.next();
        })
      );
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  // editStatusObject(dataFormStatus: DataFormStatus): Observable<any> {
  //   try {
  //     const statusObj = this.statusManagerList.find(
  //       (item) => item.id === dataFormStatus.id
  //     );
  //     if (statusObj) {
  //       statusObj.status = dataFormStatus.status;
  //       statusObj.condition = dataFormStatus.condition;
  //       statusObj.message = dataFormStatus.message;
  //     } else {
  //       // Si el objeto no existe en el array, agregamos el objeto editado al final del array
  //       this.statusManagerList.push({
  //         status: dataFormStatus.status,
  //         condition: dataFormStatus.condition,
  //         message: dataFormStatus.message,
  //         icon: null,
  //         id: dataFormStatus.id,
  //         color: '',
  //       });
  //     }

  //     console.info(
  //       'Editado correcto',
  //       statusObj,
  //       'nueva lista',
  //       this.statusManagerList
  //     );
  //     // return of(true);
  //     return of(statusObj).pipe(
  //       tap(() => {
  //         this.refreshData$.next();
  //       })
  //     );
  //   } catch (error) {
  //     throw new Error(`${error}`);
  //   }
  // }

  // editStatusObject(dataFormStatus: DataFormStatus): Observable<any> {
  //   try {
  //     const index = this.statusManagerList.findIndex(
  //       (item) => item.id === dataFormStatus.id
  //     );
  //     if (index !== -1) {
  //       const statusObj = this.statusManagerList[index];
  //       statusObj.status = dataFormStatus.status;
  //       statusObj.condition = dataFormStatus.condition;
  //       statusObj.message = dataFormStatus.message;

  //       this.statusManagerList.splice(index, 1, statusObj);
  //       console.info(
  //         'Editado correcto',
  //         statusObj,
  //         'nueva lista',
  //         this.statusManagerList
  //       );
  //       return of(statusObj).pipe(
  //         tap(() => {
  //           this.refreshData$.next();
  //         })
  //       );
  //     } else {
  //       throw new Error(
  //         `El objeto con id ${dataFormStatus.id} no existe en la lista.`
  //       );
  //     }
  //   } catch (error) {
  //     throw new Error(`${error}`);
  //   }
  // }
}
