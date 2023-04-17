import { Product } from '../../Product/model/Product';
import { Subscriptor } from '../../Subscriptor/model/Subscriptor';
import { User } from '../../User/models/User';
import { IPaymentStatus, IPaymentTypes } from '../interfaces/Interfaces';
import { SubscriptorPayment } from './SubscriptorPayment';

export class ProductSubscriptorPayment extends SubscriptorPayment {
  private _producto: Product;

  /**
   * @param estado
   * @param monto
   * @param fechaCreacion
   * @param pagador
   * @param expiracion
   * @param product
   * @param creador User
   */
  constructor(
    estado: IPaymentStatus,
    monto: number,
    fechaCreacion: Date,
    pagador: Subscriptor,
    expirationPaymentDate: Date,
    producto: Product,
    creador: User
  ) {
    super(
      estado,
      monto,
      fechaCreacion,
      pagador,
      expirationPaymentDate,
      IPaymentTypes.PRODUCTO,
      creador
    );
    this._producto = producto;
  }

  public get producto(): Product {
    return this._producto;
  }
  public set producto(value: Product) {
    this._producto = value;
  }
}
