import { Observable } from 'rxjs';
import { IPaymentMethod } from 'src/app/modules/Models/Payment/interfaces/IPaymentMethods';
import { SubscriptionSubscriptorPayment } from 'src/app/modules/Models/Payment/models/SubscriptionSubscriptorPayment';
import { Bank } from 'src/app/modules/Models/Payment/paymentMethods/Bank';
import { CreateNewPaymentSubscriptionData } from 'src/app/modules/Models/Payment/services/models/CreateNewPaymentSubscriptionData';

export interface IPaymentManagerService {
  refreshData$: Observable<void>;
  getAllPayments(): Observable<SubscriptionSubscriptorPayment[]>;
  getPaymentById(id: any): Observable<SubscriptionSubscriptorPayment>;
  createPayment(payment: CreateNewPaymentSubscriptionData): Observable<any>;
  getPaymentMethods(): IPaymentMethod[];
  getOwnBanks(): Bank[];
}
