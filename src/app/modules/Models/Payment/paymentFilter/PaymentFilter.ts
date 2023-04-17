import { ErrorExternoAlPasarParams } from 'src/app/core/services/helper/ErrorExternoAlPasarParams';
import { Helper } from 'src/app/core/services/helper/Helper';
import { PlanSubscription } from '../../PlanSubscription/models/PlanSubscription';
import { Product } from '../../Product/model/Product';
import { Subscriptor } from '../../Subscriptor/model/Subscriptor';
import { User } from '../../User/models/User';
import {
  FECHA_CREACION_SINCE_FILTER_DEFAULT,
  FECHA_CREACION_SINCE_FILTER_MAX,
  FECHA_CREACION_SINCE_FILTER_MIN,
  FECHA_CREACION_UNTIL_FILTER_DEFAULT,
  FECHA_CREACION_UNTIL_FILTER_MAX,
  FECHA_CREACION_UNTIL_FILTER_MIN,
  FECHA_PAGO_SINCE_FILTER_DEFAULT,
  FECHA_PAGO_SINCE_FILTER_MAX,
  FECHA_PAGO_SINCE_FILTER_MIN,
  FECHA_PAGO_UNTIL_FILTER_DEFAULT,
  FECHA_PAGO_UNTIL_FILTER_MAX,
  FECHA_PAGO_UNTIL_FILTER_MIN,
  MONTO_SINCE_FILTER_DEFAULT,
  MONTO_SINCE_FILTER_MAX,
  MONTO_SINCE_FILTER_MIN,
  MONTO_UNTIL_FILTER_DEFAULT,
  MONTO_UNTIL_FILTER_MAX,
  MONTO_UNTIL_FILTER_MIN,
} from '../../ValoresDefault2';
import { ErrorPaymentFilter } from '../error/ErrorPaymentFilter';
import { IPaymentStatus, IPaymentTypes } from '../interfaces/Interfaces';
import { IPaymentMethod } from '../interfaces/IPaymentMethods';

export class PaymentFilter {
  private _estado: IPaymentStatus | null;
  private _montoSince: number;
  private _montoUntil: number;
  private _metodoPago: IPaymentMethod | null;
  private _tipoPago: IPaymentTypes | null;
  private _fechaCreacionSince: Date;
  private _fechaCreacionUntil: Date;
  private _fechaPagoSince: Date;
  private _fechaPagoUntil: Date;
  private _creador: User | null;
  private _planSubscription: PlanSubscription | null;
  private _producto: Product | null;
  private _pagador: Subscriptor | null;

  constructor() {
    this._estado = null;
    this._montoSince = MONTO_SINCE_FILTER_DEFAULT;
    this._montoUntil = MONTO_UNTIL_FILTER_DEFAULT;
    this._metodoPago = null;
    this._tipoPago = null;
    this._fechaCreacionSince = FECHA_CREACION_SINCE_FILTER_DEFAULT;
    this._fechaCreacionUntil = FECHA_CREACION_UNTIL_FILTER_DEFAULT;
    this._fechaPagoSince = FECHA_PAGO_SINCE_FILTER_DEFAULT;
    this._fechaPagoUntil = FECHA_PAGO_UNTIL_FILTER_DEFAULT;
    this._creador = null;
    this._planSubscription = null;
    this._producto = null;
    this._pagador = null;
  }

  public get estado(): IPaymentStatus | null {
    return this._estado;
  }

  public set estado(value: IPaymentStatus | null) {
    this._estado = value;
  }

  public get montoSince(): number {
    return this._montoSince;
  }

  public set montoSince(value: number) {
    if (
      Helper.isValidNumberReturnBoolean(
        value,
        MONTO_SINCE_FILTER_MIN,
        MONTO_SINCE_FILTER_MAX
      )
    ) {
      this._montoSince = value;
      return;
    } else {
      throw new ErrorPaymentFilter(
        `El monto since debe estar entre ${MONTO_SINCE_FILTER_MIN} y ${MONTO_SINCE_FILTER_MAX} `
      );
    }
  }

  public get montoUntil(): number {
    return this._montoUntil;
  }

  public set montoUntil(value: number) {
    if (
      Helper.isValidNumberReturnBoolean(
        value,
        MONTO_UNTIL_FILTER_MIN,
        MONTO_UNTIL_FILTER_MAX
      )
    ) {
      this._montoUntil = value;
      return;
    } else {
      throw new ErrorPaymentFilter(
        `El monto since debe estar entre ${MONTO_UNTIL_FILTER_MIN} y ${MONTO_UNTIL_FILTER_MAX} `
      );
    }
  }

  public get metodoPago(): IPaymentMethod | null {
    return this._metodoPago;
  }

  public set metodoPago(value: IPaymentMethod | null) {
    this._metodoPago = value;
  }

  /**
   * Tipo de pago (Matricula, Pago Suscripcion, Pago Producto..)
   * @param value : IPaymentTypes
   */
  public get tipoPago(): IPaymentTypes | null {
    return this._tipoPago;
  }

  /**
   * @param value : IPaymentTypes
   */
  public set tipoPago(value: IPaymentTypes | null) {
    this._tipoPago = value;
  }

  public get fechaCreacionSince(): Date {
    return this._fechaCreacionSince;
  }

  public set fechaCreacionSince(value: Date) {
    if (
      value.getTime() > FECHA_CREACION_SINCE_FILTER_MAX.getTime() ||
      value.getTime() < FECHA_CREACION_SINCE_FILTER_MIN.getTime()
    ) {
      throw new ErrorExternoAlPasarParams(
        `La fechaCreacionSince debe estar entre ${FECHA_CREACION_SINCE_FILTER_MIN} y ${FECHA_CREACION_SINCE_FILTER_MAX} `
      );
    }
    this._fechaCreacionSince = value;
  }

  public get fechaCreacionUntil(): Date {
    return this._fechaCreacionUntil;
  }

  public set fechaCreacionUntil(value: Date) {
    if (
      value.getTime() > FECHA_CREACION_UNTIL_FILTER_MAX.getTime() ||
      value.getTime() < FECHA_CREACION_UNTIL_FILTER_MIN.getTime()
    ) {
      throw new ErrorExternoAlPasarParams(
        `La fechaCreacionUntil debe estar entre ${FECHA_CREACION_UNTIL_FILTER_MIN} y ${FECHA_CREACION_UNTIL_FILTER_MAX} `
      );
    }
    this._fechaCreacionUntil = value;
  }

  public get fechaPagoSince(): Date {
    return this._fechaPagoSince;
  }

  public set fechaPagoSince(value: Date) {
    if (
      value.getTime() > FECHA_PAGO_SINCE_FILTER_MAX.getTime() ||
      value.getTime() < FECHA_PAGO_SINCE_FILTER_MIN.getTime()
    ) {
      throw new ErrorExternoAlPasarParams(
        `La fechaPagoSince debe estar entre ${FECHA_PAGO_SINCE_FILTER_MIN} y ${FECHA_PAGO_SINCE_FILTER_MAX} `
      );
    }
    this._fechaPagoSince = value;
  }

  public get fechaPagoUntil(): Date {
    return this._fechaPagoUntil;
  }

  public set fechaPagoUntil(value: Date) {
    if (
      value.getTime() > FECHA_PAGO_UNTIL_FILTER_MAX.getTime() ||
      value.getTime() < FECHA_PAGO_UNTIL_FILTER_MIN.getTime()
    ) {
      throw new ErrorExternoAlPasarParams(
        `La fechaPagoUntil debe estar entre ${FECHA_PAGO_UNTIL_FILTER_MIN} y ${FECHA_PAGO_UNTIL_FILTER_MAX} `
      );
    }
    this._fechaPagoUntil = value;
  }

  public get creator(): User | null {
    return this._creador;
  }

  public set creator(creador: User | null) {
    this._creador = creador;
  }

  public get planSubscription(): PlanSubscription | null {
    return this._planSubscription;
  }

  public set planSubscription(value: PlanSubscription | null) {
    this._planSubscription = value;
  }

  public get producto(): Product | null {
    return this._producto;
  }

  public set producto(value: Product | null) {
    this._producto = value;
  }

  public get pagador(): Subscriptor | null {
    return this._pagador;
  }

  public set pagador(value: Subscriptor | null) {
    this._pagador = value;
  }

  toString() {
    return `Pagador: ${this._pagador}, fechaSince: ${this._fechaCreacionSince}`;
  }
}
