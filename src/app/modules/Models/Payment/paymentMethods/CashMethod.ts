import { IPaymetMethodType } from '../interfaces/Interfaces';
import { IPaymentMethod } from '../interfaces/IPaymentMethods';

export class CashMethod implements IPaymentMethod {
  private _numeroTransaccion: number | string;
  paymentMethodType: IPaymetMethodType | null;

  /**
   * @param numeroTransaccion
   */
  constructor(numeroTransaccion: number | string) {
    this._numeroTransaccion = numeroTransaccion;
    this.paymentMethodType = IPaymetMethodType.EFECTIVO;
  }

  getTransactionNumber(): string | number {
    return this._numeroTransaccion;
  }
}
