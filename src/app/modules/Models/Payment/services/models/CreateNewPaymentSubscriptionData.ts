import { PlanSubscription } from '../../../PlanSubscription/models/PlanSubscription';
import { Subscriptor } from '../../../Subscriptor/model/Subscriptor';
import { IPaymentMethod } from '../../interfaces/IPaymentMethods';

export class CreateNewPaymentSubscriptionData {
  /**
   *
   * @param planSubscription
   * @param subscriptorPagador
   * @param creador
   * @param metodoPago
   * @param fechaCreacion
   */
  constructor(
    public planSubscription: PlanSubscription,
    public subscriptorPagador: Subscriptor,
    public creador: any,
    public metodoPago: IPaymentMethod,
    public fechaCreacion: Date = new Date()
  ) {}
}
