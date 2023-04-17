import { ExpirationDeleteMethod } from '../../../Subscriptor/model/ExpirationDeleteMethod';
import { User } from '../../../User/models/User';
import { SubscriptionSubscriptorPayment } from '../../models/SubscriptionSubscriptorPayment';

export interface IDeletePaymentSubscriptorAndUpdateExpiration {
  /**
   * @param pago SubscriptionSubscriptorPayment ¿Que pago es?
   * @param motivo string ¿Por que se elimino?
   * @param creador User. ¿Quien esta eliminado el pago?
   * @param nuevaFechaExpiracion: ExpirationDeleteMethod. 1) Segun ultimo pago 2) nueva fecha.
   */
  deletePaymentAndUpdateSubscriptionExpirationDate(
    pago: SubscriptionSubscriptorPayment,
    motivo: string,
    creador: User,
    nuevaFechaExpiracion: ExpirationDeleteMethod
  ): Date;

  deletePaymentAndUpdateSubscriptionExpirationAmount(): number | null;
}
