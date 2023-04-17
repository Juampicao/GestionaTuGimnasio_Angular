import { IPaymentStatus } from 'src/app/modules/Models/Payment/interfaces/Interfaces';
import { ISubscriptionStatus } from 'src/app/modules/Models/Subscriptor/.subscription/interface/ISubscriptionStatus';

export interface ISubscriptionStatusObject {
  /**
   * ISubscriptionStatus
   */
  status: ISubscriptionStatus;
  /**
   * ISUbscriptionStatus
   */
  condicion: IPaymentStatus;
}
