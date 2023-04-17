import { User } from '../../User/models/User';
import { SubscriptionSubscriptorPayment } from '../models/SubscriptionSubscriptorPayment';
import { IDeleterPaymentSubscriptorService } from './interfaces/IDeleterPaymentSubscriptorService';

export class DeleterPaymentSubscriptorService
  implements IDeleterPaymentSubscriptorService
{
  deletePaymentSubscription(
    pago: SubscriptionSubscriptorPayment,
    motivo: string,
    creador: User
  ) {
    throw new Error('Function not implenmented');
  }
}
