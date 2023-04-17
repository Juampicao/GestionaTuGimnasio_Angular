import { PlanSubscription } from '../../PlanSubscription/models/PlanSubscription';
import { Subscriptor } from '../../Subscriptor/model/Subscriptor';
import { User } from '../../User/models/User';
import { IPaymentStatus, IPaymentTypes } from '../interfaces/Interfaces';
import { SubscriptorPayment } from './SubscriptorPayment';

export class SubscriptionSubscriptorPayment extends SubscriptorPayment {
  private _planSubscription: PlanSubscription; // Plan que paga.
  private _newSubscriptionExpired: Date; // Cuando pague, esta será la nueva fecha expired del suscriptor.

  /**
   * @param estado
   * @param monto
   * @param fechaCreacion
   * @param pagador
   * @param expirationPaymentDate: ¿Fecha de vencimiento para esta pago? en caso de que no este completado.
   * @param planSubscription
   * @param user User
   * @param newSubscriptionExpired: Date . Fecha que será la nueva expirationDate del suscriptor si completa este pago.
   */
  constructor(
    estado: IPaymentStatus,
    monto: number,
    fechaCreacion: Date,
    pagador: Subscriptor,
    expirationPaymentDate: Date,
    planSubscription: PlanSubscription,
    creador: User,
    newSubscriptionExpired: Date
  ) {
    super(
      estado,
      monto,
      fechaCreacion,
      pagador,
      expirationPaymentDate,
      IPaymentTypes.CUOTA,
      creador
    );
    this._planSubscription = planSubscription;
    this._newSubscriptionExpired = newSubscriptionExpired;
  }

  public get planSubscription(): PlanSubscription {
    return this._planSubscription;
  }
  public set planSubscription(value: PlanSubscription) {
    this._planSubscription = value;
  }

  public get newSubscriptionExpired(): Date {
    return this._newSubscriptionExpired;
  }
  public set newSubscriptionExpired(value: Date) {
    this._newSubscriptionExpired = value;
  }

  /**
   * Retorna cual es la fecha nueva que será la expirationDate del subscriptor. Ejemplo: Creación 1 Feb, paymentExpired 10 Feb. Esto devuelve: getNewExpirationToUpdate() : 1 Marzo.
   * @returns Date
   */
  getNewExpirationToUpdate(): Date {
    return this._newSubscriptionExpired;
  }
}
