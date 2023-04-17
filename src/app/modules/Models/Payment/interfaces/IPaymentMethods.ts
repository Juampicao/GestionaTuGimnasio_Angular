import { IPaymetMethodType } from './Interfaces';

export interface IPaymentMethod {
  paymentMethodType: IPaymetMethodType | null;

  getTransactionNumber(): number | string;
}
