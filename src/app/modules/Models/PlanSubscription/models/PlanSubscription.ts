import { Helper } from 'src/app/core/services/helper/Helper';
import { IExpirationPlanSubscriptionMethod } from '../interfaces/IExpirationPlanSubscriptionMethod';
import { IPlanExpirationType } from '../interfaces/IPlanExpirationType';

export class PlanSubscription {
  private _id: any;
  private _nombre: string;
  private _monto: number;
  private _expiracion: IExpirationPlanSubscriptionMethod; // Todo nose si deberia tener un get y set. Metodo de getExpirationDate();  para el pago y poner this._expiration.getExpiration().

  /**
   *
   * @param nombre
   * @param monto
   * @param expiration
   */
  constructor(
    nombre: string,
    monto: number,
    expiration: IExpirationPlanSubscriptionMethod
  ) {
    this._nombre = nombre;
    this._monto = Helper.isValidNumberReturnNumber(monto, 0, 200000);
    this._expiracion = expiration;
    this._id = Helper.generateId();
  }

  public get id(): any {
    return this._id;
  }
  public set id(value: any) {
    this._id = value;
  }

  public get nombre(): string {
    return this._nombre;
  }
  public set nombre(value: string) {
    this._nombre = value;
  }

  public get monto(): number {
    return this._monto;
  }

  public set monto(value: number) {
    this._monto = value;
  }

  public get expiracion(): IExpirationPlanSubscriptionMethod {
    return this._expiracion;
  }

  public set expiracion(value: IExpirationPlanSubscriptionMethod) {
    this._expiracion = value;
  }

  /**
   * Retorna la expiracion del plan.
   */
  getExpiration() {
    return this._expiracion.getExpiration();
  }

  /**
   * Retorna la fecha de expiración del plan.
   */
  getExpirationDate(): Date {
    return this._expiracion.getExpirationDate();
  }

  /**
   * Retorna el amount uses del plan.
   * @return number o null
   */
  getExpirationAmount(): number | null {
    return this._expiracion.getExpirationAmount();
  }

  /**
   * Retorna la expiracion del pago sobre el plan.
   */
  getPaymentExpiration() {
    return this._expiracion.getPaymentExpiration();
  }

  getPlanExpirationType(): IPlanExpirationType {
    return this._expiracion.getPlanExpirationType();
  }
}
