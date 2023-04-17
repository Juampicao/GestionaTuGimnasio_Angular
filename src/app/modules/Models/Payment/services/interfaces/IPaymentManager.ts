import { Subscriptor } from '../../../Subscriptor/model/Subscriptor';
import { User } from '../../../User/models/User';
import { Payment } from '../../models/Payment';
import { SubscriptionSubscriptorPayment } from '../../models/SubscriptionSubscriptorPayment';
import { PaymentFilter } from '../../paymentFilter/PaymentFilter';
export interface IPaymentManager {
  /**
   * @returns Cantidad total de items coincidentes con este filtro.
   */
  getTotalQuantityItems(filter: PaymentFilter): number;

  /**
   * Retorna todos los pagos de un creador.
   * @param creador User
   */
  getAllPaymentsByCreator(creador: User): Payment[];

  /**
   * Retorna todos los pagos de un subscriptor.
   * @param creador
   * @param subscriptor
   */
  getAllPaymentsBySubscriptor(
    creador: User,
    subscriptor: Subscriptor
  ): Payment[];

  /**
   * Retorna todos los pagos de tipo subscripción de un subscriptor.
   * @param creador
   * @param subscriptor
   */
  getAllPaymentsSubscriptionBySubscriptor(
    creador: User,
    subscriptor: Subscriptor
  ): SubscriptionSubscriptorPayment[];

  /**
   * Retorna el ultimo pago completado de subscription completado, segun el subscriptor.
   * @param creador
   * @param subscriptor
   */
  getLastPaymentSubscriptionCompletedBySubscriptorId(
    id: any
  ): SubscriptionSubscriptorPayment;

  /**
   * Retorna un pago buscado por id.
   * @param id
   */
  getPaymentById(id: any): Payment;
}
