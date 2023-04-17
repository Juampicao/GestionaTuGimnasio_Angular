import { ErrorExternoAlPasarParams } from 'src/app/core/services/helper/ErrorExternoAlPasarParams';
import { Helper } from 'src/app/core/services/helper/Helper';
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
  MONTO_UNTIL_FILTER_DEFAULT,
} from '../../ValoresDefault2';
import { IPaymentStatus, IPaymentTypes } from '../interfaces/Interfaces';
import { IPaymentMethod } from '../interfaces/IPaymentMethods';

import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { Subscriptor } from '../../Subscriptor/model/Subscriptor';
const customLogger = new MyCustomLogger();

export class Payment {
  private _id: any;
  private _estado: IPaymentStatus;
  private _monto: number;
  private _metodoPago: IPaymentMethod | null;
  private _tipoPago: IPaymentTypes;
  private _fechaCreacion: Date;
  private _fechaPago: Date | null;
  private _creador: User; // Todo Gimnasio creador.
  protected _pagador: Subscriptor | null; // Subscriptor Id.

  /**
   * @param estado IPaymentStatus (pendiente, completado)
   * @param monto number. Cantidad a pagar
   * @param tipoPago IPaymentTypes (Cuota, matricula, producto)
   * @param fechaCreacion Date
   * @param creador ¿Que gimnasio creo el pago?
   */
  constructor(
    estado: IPaymentStatus,
    monto: number,
    tipoPago: IPaymentTypes,
    fechaCreacion: Date,
    creador: User
  ) {
    this._estado = estado;
    this._monto = monto;
    this._tipoPago = tipoPago;
    this._fechaCreacion = fechaCreacion;
    this._fechaPago = null;
    this._metodoPago = null;
    this._creador = creador;
    this._id = Helper.generateId();
    this._pagador = null;
  }

  public get id(): any {
    return this._id;
  }
  public set id(value: any) {
    this._id = value;
  }

  public get estado(): IPaymentStatus {
    return this._estado;
  }
  public set estado(value: IPaymentStatus) {
    this._estado = value;
  }

  public get monto(): number {
    return this._monto;
  }
  public set monto(value: number) {
    this._monto = value;
  }

  public get metodoPago(): IPaymentMethod | null {
    return this._metodoPago;
  }

  public set metodoPago(value: IPaymentMethod | null) {
    this._metodoPago = value;
  }

  public get tipoPago(): IPaymentTypes {
    return this._tipoPago;
  }

  public set tipoPago(value: IPaymentTypes) {
    this._tipoPago = value;
  }

  public get fechaCreacion(): Date {
    return this._fechaCreacion;
  }

  public set fechaCreacion(value: Date) {
    this._fechaCreacion = value;
  }

  public get fechaPago(): Date | null {
    return this._fechaPago;
  }
  public set fechaPago(value: Date | null) {
    this._fechaPago = value;
  }

  public get creador(): User {
    return this._creador;
  }

  public set creador(value: User) {
    this._creador = value;
  }

  public get pagador(): Subscriptor | null {
    return this._pagador;
  }

  public set pagador(value: Subscriptor | null) {
    this._pagador = value;
  }

  /**
   * Va a verificar si el pago se venció. Cambia de estado.
   */
  public updateStatus(): void {
    throw new Error('function not implemented');
  }

  amountIsBetweenTwoValues(
    montoSince: number = MONTO_SINCE_FILTER_DEFAULT,
    montoUntil: number = MONTO_UNTIL_FILTER_DEFAULT
  ): Boolean {
    if (
      Helper.isValidNumberReturnBoolean(this._monto, montoSince, montoUntil)
    ) {
      return true;
    }
    return false;
  }

  /**
   * Verifica si el contentItem se encuentra en el rango de dos fechas.
   * ! > maxFechaCreacionSince ! < minFechaCreacionSince;
   * @param fechaCreacionSince : Date = FechaCreacionSinceDefault
   * @param fechaCreacionUntil : Date = FechaCreacionUntilDefault
   * @returns boolean
   */
  containsFechaCreacion(
    fechaCreacionSince: Date = FECHA_CREACION_SINCE_FILTER_DEFAULT,
    fechaCreacionUntil: Date = FECHA_CREACION_UNTIL_FILTER_DEFAULT
  ): Boolean {
    let fechaCreacionSinceFormateada = fechaCreacionSince.getTime();
    let fechaCreacionUntilFormateada = fechaCreacionUntil.getTime();
    let fechaCreacionFormateada = this._fechaCreacion.getTime();

    customLogger.logDebug(
      'Payment-containsFechaCreacion()',
      `this._fechaCreacion=${this._fechaCreacion}, fechaCreacionSince=${fechaCreacionSince} y fechaCreacionUntil=${fechaCreacionUntil}`
    );

    if (
      fechaCreacionSinceFormateada >
        FECHA_CREACION_SINCE_FILTER_MAX.getTime() ||
      fechaCreacionSinceFormateada < FECHA_CREACION_SINCE_FILTER_MIN.getTime()
    ) {
      throw new ErrorExternoAlPasarParams(
        `La fechaCreacionSince debe estar entre ${FECHA_CREACION_SINCE_FILTER_MIN} y ${FECHA_CREACION_SINCE_FILTER_MAX} `
      );
    }

    if (
      fechaCreacionUntilFormateada >
        FECHA_CREACION_UNTIL_FILTER_MAX.getTime() ||
      fechaCreacionSinceFormateada < FECHA_CREACION_UNTIL_FILTER_MIN.getTime()
    ) {
      throw new ErrorExternoAlPasarParams(
        `La fechaCreacionSince debe estar entre ${FECHA_CREACION_UNTIL_FILTER_MIN} y ${FECHA_CREACION_UNTIL_FILTER_MAX} `
      );
    }

    // Ambos parametros existen.
    if (fechaCreacionSince !== undefined) {
      if (
        fechaCreacionSinceFormateada <= fechaCreacionFormateada &&
        fechaCreacionFormateada <= fechaCreacionUntilFormateada
      ) {
        return true;
      } else {
        return false;
      }
    }

    // Until no existe.
    else if (fechaCreacionUntil === undefined) {
      if (fechaCreacionSinceFormateada <= fechaCreacionFormateada) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  /**
   * Verifica si el pago se encuentra en el rango de dos fechas.
   * @param fechaPagoSince : Date = FECHA_PAGO_SINCE_FILTER_DEFAULT. Esta es la fecha minima a buscar.
   * @param fechaPagoUntil : Date = FECHA_PAGO_UNTIL_FILTER_DEFAULT. Esta es la fecha maxima a buscar.
   * @returns boolean
   */
  containsFechaPago(
    fechaPagoSince: Date = FECHA_PAGO_SINCE_FILTER_DEFAULT,
    fechaPagoUntil: Date = FECHA_PAGO_UNTIL_FILTER_DEFAULT
  ): Boolean {
    if (!this._fechaPago) {
      customLogger.logDebug(
        'Payment-containsFechaPago()',
        `El pago no tiene fecha de pago, posiblemente no fue completado. Estado del pago: ${this._estado}`
      );
      return false;
    }

    let fechaPagoSinceFormateada = fechaPagoSince.getTime();
    let fechaPagoUntilFormateada = fechaPagoUntil.getTime();
    let fechaPagoFormateada = this._fechaPago.getTime();

    customLogger.logDebug(
      'Payment-containsFechaPago()',
      `this._fechaPago=${this._fechaPago}, fechaPagoSince=${fechaPagoSince} y fechaPagoUntil=${fechaPagoUntil}`
    );

    if (
      fechaPagoSinceFormateada > FECHA_PAGO_SINCE_FILTER_MAX.getTime() ||
      fechaPagoSinceFormateada < FECHA_PAGO_SINCE_FILTER_MIN.getTime()
    ) {
      throw new ErrorExternoAlPasarParams(
        `La fechaPagoSince debe estar entre ${FECHA_PAGO_SINCE_FILTER_MIN} y ${FECHA_PAGO_SINCE_FILTER_MAX} `
      );
    }

    if (
      fechaPagoUntilFormateada > FECHA_PAGO_UNTIL_FILTER_MAX.getTime() ||
      fechaPagoUntilFormateada < FECHA_PAGO_UNTIL_FILTER_MIN.getTime()
    ) {
      throw new ErrorExternoAlPasarParams(
        `La fechaPagoUntil debe estar entre ${FECHA_PAGO_UNTIL_FILTER_MIN} y ${FECHA_PAGO_UNTIL_FILTER_MAX} `
      );
    }

    // Ambos parametros existen.
    if (fechaPagoSince !== undefined) {
      if (
        fechaPagoSinceFormateada <= fechaPagoFormateada &&
        fechaPagoFormateada <= fechaPagoUntilFormateada
      ) {
        return true;
      } else {
        return false;
      }
    }

    // Until no existe.
    else if (fechaPagoUntil === undefined) {
      if (fechaPagoSinceFormateada <= fechaPagoFormateada) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  }
}
