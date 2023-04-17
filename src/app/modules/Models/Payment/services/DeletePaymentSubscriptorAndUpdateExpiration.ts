import { ExpirationDeleteMethod } from '../../Subscriptor/model/ExpirationDeleteMethod';
import { Subscriptor } from '../../Subscriptor/model/Subscriptor';
import { User } from '../../User/models/User';
import { SubscriptionSubscriptorPayment } from '../models/SubscriptionSubscriptorPayment';
import { IDeletePaymentSubscriptorAndUpdateExpiration } from './interfaces/IDeletePaymentSubscriptorAndUpdateExpiration';
import { IDeleterPaymentSubscriptorService } from './interfaces/IDeleterPaymentSubscriptorService';

export class DeletePaymentSubscriptorAndUpdateExpiration
  implements IDeletePaymentSubscriptorAndUpdateExpiration
{
  private _deleterPaymentService: IDeleterPaymentSubscriptorService;

  constructor(deleterPaymentService: IDeleterPaymentSubscriptorService) {
    this._deleterPaymentService = deleterPaymentService;
  }

  deletePaymentAndUpdateSubscriptionExpirationDate(
    pago: SubscriptionSubscriptorPayment,
    motivo: string,
    creador: User,
    nuevaFechaExpiracion: ExpirationDeleteMethod
  ): Date {
    try {
      const suscriptor: Subscriptor = pago.pagador;
      this._deleterPaymentService.deletePaymentSubscription(
        pago,
        motivo,
        creador
      );
      return suscriptor.updateExpirationAfterDeletePayment(
        nuevaFechaExpiracion
      );
    } catch (error) {
      throw new Error(
        'Hubo un error al eliminar el pago y actualizar la expiración.'
      );
    }
  }

  deletePaymentAndUpdateSubscriptionExpirationAmount(): number | null {
    throw new Error('Method not implemented.');
  }
}
