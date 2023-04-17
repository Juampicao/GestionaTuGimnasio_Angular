import { PlanSubscription } from '../../../PlanSubscription/models/PlanSubscription';
import { Product } from '../../../Product/model/Product';
import { Subscriptor } from '../../../Subscriptor/model/Subscriptor';
import { User } from '../../../User/models/User';
import { ProductSubscriptorPayment } from '../../models/ProductSubscriptorPayment';
import { RegistrationSubscriptorPayment } from '../../models/RegistrationSubscriptorPayment';
import { SubscriptionSubscriptorPayment } from '../../models/SubscriptionSubscriptorPayment';

export interface ICreatorPaymentSubscriptorService {
  /**
   * Toma los datos del suscriptor (suscripcion adherida, monto de la suscripcion de forma automatica) y crea un pago.
   * @param suscriptorPagador Subscriptor
   * @return SubscriptionSubscriptorPayment
   */
  CreatePaymentSubscriptionAutomaticFromSubscriptor(
    suscriptorPagador: Subscriptor
  ): SubscriptionSubscriptorPayment;

  /**
   * Crear un nuevo pago de tipo suscripcion en estado pendiente por parte de un subscriptor especifico. El monto se definirá automaticamente: la fecha de expiración de la suscripcion y fecha de expiración de pago.
   * @param planSubscription : PlanSubscription
   * @param suscriptorPagador : Subscriptor. Suscriptor pagador de la suscripcion.
   * @param creador: User ¿Que gimnasio crea el pago?
   * @param fechaCreacion: Date.
   * @returns SubscriptionSubscriptorPayment.
   */
  CreateNewPaymentSubscription(
    planSubscription: PlanSubscription,
    suscriptorPagador: Subscriptor,
    creador: User,
    fechaCreacion: Date
  ): SubscriptionSubscriptorPayment;

  /**
   * Crear un pago en estado pendiente producto por parte de un subscriptor especifico.
   * @param producto: Product
   * @param suscriptorPagador : Subscriptor. Suscriptor pagador de la suscripcion.
   * @param fechaCreacion: Date.
   * @returns ProductSubscriptorPayment
   */
  CreateNewPaymentProductSubscriptor(
    producto: Product,
    suscriptorPagador: Subscriptor,
    fechaCreacion: Date
  ): ProductSubscriptorPayment;

  /**
   * Crear un pago en estado pendiente producto por parte de un subscriptor especifico.
   * @param nombreMatricula : Nombre matricula.
   * @param suscriptorPagador : Subscriptor. Suscriptor pagador de la suscripcion.
   * @param fechaCreacion: Date.
   * @returns RegistrationSubscriptorPayment
   */
  CreateNewPaymentRegistrationSubscriptor(
    nombreMatricula: string,
    suscriptorPagador: Subscriptor,
    fechaCreacion: Date
  ): RegistrationSubscriptorPayment;
}
