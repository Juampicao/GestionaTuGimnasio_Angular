import { Helper } from 'src/app/core/services/helper/Helper';
import { ICalendarTypes } from '../interfaces/ICalendarTypes';

import { IExpirationPlanSubscriptionMethod } from '../interfaces/IExpirationPlanSubscriptionMethod';
import { IPlanExpirationType } from '../interfaces/IPlanExpirationType';

export class CalendarExpirationMethod
  implements IExpirationPlanSubscriptionMethod
{
  private _expiredTime: ICalendarTypes;
  private _diasParaVencerPago: number;
  private _isLastPaymentMethod: boolean;
  public expirationType: IPlanExpirationType;

  /**
   * @param expiredTime ICalendarType
   * @param diasParaVencerPago number
   * @param isLastPaymentMethod? boolean = false.
   */
  constructor(
    expiredTime: ICalendarTypes,
    diasParaVencerPago: number,
    isLastPaymentMethod: boolean = false
  ) {
    this._expiredTime = expiredTime;
    this._diasParaVencerPago = Helper.isValidNumberReturnNumber(
      diasParaVencerPago,
      0,
      365
    );
    this._isLastPaymentMethod = isLastPaymentMethod;
    this.expirationType = IPlanExpirationType.TIME;
  }

  getPlanExpirationType(): IPlanExpirationType {
    return this.expirationType;
  }

  public get expiredTime(): ICalendarTypes {
    return this._expiredTime;
  }
  public set expiredTime(value: ICalendarTypes) {
    this._expiredTime = value;
  }

  public get diasParaVencerPago(): number {
    return this._diasParaVencerPago;
  }
  public set diasParaVencerPago(value: number) {
    this._diasParaVencerPago = value;
  }

  public get isLastPaymentMethod(): boolean {
    return this._isLastPaymentMethod;
  }
  public set isLastPaymentMethod(value: boolean) {
    this._isLastPaymentMethod = value;
  }

  getExpirationAmount(): number | null {
    throw new Error('Metodo de tiempo no tiene cantidad');
  }
  getExpirationDate(): Date {
    return this.getExpiration();
  }

  getExpiration(): Date {
    let primerDiaMes;

    if (this._expiredTime === 'mensual') {
      return Helper.getFirstDayOfNextMonth(new Date());
    }

    if (this._expiredTime === 'bimensual') {
      return Helper.getFirstDayOfParticularMonth(new Date(), 2);
    }

    if (this._expiredTime === 'trimestral') {
      return Helper.getFirstDayOfParticularMonth(new Date(), 3);
    }

    if (this._expiredTime === 'semestral') {
      return Helper.getFirstDayOfParticularMonth(new Date(), 6);
    }

    if (this._expiredTime === 'anual') {
      return Helper.getFirstDayOfParticularMonth(new Date(), 12);
    }

    if (this._expiredTime === ICalendarTypes.CATORCE) {
      return Helper.sumarDiasAFechas(new Date(), 14);
    }

    if (this._expiredTime === ICalendarTypes.SIETE) {
      return Helper.sumarDiasAFechas(new Date(), 7);
    }

    // Si es true, los 30 dias se cuentan desde el último pago. A los 30 dias no se generan mas pagos por que no es una suscripcion, no acumula deuda.
    if (this._isLastPaymentMethod) {
      // Todo. ¿Que fecha retorno? ¿Es 30 dias despues del ultimo pago pero desde aca no lo se?.
      throw new Error('function not implemented');
      // return getFirstDayOfNextMonth(new Date());
      // fechaVencimientoPago = sumarDiasAFechas(primerDiaMes, this._diasParaVencerPago)
    }
    // fechaVencimientoPago = sumarDiasAFechas(primerDiaMes, this._diasParaVencerPago)

    throw new Error(
      `Error al retornar la fecha de expiración de tipo Calendario ${this._expiredTime}`
    );
  }

  getPaymentExpiration(): Date {
    let paymentExpirationDate = Helper.sumarDiasAFechas(
      this.getExpirationDate(),
      this._diasParaVencerPago
    );
    return paymentExpirationDate;
  }
}
