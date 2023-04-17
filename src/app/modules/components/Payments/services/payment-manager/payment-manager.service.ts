import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap, throwError } from 'rxjs';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import {
  SUBSCRIPTOR_PAYMENT_DEFAULT_1,
  SUBSCRIPTOR_PAYMENT_DEFAULT_2,
  SUBSCRIPTOR_PAYMENT_DEFAULT_3,
} from 'src/app/modules/data/mockData/payment/subscriptor-payment/subscriptorPaymentDefaultData';
import { NoHayResultadosError } from 'src/app/modules/Models/error/NoHayResultadosError';
import { IPaymentStatus } from 'src/app/modules/Models/Payment/interfaces/Interfaces';
import { IPaymentMethod } from 'src/app/modules/Models/Payment/interfaces/IPaymentMethods';
import { Payment } from 'src/app/modules/Models/Payment/models/Payment';
import { SubscriptionSubscriptorPayment } from 'src/app/modules/Models/Payment/models/SubscriptionSubscriptorPayment';
import { SubscriptorPayment } from 'src/app/modules/Models/Payment/models/SubscriptorPayment';
import { PaymentFilter } from 'src/app/modules/Models/Payment/paymentFilter/PaymentFilter';
import { Bank } from 'src/app/modules/Models/Payment/paymentMethods/Bank';
import { BankTransfer } from 'src/app/modules/Models/Payment/paymentMethods/BankTransfer';
import { CreateNewPaymentSubscriptionData } from 'src/app/modules/Models/Payment/services/models/CreateNewPaymentSubscriptionData';
import { IPaymentManagerService } from './interface/IPaymentManagerService';

enum IBankOptions {
  BBVA = 'bbva',
  CIUDAD = 'ciudad',
  OTRO = '',
}

/**
 * Cuenta de banco donde se recibirán pagos. Es la propia de la empresa donde se registrá el balance de todas las transferencias enviadas aca.
 */
const BANK_BBVA_TO_RECIEVE_TRANSFER = new Bank(
  IBankOptions.BBVA,
  1111111,
  'Cuenta Oficial Campitos'
);

/**
 * IPaymentMethod
 * Ejemplo de transferencia del ciudad al BANK creado bbva "cuenta oficial campito".
 */
const PAYMENT_METHOD_BANK_CIUDAD = new BankTransfer(
  '2929292',
  IBankOptions.CIUDAD,
  BANK_BBVA_TO_RECIEVE_TRANSFER
);

@Injectable({
  providedIn: 'root',
})
export class PaymentManagerService implements IPaymentManagerService {
  private _refreshData$ = new Subject<void>();
  private _paymentList: SubscriptionSubscriptorPayment[] = [
    SUBSCRIPTOR_PAYMENT_DEFAULT_1,
    SUBSCRIPTOR_PAYMENT_DEFAULT_2,
    SUBSCRIPTOR_PAYMENT_DEFAULT_3,
  ];

  // Lista metodos pago.
  private _listPaymentMethods: IPaymentMethod[] = [PAYMENT_METHOD_BANK_CIUDAD];
  private _listOwnBanks: Bank[] = [BANK_BBVA_TO_RECIEVE_TRANSFER];

  constructor(private _customLogger: MyCustomLogger) {}

  get refreshData$() {
    return this._refreshData$;
  }

  getAllPayments(): Observable<SubscriptionSubscriptorPayment[]> {
    try {
      let response = this._paymentList.slice();

      return of(response).pipe(
        tap(() => {
          this.refreshData$.next();
        })
      );
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  getPaymentById(id: any): Observable<SubscriptionSubscriptorPayment> {
    try {
      const payment = this._paymentList.find((p) => p.id === id);
      this._customLogger.logDebug(
        'PaymentManagerService, getPaymentById',
        'Todos los pagos:',
        this._paymentList
      );
      if (payment) {
        return of(payment).pipe(
          tap(() => {
            this.refreshData$.next();
          })
        );
      } else {
        return throwError(`No se encontró un pago con el id ${id}`);
      }
    } catch (error) {
      this._customLogger.logError('getPaymentById', error, `id: ${id}`);
      return throwError(`${error}`);
    }
  }

  // createPayment(
  //   payment: CreateNewPaymentSubscriptionData
  // ): Observable<SubscriptionSubscriptorPayment> {
  //   try {
  //     console.info('CreatePayment, 1°', payment);

  //     // let newPayment: SubscriptionSubscriptorPayment = payment;

  //     const newPayment =
  //       new CreatorPaymentSubscriptorService().CreateNewPaymentSubscription(
  //         payment.planSubscription,
  //         payment.subscriptorPagador,
  //         payment.creador,
  //         payment.fechaCreacion
  //       );

  //     // Agregar el nuevo pago a la lista.
  //     this._paymentList.push(newPayment);

  //     console.info('Creado correctamente el Payment 2°', newPayment);

  //     return of(newPayment);
  //   } catch (error) {
  //     this._customLogger.logError('createPayment', error);
  //     return throwError(`${error}`);
  //   }
  // }

  createPayment(payment: CreateNewPaymentSubscriptionData): Observable<any> {
    try {
      console.info('CreatePayment, 1°', payment);

      // const newPayment = new SubscriptionSubscriptorPayment(
      //   IPaymentStatus.COMPLETADO,
      //   1000,
      //   new Date(),
      //   SUBSCRIPTOR_1_DEFAULT,
      //   new Date(),
      //   PLAN_SUBSCRIPTION_TIME_DEFAULT_1,
      //   USER_1_DEFAULT,
      //   Helper.getFirstDayOfNextMonth(new Date())
      // );
      // newPayment.metodoPago = new CashMethod('1111');

      // const newPlan = this._planSubscriptionService.getPlanSubscriptionById(
      //   payment.planSubscription
      // );

      const newPayment = new SubscriptionSubscriptorPayment(
        IPaymentStatus.COMPLETADO,
        payment.planSubscription.monto,
        new Date(),
        payment.subscriptorPagador,
        new Date(),
        payment.planSubscription,
        payment.creador,
        new Date('2023 10 10')
      );
      newPayment.metodoPago = payment.metodoPago;

      this._customLogger.logInfo(
        'newPaymentSubscription MANUAL,',
        `${JSON.stringify(newPayment, null, 2)}`
      );

      console.info('Creado correctamente el Payment 2°', newPayment);

      // Agregar el nuevo pago a la lista.
      this._paymentList.push(newPayment);

      return of(payment).pipe(
        tap(() => {
          this.refreshData$.next();
        })
      );
    } catch (error) {
      this._customLogger.logError('createPayment', error);
      return throwError(`${error}`);
    }
  }

  getPaymentsByFilter(filter: PaymentFilter): Observable<Payment[]> {
    try {
      // Crear variable inicializada en null.
      let voidFilter = new PaymentFilter();

      let _filterPaymentList: Array<Payment> = [];

      for (let i = 0; i < this._paymentList.length; i++) {
        let passedFilter = true;

        // Estado
        if (filter.estado !== voidFilter.estado) {
          if (this._paymentList[i].estado !== filter.estado) {
            passedFilter = false;
          }
        }

        // Monto
        if (
          filter.montoSince !== voidFilter.montoSince ||
          filter.montoUntil !== voidFilter.montoUntil
        ) {
          if (
            !this._paymentList[i].amountIsBetweenTwoValues(
              filter.montoSince,
              filter.montoUntil
            )
          ) {
            passedFilter = false;
          }
        }

        // Método de Pago
        if (filter.metodoPago !== voidFilter.metodoPago) {
          if (this._paymentList[i].metodoPago !== filter.metodoPago) {
            passedFilter = false;
          }
        }

        // Tipo de Pago (Matricula, Pago Suscripcion, Producto..)
        if (filter.tipoPago !== voidFilter.tipoPago) {
          if (this._paymentList[i].tipoPago !== filter.tipoPago) {
            passedFilter = false;
          }
        }

        // Fecha de Creación
        if (
          filter.fechaCreacionSince !== voidFilter.fechaCreacionSince ||
          filter.fechaCreacionUntil !== voidFilter.fechaCreacionUntil
        ) {
          if (
            !this._paymentList[i].containsFechaCreacion(
              filter.fechaCreacionSince,
              filter.fechaCreacionUntil
            )
          ) {
            passedFilter = false;
          }
        }

        // Fecha de Pago
        if (
          filter.fechaPagoSince !== voidFilter.fechaPagoSince ||
          filter.fechaPagoUntil !== voidFilter.fechaPagoUntil
        ) {
          if (
            !this._paymentList[i].containsFechaPago(
              filter.fechaPagoSince,
              filter.fechaPagoUntil
            )
          ) {
            passedFilter = false;
          }
        }

        // Pagador
        if (filter.pagador !== voidFilter.pagador) {
          if (this._paymentList[i] instanceof SubscriptorPayment) {
            if (
              (this._paymentList[i] as SubscriptorPayment).pagador !==
              filter.pagador
            ) {
              passedFilter = false;
            }
          } else {
            passedFilter = false; // Si no es pago de tipo suscripcion, no pasa.
          }
        }

        // Creador
        if (filter.creator !== voidFilter.creator) {
          if (this._paymentList[i].creador !== filter.creator) {
            passedFilter = false;
          }
        }

        // Plan Subscription
        if (filter.planSubscription !== voidFilter.planSubscription) {
          if (this._paymentList[i] instanceof SubscriptionSubscriptorPayment) {
            if (
              (this._paymentList[i] as SubscriptionSubscriptorPayment)
                .planSubscription !== filter.planSubscription
            ) {
              passedFilter = false;
            }
          } else {
            passedFilter = false; // Si no es pago de tipo suscripcion, no pasa.
          }
        }

        // Producto // Todo arreglar
        // if (filter.producto !== voidFilter.producto) {
        //   if (this._paymentList[i] instanceof ProductSubscriptorPayment) {
        //     if (
        //       (this._paymentList[i] as ProductSubscriptorPayment).producto !==
        //       filter.producto
        //     ) {
        //       passedFilter = false;
        //     }
        //   } else {
        //     passedFilter = false; // Si no es pago de tipo suscripcion, no pasa.
        //   }
        // }

        if (passedFilter) {
          _filterPaymentList.push(this._paymentList[i]);
        }
      }

      if (_filterPaymentList.length <= 0) {
        throw new NoHayResultadosError(
          `No hay ningun resultado para esta busqueda con estos filtros ${JSON.stringify(
            filter,
            null,
            2
          )} .`
        );
      } else {
        return of(_filterPaymentList);
      }
    } catch (error) {
      this._customLogger.logError(
        'PaymentManagerService, getPaymentsByFilter',
        `${error}`
      );
      throw Error(`${error}`);
    }
  }

  // getPaymentsByFilter(filter: PaymentFilter): Payment[] {
  //   try {
  //     // Crear variable inicializada en null.
  //     let voidFilter = new PaymentFilter();

  //     let _filterPaymentList: Array<Payment> = [];

  //     for (let i = 0; i < this._paymentList.length; i++) {
  //       let passedFilter = true;

  //       // Estado
  //       if (filter.estado !== voidFilter.estado) {
  //         if (this._paymentList[i].estado !== filter.estado) {
  //           passedFilter = false;
  //         }
  //       }

  //       // Monto
  //       if (
  //         filter.montoSince !== voidFilter.montoSince ||
  //         filter.montoUntil !== voidFilter.montoUntil
  //       ) {
  //         if (
  //           !this._paymentList[i].amountIsBetweenTwoValues(
  //             filter.montoSince,
  //             filter.montoUntil
  //           )
  //         ) {
  //           passedFilter = false;
  //         }
  //       }

  //       // Método de Pago
  //       if (filter.metodoPago !== voidFilter.metodoPago) {
  //         if (this._paymentList[i].metodoPago !== filter.metodoPago) {
  //           passedFilter = false;
  //         }
  //       }

  //       // Tipo de Pago (Matricula, Pago Suscripcion, Producto..)
  //       if (filter.tipoPago !== voidFilter.tipoPago) {
  //         if (this._paymentList[i].tipoPago !== filter.tipoPago) {
  //           passedFilter = false;
  //         }
  //       }

  //       // Fecha de Creación
  //       if (
  //         filter.fechaCreacionSince !== voidFilter.fechaCreacionSince ||
  //         filter.fechaCreacionUntil !== voidFilter.fechaCreacionUntil
  //       ) {
  //         if (
  //           !this._paymentList[i].containsFechaCreacion(
  //             filter.fechaCreacionSince,
  //             filter.fechaCreacionUntil
  //           )
  //         ) {
  //           passedFilter = false;
  //         }
  //       }

  //       // Fecha de Pago
  //       if (
  //         filter.fechaPagoSince !== voidFilter.fechaPagoSince ||
  //         filter.fechaPagoUntil !== voidFilter.fechaPagoUntil
  //       ) {
  //         if (
  //           !this._paymentList[i].containsFechaPago(
  //             filter.fechaPagoSince,
  //             filter.fechaPagoUntil
  //           )
  //         ) {
  //           passedFilter = false;
  //         }
  //       }

  //       // Creador
  //       if (filter.creator !== voidFilter.creator) {
  //         if (this._paymentList[i].creador !== filter.creator) {
  //           passedFilter = false;
  //         }
  //       }

  //       // Plan Subscription
  //       if (filter.planSubscription !== voidFilter.planSubscription) {
  //         if (this._paymentList[i] instanceof SubscriptionSubscriptorPayment) {
  //           if (
  //             (this._paymentList[i] as SubscriptionSubscriptorPayment)
  //               .planSubscription !== filter.planSubscription
  //           ) {
  //             passedFilter = false;
  //           }
  //         } else {
  //           passedFilter = false; // Si no es pago de tipo suscripcion, no pasa.
  //         }
  //       }

  //       // Producto // Todo arreglar
  //       // if (filter.producto !== voidFilter.producto) {
  //       //   if (this._paymentList[i] instanceof ProductSubscriptorPayment) {
  //       //     if (
  //       //       (this._paymentList[i] as ProductSubscriptorPayment).producto !==
  //       //       filter.producto
  //       //     ) {
  //       //       passedFilter = false;
  //       //     }
  //       //   } else {
  //       //     passedFilter = false; // Si no es pago de tipo suscripcion, no pasa.
  //       //   }
  //       // }

  //       // Pagador
  //       if (filter.pagador !== voidFilter.pagador) {
  //         if (this._paymentList[i] instanceof SubscriptorPayment) {
  //           if (
  //             (this._paymentList[i] as SubscriptorPayment).pagador !==
  //             filter.pagador
  //           ) {
  //             passedFilter = false;
  //           }
  //         } else {
  //           passedFilter = false; // Si no es pago de tipo suscripcion, no pasa.
  //         }
  //       }

  //       if (passedFilter) {
  //         _filterPaymentList.push(this._paymentList[i]);
  //       }
  //     }

  //     if (_filterPaymentList.length <= 0) {
  //       throw new NoHayResultadosError(
  //         `No hay ningun resultado para esta busqueda con estos filtros ${JSON.stringify(
  //           filter,
  //           null,
  //           2
  //         )} .`
  //       );
  //     } else {
  //       return _filterPaymentList;
  //     }
  //   } catch (error) {
  //     this._customLogger.logError(
  //       'PaymentManagerService, getPaymentsByFilter',
  //       `${error}`
  //     );
  //     throw Error(`${error}`);
  //   }
  // }
  // - - - - - - - - - -  Lista metodos pago  - - - - - - - - - -
  getPaymentMethods(): IPaymentMethod[] {
    try {
      return this._listPaymentMethods;
    } catch (error) {
      this._customLogger.logError(
        'PaymentManagerService, getPaymentMethods',
        error
      );

      throw Error(`${error}`);
    }
  }

  getOwnBanks(): Bank[] {
    try {
      return this._listOwnBanks;
    } catch (error) {
      this._customLogger.logError(
        'PaymentManagerService, getOwnBanks()',
        error
      );
      throw Error(`${error}`);
    }
  }
}
