import { Helper } from 'src/app/core/services/helper/Helper';
import {
  IPaymentStatus,
  IPaymentTypes,
  IPaymetMethodType,
} from 'src/app/modules/Models/Payment/interfaces/Interfaces';
import { IPaymentMethod } from 'src/app/modules/Models/Payment/interfaces/IPaymentMethods';
import { Payment } from 'src/app/modules/Models/Payment/models/Payment';
import { SubscriptionSubscriptorPayment } from 'src/app/modules/Models/Payment/models/SubscriptionSubscriptorPayment';

export class PaymentVisualSubscriptor {
  private _fechaPago: any | null;
  public fechaPagoParsed: any | null;
  public estado: IPaymentStatus;
  public monto: number;
  public pagadorNombre: any;
  public tipoPago: IPaymentTypes;
  public metodoPago: IPaymetMethodType | null;
  public fechaPago: Date | null;
  public fechaCreacion: Date;
  public planSuscripcionName: any;
  public id: any;

  // Completos:
  public metodoPagoComplete: IPaymentMethod | null;

  constructor(private paymentSubscription: Payment) {
    this.estado = paymentSubscription.estado;
    this.monto = paymentSubscription.monto;
    this.pagadorNombre = paymentSubscription.pagador
      ? paymentSubscription.pagador.personalInformation.name
      : null;
    this.tipoPago = paymentSubscription.tipoPago;
    this.metodoPago = paymentSubscription.metodoPago?.paymentMethodType
      ? this.isMethodExists(paymentSubscription.metodoPago.paymentMethodType)
      : null;
    this.fechaPago = paymentSubscription.fechaPago;
    this.fechaCreacion = paymentSubscription.fechaCreacion;
    this.fechaPagoParsed = this.parseDate(this.fechaPago);
    this.id = paymentSubscription.id;
    // this.planSuscripcionName = paymentSubscription.planSubscription.nombre;
    if (paymentSubscription instanceof SubscriptionSubscriptorPayment) {
      this.planSuscripcionName = paymentSubscription.planSubscription.nombre;
    }
    // Completos:
    this.metodoPagoComplete = paymentSubscription.metodoPago;
  }

  parseDate(fechaPago: Date | null): any {
    if (fechaPago) {
      return Helper.ParseDate(fechaPago);
    } else {
      return 'Pending';
    }
  }

  private isMethodExists(method: IPaymetMethodType | null) {
    if (!method) {
      return null;
    } else {
      return method;
    }
  }

  getMetodoPagoCompleteJson() {
    return JSON.stringify(this.metodoPagoComplete, null, 2);
  }
}
