import { Subscriptor } from '../../Subscriptor/model/Subscriptor';
import { User } from '../../User/models/User';
import { IPaymentStatus, IPaymentTypes } from '../interfaces/Interfaces';
import { Payment } from './Payment';

export abstract class SubscriptorPayment extends Payment {
  // protected _pagador: Subscriptor; // Subscriptor Id.
  protected _expirationPaymentDate: Date; // Fecha expiración.
  protected _interes: number; // ¿Corren interes o como lo manejo?.

  /**
   *
   * @param estado
   * @param monto
   * @param fechaCreacion
   * @param pagador
   * @param expirationPaymentDate: Date
   * @param tipoPago
   * @param user User
   */
  constructor(
    estado: IPaymentStatus,
    monto: number,
    fechaCreacion: Date,
    pagador: Subscriptor,
    expirationPaymentDate: Date,
    tipoPago: IPaymentTypes,
    creador: User
  ) {
    super(estado, monto, tipoPago, fechaCreacion, creador);
    this._pagador = pagador;
    this._interes = 0;
    this._expirationPaymentDate = expirationPaymentDate;
  }

  // Todo quitar. Ya esta en el payment padre.
  // public get pagador(): Subscriptor {
  //   return this._pagador;
  // }

  // public set pagador(value: Subscriptor) {
  //   this._pagador = value;
  // }

  public get expiracion(): Date {
    return this._expirationPaymentDate;
  }

  public set expiracion(value: Date) {
    this._expirationPaymentDate = value;
  }

  public get interes(): number {
    return this._interes;
  }

  public set interes(value: number) {
    this._interes = value;
  }
}
