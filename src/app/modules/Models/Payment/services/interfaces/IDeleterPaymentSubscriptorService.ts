import { User } from '../../../User/models/User';
import { SubscriptionSubscriptorPayment } from '../../models/SubscriptionSubscriptorPayment';

export interface IDeleterPaymentSubscriptorService {
  /**
   * Eliminar un pago de suscripción, tendrá repercusión en 1) Estado de subscripcion 2) ExpirationDate (depende)
   *
   * @param pago SubscriptionSubscriptorPayment
   * @param motivo string ¿Por que se elimino?
   * @param creador User. ¿Quien lo esta eliminando?
   */
  deletePaymentSubscription(
    pago: SubscriptionSubscriptorPayment,
    motivo: string,
    creador: User
  ): any;
}
