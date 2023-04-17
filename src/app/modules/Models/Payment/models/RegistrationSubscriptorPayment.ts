import { Subscriptor } from '../../Subscriptor/model/Subscriptor';
import { User } from '../../User/models/User';
import {
  IPaymentStatus,
  IPaymentTypes,
  IRegistrationName,
} from '../interfaces/Interfaces';
import { SubscriptorPayment } from './SubscriptorPayment';

export class RegistrationSubscriptorPayment extends SubscriptorPayment {
  private _nombreMatricula: IRegistrationName;

  /**
   * @param estado
   * @param monto
   * @param fechaCreacion
   * @param pagador
   * @param expiracion
   * @param nombreMatricula
   * @param creador
   */
  constructor(
    estado: IPaymentStatus,
    monto: number,
    fechaCreacion: Date,
    pagador: Subscriptor,
    expirationPaymentDate: Date,
    nombreMatricula: IRegistrationName,
    creador: User
  ) {
    super(
      estado,
      monto,
      fechaCreacion,
      pagador,
      expirationPaymentDate,
      IPaymentTypes.MATRICULA,
      creador
    );
    this._nombreMatricula = nombreMatricula;
  }

  public get nombreMatricula(): IRegistrationName {
    return this._nombreMatricula;
  }

  public set nombreMatricula(value: IRegistrationName) {
    this._nombreMatricula = value;
  }
}
