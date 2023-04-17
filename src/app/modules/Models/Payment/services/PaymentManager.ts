import { ProductSubscriptorPayment } from '../models/ProductSubscriptorPayment';
import { SubscriptionSubscriptorPayment } from '../models/SubscriptionSubscriptorPayment';
import { SubscriptorPayment } from '../models/SubscriptorPayment';
import { IPaymentManager } from './interfaces/IPaymentManager';

import { IPaymentTypes } from '../interfaces/Interfaces';
import { ErrorPaymentManager } from './error/ErrorPaymentManager';

import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { NoHayResultadosError } from '../../error/NoHayResultadosError';
import { Subscriptor } from '../../Subscriptor/model/Subscriptor';
import { User } from '../../User/models/User';
import { Payment } from '../models/Payment';
import { PaymentFilter } from '../paymentFilter/PaymentFilter';
const CustomLogger = new MyCustomLogger();

export class PaymentManager implements IPaymentManager {
  private _paymentList: Payment[];

  constructor(paymentList: Payment[]) {
    this._paymentList = paymentList;
  }

  getTotalQuantityItems(filter: PaymentFilter): number {
    try {
      let result = this.getPaymentsByFilter(filter).length;
      return result;
    } catch (error) {
      CustomLogger.logError('PaymentManager, getTotalQuantityItems', error);
      throw new ErrorPaymentManager(
        `Error al pedir la cantidad total de items.`
      );
    }
  }

  getAllPaymentsByCreator(creador: User): Payment[] {
    throw new ErrorPaymentManager('Method not implemented.');
  }

  getAllPaymentsBySubscriptor(
    creador: User,
    subscriptor: Subscriptor
  ): Payment[] {
    throw new ErrorPaymentManager('Method not implemented.');
  }

  getAllPaymentsSubscriptionBySubscriptor(
    creador: User,
    subscriptor: Subscriptor
  ): SubscriptionSubscriptorPayment[] {
    const allPayments: SubscriptionSubscriptorPayment[] = [];

    // Recorremos todos los pagos existentes
    for (const payment of this._paymentList) {
      // Si el pago es de tipo SubscriptionSubscriptorPayment

      if (payment instanceof SubscriptionSubscriptorPayment) {
        // Y si el subscriptor asociado al pago es el que estamos buscando
        if (payment.pagador === subscriptor) {
          // Agregamos el pago al arreglo de pagos del subscriptor
          allPayments.push(payment);
        }
      }
    }

    return allPayments;
  }

  // getLastPaymentSubscriptionCompletedBySubscriptor(creador: User, subscriptor: Subscriptor): SubscriptionSubscriptorPayment {
  //     const completedPayments : SubscriptionSubscriptorPayment[]  = this._paymentList.filter(payment =>
  //         payment instanceof SubscriptionSubscriptorPayment &&
  //         payment.pagador === subscriptor &&
  //         payment.estado === 'completado'
  //     );

  //     completedPayments.sort((a, b) => b.fechaPago!.getTime() - a.fechaPago!.getTime());

  //     return completedPayments[0];
  //     throw new ErrorPaymentManager("Method not implemented.");

  // }

  getLastPaymentSubscriptionCompletedBySubscriptorId(
    subscriptor: Subscriptor
  ): SubscriptionSubscriptorPayment {
    const filter = new PaymentFilter();
    filter.pagador = subscriptor;
    filter.tipoPago = IPaymentTypes.CUOTA;

    try {
      const completedPayments = this.getPaymentsByFilter(
        filter
      ) as SubscriptionSubscriptorPayment[];

      completedPayments.sort(
        (a, b) => b.fechaPago!.getTime() - a.fechaPago!.getTime()
      );

      return completedPayments[0];
    } catch (error) {
      CustomLogger.logError(
        'PaymentManager, getLastPaymentSubscriptionCompletedBySubscriptor',
        error
      );
      throw new ErrorPaymentManager(
        `Error al pedir el ultimo pago del suscriptor.`
      );
    }
  }

  getPaymentById(id: string): Payment {
    try {
      const result = this._paymentList.find((payment) => payment.id === id);
      if (result) {
        return result;
      } else {
        throw new ErrorPaymentManager(
          `No se encontró ningún pago con el id ${id}`
        );
      }
    } catch (error) {
      CustomLogger.logError('PaymentManager, getPaymentById', error);
      throw new ErrorPaymentManager(`Error al buscar un pago por id.`);
    }
  }

  getPaymentsByFilter(filter: PaymentFilter): Array<Payment> {
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

      // Producto
      if (filter.producto !== voidFilter.producto) {
        if (this._paymentList[i] instanceof ProductSubscriptorPayment) {
          if (
            (this._paymentList[i] as ProductSubscriptorPayment).producto !==
            filter.producto
          ) {
            passedFilter = false;
          }
        } else {
          passedFilter = false; // Si no es pago de tipo suscripcion, no pasa.
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
      return _filterPaymentList;
    }
  }
}
