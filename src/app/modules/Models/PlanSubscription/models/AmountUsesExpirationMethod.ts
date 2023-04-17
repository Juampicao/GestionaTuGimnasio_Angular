import { Helper } from '../../../../core/services/helper/Helper';
import { ICalendarTypes } from '../interfaces/ICalendarTypes';
import { IExpirationPlanSubscriptionMethod } from '../interfaces/IExpirationPlanSubscriptionMethod';
import { IPlanExpirationType } from '../interfaces/IPlanExpirationType';

export class AmountUsesExpirationMethod
  implements IExpirationPlanSubscriptionMethod
{
  private _diasParaVencerPago: number;
  private _amountUses: number;
  private _maxDaysToUse: number | ICalendarTypes;
  public expirationType: IPlanExpirationType;

  /**
   *
   * @param amountUses
   * @param diasParaVencerPago
   * @param maxDaysToUse
   */
  constructor(
    amountUses: number,
    diasParaVencerPago: number,
    maxDaysToUse: ICalendarTypes
  ) {
    this._amountUses = amountUses;
    this._diasParaVencerPago = diasParaVencerPago;
    this._maxDaysToUse = maxDaysToUse;
    this.expirationType = IPlanExpirationType.AMOUNTUSES;
  }

  getPlanExpirationType(): IPlanExpirationType {
    return this.expirationType;
  }

  getExpirationAmount(): number | null {
    return this._amountUses;
  }

  public get amountUses(): number {
    return this._amountUses;
  }

  public set amountUses(value: number) {
    this._amountUses = value;
  }

  public get diasParaVencerPago(): number {
    return this._diasParaVencerPago;
  }
  public set diasParaVencerPago(value: number) {
    this._diasParaVencerPago = value;
  }

  public get maxDaysToUse(): number | ICalendarTypes {
    return this._maxDaysToUse;
  }
  public set maxDaysToUse(value: number | ICalendarTypes) {
    this._maxDaysToUse = value;
  }

  getExpiration(): any {
    return this._amountUses;
  }

  getExpirationDate(): any {
    if (typeof this._maxDaysToUse === 'number') {
      //Todo. Ejemplo 15. 15 dias despues del ultimo pago.
      throw new Error(` maxDaysToUse === "number" not implemented `);
      return this._maxDaysToUse;
    }

    if (this._maxDaysToUse === 'mensual') {
      return Helper.getFirstDayOfNextMonth(new Date());
    }

    if (this._maxDaysToUse === 'bimensual') {
      return Helper.getFirstDayOfParticularMonth(new Date(), 2);
    }

    if (this._maxDaysToUse === 'trimestral') {
      return Helper.getFirstDayOfParticularMonth(new Date(), 3);
    }

    if (this._maxDaysToUse === 'semestral') {
      return Helper.getFirstDayOfParticularMonth(new Date(), 6);
    }

    if (this._maxDaysToUse === 'anual') {
      return Helper.getFirstDayOfParticularMonth(new Date(), 12);
    }

    // // let fechaVencimientoPago;

    // // Si es true, los 30 dias se cuentan desde el último pago. A los 30 dias no se generan mas pagos por que no es una suscripcion, no acumula deuda.
    // if (this._isLastPaymentMethod) {
    //     // Todo. ¿Que fecha retorno? ¿Es 30 dias despues del ultimo pago pero desde aca no lo se?.

    //     throw new Error("function not implemented")
    //     primerDiaMes = getFirstDayOfNextMonth(new Date());
    //     // fechaVencimientoPago = sumarDiasAFechas(primerDiaMes, this._diasParaVencerPago)
    // }

    // primerDiaMes = getFirstDayOfNextMonth(new Date());
    // // fechaVencimientoPago = sumarDiasAFechas(primerDiaMes, this._diasParaVencerPago)

    // return primerDiaMes;
  }

  getPaymentExpiration(): Date {
    console.info('Viendo getPaymentExpiration');
    let paymentExpirationDate = Helper.sumarDiasAFechas(
      this.getExpirationDate(),
      this._diasParaVencerPago
    );
    return paymentExpirationDate;
  }
}
