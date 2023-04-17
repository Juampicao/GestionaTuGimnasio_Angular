import { IBankOptions, IPaymetMethodType } from '../interfaces/Interfaces';
import { IPaymentMethod } from '../interfaces/IPaymentMethods';
import { Bank } from './Bank';

export class BankTransfer implements IPaymentMethod {
  private _numeroTransaccion: number | string;
  private _bancoEmisor: IBankOptions;
  private _bancoReceptor: Bank;
  paymentMethodType: IPaymetMethodType | null;

  /**
   *
   * @param numeroTransaccion
   * @param bancoEmisor Nombre del banco de donde se envía el dinero.
   * @param bancoReceptor Bank. Debe ser un banco creador por nosotros previamente. Es una cuenta de la empresa.
   */
  constructor(
    numeroTransaccion: number | string,
    bancoEmisor: IBankOptions,
    bancoReceptor: Bank
  ) {
    this._numeroTransaccion = numeroTransaccion;
    this._bancoEmisor = bancoEmisor;
    this._bancoReceptor = bancoReceptor;
    this.paymentMethodType = IPaymetMethodType.BANCO;
  }

  getTransactionNumber(): string | number {
    return this._numeroTransaccion;
  }

  public get numeroTransaccion(): number | string {
    return this._numeroTransaccion;
  }

  public set numeroTransaccion(value: number | string) {
    this._numeroTransaccion = value;
  }

  public get bancoEmisor(): IBankOptions {
    return this._bancoEmisor;
  }

  public set bancoEmisor(value: IBankOptions) {
    this._bancoEmisor = value;
  }

  public get bancoReceptor(): Bank {
    return this._bancoReceptor;
  }

  public set bancoReceptor(value: Bank) {
    this._bancoReceptor = value;
  }
}
