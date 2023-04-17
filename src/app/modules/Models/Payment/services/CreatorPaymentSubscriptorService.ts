import { PlanSubscription } from '../../PlanSubscription/models/PlanSubscription';
import { Product } from '../../Product/model/Product';
import { Subscriptor } from '../../Subscriptor/model/Subscriptor';
import { User } from '../../User/models/User';
import { IPaymentStatus } from '../interfaces/Interfaces';
import { ProductSubscriptorPayment } from '../models/ProductSubscriptorPayment';
import { RegistrationSubscriptorPayment } from '../models/RegistrationSubscriptorPayment';
import { SubscriptionSubscriptorPayment } from '../models/SubscriptionSubscriptorPayment';
import { ICreatorPaymentSubscriptorService } from './interfaces/ICreatorPaymentSubscriptorService';

export class CreatorPaymentSubscriptorService
  implements ICreatorPaymentSubscriptorService
{
  CreatePaymentSubscriptionAutomaticFromSubscriptor(
    suscriptorPagador: Subscriptor
  ): SubscriptionSubscriptorPayment {
    throw new Error('Method not implemented.');
  }

  CreateNewPaymentSubscription(
    planSubscription: PlanSubscription,
    suscriptorPagador: Subscriptor,
    creador: User,
    fechaCreacion: Date
    // Todo deberia ir metodoPago..
  ): SubscriptionSubscriptorPayment {
    const estado = IPaymentStatus.PENDIENTE;
    const monto = planSubscription.monto;
    const expiracionPago = planSubscription.getPaymentExpiration(); // Todo deberia ser este
    // const expiracionPago = Helper.sumarDiasAFechas(Helper.TodayDate(), 35); // No este.
    const newSubscriptionExpiredOnComplete =
      planSubscription.getExpirationDate();
    const newPaymentSubscription = new SubscriptionSubscriptorPayment(
      estado,
      monto,
      fechaCreacion,
      suscriptorPagador,
      expiracionPago,
      planSubscription,
      creador,
      newSubscriptionExpiredOnComplete
    );

    return newPaymentSubscription;
  }

  CreateNewPaymentProductSubscriptor(
    producto: Product,
    suscriptorPagador: Subscriptor,
    fechaCreacion: Date
  ): ProductSubscriptorPayment {
    throw new Error('Method not implemented.');
  }

  CreateNewPaymentRegistrationSubscriptor(
    nombreMatricula: string,
    suscriptorPagador: Subscriptor,
    fechaCreacion: Date
  ): RegistrationSubscriptorPayment {
    throw new Error('Method not implemented.');
  }
}
