import { Helper } from 'src/app/core/services/helper/Helper';
import { PlanSubscription } from 'src/app/modules/Models/PlanSubscription/models/PlanSubscription';
import { IExpirationSubscriptionMethod } from '../interface/IExpirationSubscriptionMethod';

export abstract class ExpirationSubscriptionMethod
  implements IExpirationSubscriptionMethod
{
  private _dateToExpired: Date;
  private _manualDateExpired: Date;
  private _planSubscription: PlanSubscription;
  protected _notes: string[];

  // Todo Eliminar el planSubscription de aca, lo pasa subscription.
  /**
   * @param planSubscription
   * @param dateExpired
   */
  constructor(planSubscription: PlanSubscription, dateExpired: Date) {
    this._planSubscription = planSubscription;
    this._dateToExpired = dateExpired;
    this._manualDateExpired = new Date('1970 1 1'); // Fecha default.
    this._notes = [];
  }

  //? - - - - - - - - - - - - - Update Expirations  - - - - - - - - - - - - - - --

  /**
   * Actualizar la fecha de vencimiento.
   * Registra en notas el cambio
   * @param motivoCambio ¿Por que estan cambiando? explicar.
   * @param newExpirationDate Nueva objetivo de expiracion.
   * @returns Date
   */
  updateNewExpirationDate(motivoCambio: string, newExpirationDate: Date): Date {
    const oldDate = this._dateToExpired;
    this._dateToExpired = newExpirationDate;
    this.registerNotes(motivoCambio, oldDate);
    return this._dateToExpired;
  }

  /**
   * Todo VER METODO Actualizar la fecha de vencimiento de forma manual. ¿sirve?
   * Registra en notas el cambio
   * @param motivoCambio ¿Por que estan cambiando? explicar.
   * @param newExpirationDate
   * @returns Date
   */
  updateManualNewExpirationDate(
    motivoCambio: string,
    newExpirationDate: Date
  ): Date {
    const oldManualDate = this._manualDateExpired;
    this._manualDateExpired = newExpirationDate;
    this.registerNotes(motivoCambio, oldManualDate);
    return this._manualDateExpired;
  }

  /**
   * Actualiza la fecha de vencimiento de forma manual, agregando a la expiracion actual los dias pasados por parametro.
   * Todo VER METODO Actualizar la fecha de vencimiento de forma manual. ¿sirve? Sirve pero no para los planes de tipo mes. Si los manuales
   * Registra en notas el cambio
   * @param motivoCambio ¿Por que estan cambiando? explicar.
   * @param numberDays number
   */
  updateManualAddingDaysToExpiration(
    motivoCambio: string,
    numberDays: number
  ): Date {
    const oldManualDate = this._manualDateExpired;
    this.registerNotes(motivoCambio, oldManualDate);
    this._manualDateExpired = Helper.sumarDiasAFechas(
      this._manualDateExpired,
      numberDays
    );
    return this._manualDateExpired;
  }

  update(): void {
    throw new Error('Method not implemented.');
  }

  //? - - - - - - - - - - - - - Others  - - - - - - - - - - - - - - -

  isPlanExpired(): boolean {
    return true;
    // Todo revisar.
  }

  // Todo hacer una validacin por estado..
  isPlanActive(): boolean {
    // throw new Error('Method not implemented.');
    return true;
  }

  registerAccess(): boolean {
    throw new Error('Method not implemented.');
  }
  cancelSubscription() {
    throw new Error('Method not implemented.');
  }

  /**
   * Get notes of changes in expiration.
   * @returns string[]
   */
  getNotes(): string[] {
    return this._notes;
  }

  /**
   * Agregar notas ante cambios en las fechas de expiracion.
   * @param motivoCambio ¿Por que estan cambiando? explicar.
   * @param oldDateManual
   * @returns
   */
  private registerNotes(motivoCambio: string, oldDateManual: Date) {
    let message = `CAMBIO FECHA MANUAL.\n Motivo del cambio: ${motivoCambio}.\n\n Cambio realizado el dia ${Helper.TodayDate().toLocaleDateString()}.\n Fecha Vieja Manual: ${
      oldDateManual ? oldDateManual.toLocaleDateString() : 'No habia'
    },\n Fecha Vieja Automatica: ${this._dateToExpired.toLocaleDateString()}.\n Fecha Nueva Manual: ${this._manualDateExpired.toLocaleDateString()} \n DateToExpired Actual: ${this._dateToExpired.toLocaleDateString()} `;

    return this._notes.push(message);
  }
  //? - - - - - - - - - - - - - GET EXPIRATIONS - - - - - - - - - - - - - - -

  /**
   * Fecha de expiracion real. Tiene en cuenta la expiración de pago y la manual. Retorna la mayor.
   * @returns Date
   */
  getExpirationDate(): Date {
    const expiredDateLastPayment: Date = this._dateToExpired;
    const manualExpiredDate: Date = this._manualDateExpired;

    return manualExpiredDate > expiredDateLastPayment
      ? manualExpiredDate
      : expiredDateLastPayment;
  }

  getExpiration() {
    throw new Error('Method not implemented.');
  }

  getPaymentExpiration(): Date | null {
    const dateToExpired = this._dateToExpired;
    const manualDateExpired = this._manualDateExpired;
    const paymentExpiration = this._planSubscription.getPaymentExpiration(); // Todo. Ver funcion completa. Si tengo una manual sirve? cuando la pediria?

    if (
      dateToExpired > paymentExpiration ||
      manualDateExpired > paymentExpiration
    ) {
      return null;
    }
    return paymentExpiration;
  }

  getExpirationAmount(): number | null {
    throw new Error('Method not implemented.');
  }
}
