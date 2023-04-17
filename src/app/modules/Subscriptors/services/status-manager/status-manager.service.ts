import { Injectable } from '@angular/core';
import {
  Helper,
  IOperationCompareTwoDates,
} from 'src/app/core/services/helper/Helper';
import { IPaymentStatus } from 'src/app/modules/Models/Payment/interfaces/Interfaces';
import { ISubscriptionStatus } from 'src/app/modules/Models/Subscriptor/.subscription/interface/ISubscriptionStatus';
import { ISubscriptionStatusObject } from './interface/ISubscriptionStatusObject';

import { ICondition } from '../../../Models/Subscriptor/.subscription/interface/IConditions';
@Injectable({
  providedIn: 'root',
})
export class StatusManagerService {
  // Todo completar. Deberia pasarle esto, y en base a esto se genera el estado final.
  // Todo. Hacer una lista con 4 arrays. Todos los estados posibles para COMPLETADO = ["activo" , "periodoPago"]. para PENDIENTE = ["null"]

  subscriptionStatusValues: { [key in ISubscriptionStatus]: IPaymentStatus } = {
    [ISubscriptionStatus.NULL]: IPaymentStatus.PENDIENTE,
    [ISubscriptionStatus.PENDIENTE]: IPaymentStatus.PENDIENTE,
    [ISubscriptionStatus.PERIODOPAGO]: IPaymentStatus.COMPLETADO,
    [ISubscriptionStatus.ACTIVO]: IPaymentStatus.COMPLETADO,
    [ISubscriptionStatus.DEUDA1]: IPaymentStatus.DEUDA,
    [ISubscriptionStatus.DEUDA2]: IPaymentStatus.DEUDA,
    [ISubscriptionStatus.DEUDA3]: IPaymentStatus.DEUDA,
    [ISubscriptionStatus.DEUDA4]: IPaymentStatus.DEUDA,
    [ISubscriptionStatus.MOROSO1]: IPaymentStatus.INACTIVO,
    [ISubscriptionStatus.MOROSO2]: IPaymentStatus.INACTIVO,
    [ISubscriptionStatus.CONGELADO]: IPaymentStatus.INACTIVO,
    [ISubscriptionStatus.ALTA]: IPaymentStatus.ALTA,
    [ISubscriptionStatus.PRUEBA]: IPaymentStatus.COMPLETADO,
  };

  // statusValues2 = {
  //   COMPLETADO: [ISubscriptionStatus.PERIODOPAGO, ISubscriptionStatus.ACTIVO],
  //   PENDIENTE: [ISubscriptionStatus.NULL],
  //   DEUDA: [
  //     ISubscriptionStatus.DEUDA1,
  //     ISubscriptionStatus.DEUDA2,
  //     ISubscriptionStatus.DEUDA3,
  //     ISubscriptionStatus.DEUDA4,
  //   ],
  //   INACTIVO: [ISubscriptionStatus.MOROSO1, ISubscriptionStatus.MOROSO2],
  // };

  statusValues = [
    {
      status: IPaymentStatus.ALTA,
      color: 'bg-yellow-500',
      condicion: 'inhabilitado',
      icon: 'done',
      message: 'Necesita pagar la primer cuota / matricula. Recien creado.',
    },
    {
      status: IPaymentStatus.COMPLETADO,
      color: 'bg-green-500',
      condicion: 'Habilitado',
      icon: 'done',
      message: 'Condicion Habilitado - Habilitado para pasar.',
    },
    {
      status: IPaymentStatus.PENDIENTE,
      color: 'bg-yellow-500',
      condicion: 'Pendiente',
      icon: 'acess_time',
      message: 'Condicion Pendiente - No registra una suscripcion.',
    },
    {
      status: IPaymentStatus.DEUDA,
      color: 'bg-red-500',
      condicion: 'Deudor',
      icon: 'monetization_on',
      message: 'Condicion Deudor - Tiene un pago pendiente.',
    },
    {
      status: IPaymentStatus.INACTIVO,
      color: 'bg-gray-500',
      condicion: 'Inactivo',
      icon: 'block',
      message: 'Condicion Inactivo -  No puede pasar',
    },
  ];

  listStatusAndConditionComplete: any = [
    {
      status: IPaymentStatus.COMPLETADO,
      color: 'bg-green-500',
      condicion: ICondition.HABILITADO,
      icon: 'done',
      message: 'Condicion Habilitado - Habilitado para pasar.',
    },
    {
      status: IPaymentStatus.PENDIENTE,
      color: 'bg-yellow-500',
      condicion: ICondition.INHABILITADO,
      icon: 'acess_time',
      message: 'Condicion Pendiente - No registra una suscripcion.',
    },
    {
      status: IPaymentStatus.DEUDA,
      color: 'bg-red-500',
      condicion: ICondition.INHABILITADO,
      icon: 'monetization_on',
      message: 'Condicion Deudor - Tiene un pago pendiente.',
    },
    {
      status: IPaymentStatus.INACTIVO,
      color: 'bg-gray-500',
      condicion: ICondition.INHABILITADO,
      icon: 'block',
      message: 'Condicion Inactivo -  No puede pasar',
    },
  ];

  constructor() {}

  /**
   * Encontrar cual es el paymentStatus para cada ISubscriptionStatus. LLamarla de forma interna o externa?
   * @param subscriptionStatus
   * @returns
   */
  getIPaymentStatusOfISubscriptionStatus(
    subscriptionStatus: ISubscriptionStatus
  ): IPaymentStatus {
    return this.subscriptionStatusValues[subscriptionStatus];
  }

  /**
   * @returns className color of status
   */
  statusColor(statusSubscription: ISubscriptionStatus): string {
    const status =
      this.getIPaymentStatusOfISubscriptionStatus(statusSubscription);

    const statusColor = this.statusValues.find(
      (option) => option.status === status
    );

    if (statusColor) {
      return `${statusColor.color}`;
    }

    return `bg-slate-900`;
  }

  /**
   *
   * @param status IPaymentStatus
   * @returns mensaje a mostrar para este estado
   */
  statusMessage(statusSubscription: ISubscriptionStatus): string {
    const status =
      this.getIPaymentStatusOfISubscriptionStatus(statusSubscription);

    const statusMessage = this.statusValues.find(
      (option) => option.status === status
    );

    if (statusMessage) {
      return `${statusMessage.message}`;
    }

    return `No tiene ningun estado`;
  }

  /**
   *
   * @param dateExpired Date
   * @returns Fecha Parseada para mostrar.
   */
  statusDate(dateExpired: Date | null) {
    if (!dateExpired) {
      return `No Hay Fecha`;
    } else {
      return `${dateExpired.toISOString().split('T')[0]}`;
    }
  }

  /**
   *
   * @param dateExpired Date
   * @returns Dias que faltan para vencer o dias que ya vencio.
   */
  daysToExpired(dateExpired: Date | null) {
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
   * @returns className color of status
   */
  getCondition(statusSubscription: ISubscriptionStatus): string {
    const status =
      this.getIPaymentStatusOfISubscriptionStatus(statusSubscription);

    const statusCondition = this.statusValues.find(
      (option) => option.status === status
    );

    if (statusCondition) {
      return `${statusCondition.condicion}`;
    }

    return `Null`;
  }

  /**
   * @returns className color of status
   */
  getConditionIcon(statusSubscription: ISubscriptionStatus): string {
    const status =
      this.getIPaymentStatusOfISubscriptionStatus(statusSubscription);

    const statusCondition = this.statusValues.find(
      (option) => option.status === status
    );

    if (statusCondition) {
      return `${statusCondition.icon}`;
    }

    return `Null`;
  }

  getSubscriptionStatusObjects(): ISubscriptionStatusObject[] {
    const subscriptionStatusObjects: ISubscriptionStatusObject[] = [];

    for (const status in this.subscriptionStatusValues) {
      if (
        Object.prototype.hasOwnProperty.call(
          this.subscriptionStatusValues,
          status
        )
      ) {
        const typedStatus = status as ISubscriptionStatus;
        subscriptionStatusObjects.push({
          status: typedStatus,
          condicion: this.subscriptionStatusValues[typedStatus],
        });
      }
    }

    return subscriptionStatusObjects;
  }
}

// import { Injectable } from '@angular/core';
// import {
//   Helper,
//   IOperationCompareTwoDates,
// } from 'src/app/core/services/helper/Helper';
// import { IPaymentStatus } from 'src/app/modules/Models/Payment/interfaces/Interfaces';
// import { ISubscriptionStatus } from 'src/app/modules/Models/Subscriptor/.subscription/interface/ISubscriptionStatus';

// @Injectable({
//   providedIn: 'root',
// })
// export class StatusManagerService {
//   // Todo completar. Deberia pasarle esto, y en base a esto se genera el estado final.
//   // Todo. Hacer una lista con 4 arrays. Todos los estados posibles para COMPLETADO = ["activo" , "periodoPago"]. para PENDIENTE = ["null"]
//   subscriptionStatusValues = {
//     [ISubscriptionStatus.NULL]: IPaymentStatus.PENDIENTE,
//     [ISubscriptionStatus.PERIODOPAGO]: IPaymentStatus.COMPLETADO,
//     [ISubscriptionStatus.ACTIVO]: IPaymentStatus.COMPLETADO,
//     [ISubscriptionStatus.DEUDA1]: IPaymentStatus.DEUDA,
//     [ISubscriptionStatus.DEUDA2]: IPaymentStatus.DEUDA,
//     [ISubscriptionStatus.DEUDA3]: IPaymentStatus.DEUDA,
//     [ISubscriptionStatus.DEUDA4]: IPaymentStatus.DEUDA,
//     [ISubscriptionStatus.MOROSO1]: IPaymentStatus.INACTIVO,
//     [ISubscriptionStatus.MOROSO2]: IPaymentStatus.INACTIVO,
//   };

//   statusValues2 = {
//     COMPLETADO: [ISubscriptionStatus.PERIODOPAGO, ISubscriptionStatus.ACTIVO],
//     PENDIENTE: [ISubscriptionStatus.NULL],
//     DEUDA: [
//       ISubscriptionStatus.DEUDA1,
//       ISubscriptionStatus.DEUDA2,
//       ISubscriptionStatus.DEUDA3,
//       ISubscriptionStatus.DEUDA4,
//     ],
//     INACTIVO: [ISubscriptionStatus.MOROSO1, ISubscriptionStatus.MOROSO2],
//   };

//   statusValues = [
//     {
//       status: IPaymentStatus.COMPLETADO,
//       color: 'bg-green-500',
//       message: 'Habilitado para pasar.',
//     },
//     {
//       status: IPaymentStatus.PENDIENTE,
//       color: 'bg-yellow-500',
//       message: 'No registra una suscripcion.',
//     },
//     {
//       status: IPaymentStatus.DEUDA,
//       color: 'bg-red-500',
//       message: 'Tiene un pago pendiente. No Puede Pasar',
//     },
//     {
//       status: IPaymentStatus.INACTIVO,
//       color: 'bg-gray-500',
//       message: 'Esta Inactivo. No puede pasar',
//     },
//   ];

//   constructor() {}

//   /**
//    * Encontrar cual es el paymentStatus para cada ISubscriptionStatus. LLamarla de forma interna o externa?
//    * @param subscriptionStatus
//    * @returns
//    */
//   getIPaymentStatusOfISubscriptionStatus(
//     subscriptionStatus: ISubscriptionStatus
//   ): IPaymentStatus {
//     return this.subscriptionStatusValues[subscriptionStatus];
//   }

//   /**
//    * @returns className color of status
//    */
//   statusColor(status: ISubscriptionStatus | IPaymentStatus): string {
//     const statusColor = this.statusValues.find(
//       (option) => option.status === status
//     );

//     if (statusColor) {
//       return `${statusColor.color}`;
//     }

//     return `bg-slate-900`;
//   }

//   /**
//    *
//    * @param status IPaymentStatus
//    * @returns mensaje a mostrar para este estado
//    */
//   statusMessage(status: ISubscriptionStatus | IPaymentStatus): string {
//     const statusMessage = this.statusValues.find(
//       (option) => option.status === status
//     );

//     if (statusMessage) {
//       return `${statusMessage.message}`;
//     }

//     return `No tiene ningun estado`;
//   }

//   /**
//    *
//    * @param dateExpired Date
//    * @returns Fecha Parseada para mostrar.
//    */
//   statusDate(dateExpired: Date | null) {
//     if (!dateExpired) {
//       return `No Hay Fecha`;
//     } else {
//       return `${dateExpired.toISOString().split('T')[0]}`;
//     }
//   }

//   /**
//    *
//    * @param dateExpired Date
//    * @returns Dias que faltan para vencer o dias que ya vencio.
//    */
//   daysToExpired(dateExpired: Date | null) {
//     const expirationDate = dateExpired;
//     const today = Helper.TodayDate();

//     if (!expirationDate) {
//       return `No Hay Fecha`;
//     }

//     if (
//       Helper.compareTwoDates(
//         IOperationCompareTwoDates.GREATER,
//         expirationDate,
//         today
//       )
//     ) {
//       return `Faltan ${Helper.daysUntil(
//         today,
//         expirationDate
//       )} Dias para vencer`;
//     } else {
//       return `Vencio hace ${Helper.daysUntil(today, expirationDate)} Dias.`;
//     }
//   }
// }
