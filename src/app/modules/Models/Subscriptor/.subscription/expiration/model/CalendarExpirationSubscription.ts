// import { PlanSubscription } from '../../planSubscription/models/PlanSubscription';

import { PlanSubscription } from '../../../../PlanSubscription/models/PlanSubscription';
import { ExpirationSubscriptionMethod } from './ExpirationMethodSubscription';

export class CalendarExpirationSubscription extends ExpirationSubscriptionMethod {
  // Todo Eliminar el planSubscription de aca, lo pasa subscription.
  /**
   * @param planSubscription
   * @param dateExpired
   */
  constructor(planSubscription: PlanSubscription, dateExpired: Date) {
    super(planSubscription, dateExpired);
  }
  prueba(): void {
    throw new Error('Method not implemented.');
  }

  override isPlanExpired(): boolean {
    console.log('CalendarExpirationSubscription isPlanExpired()');
    // Todo comprobar.
    return true;
  }
}

// export class CalendarExpirationSubscription implements IExpirationSubscriptionMethod {

//     private _dateToExpired: Date;
//     private _manualDateExpired: Date
//     private _planSubscription: PlanSubscription
//     private _notes: string[];

//     /**
//      * @param planSubscription
//      * @param dateExpired
//      */
//    constructor(planSubscription: PlanSubscription , dateExpired : Date) {
//        this._planSubscription = planSubscription;
//        this._dateToExpired = dateExpired;
//        this._manualDateExpired = new Date("1970 1 1"); // Fecha default.
//        this._notes = [];
//    }

//     //? - - - - - - - - - - - - - Update Expirations  - - - - - - - - - - - - - - --

//     /**
//      * Actualizar la fecha de vencimiento de forma manual.
//      * Registra en notas el cambio
//      * @param motivoCambio ¿Por que estan cambiando? explicar.
//      * @param newExpirationDate
//      * @returns Date
//      */
//     updateManualNewExpirationDate(motivoCambio: string,newExpirationDate: Date): Date {
//         const oldManualDate = this._manualDateExpired;
//         this._manualDateExpired = newExpirationDate;
//         this.registerNotes(motivoCambio,oldManualDate)
//         return this._manualDateExpired
//     }

//     /**
//      * Actualiza la fecha de vencimiento de forma manual, agregando a la expiracion actual los dias pasados por parametro.
//      * Registra en notas el cambio
//      * @param motivoCambio ¿Por que estan cambiando? explicar.
//      * @param numberDays number
//      */
//     updateManualAddingDaysToExpiration(motivoCambio: string, numberDays: number): Date {
//         const oldManualDate = this._manualDateExpired;
//         this.registerNotes(motivoCambio, oldManualDate)
//         this._manualDateExpired = Helper.sumarDiasAFechas(this._manualDateExpired, numberDays);
//         return this._manualDateExpired;
//     }

//     /**
//      * Actualiza la fecha automatica segun el ultimo pago.
//      */
//     updateFromLastPayment(): void {
//         // Actualiza this._dateToExpired.
//         throw new Error("Method not implemented.");
//     }

//     update(): void {
//         throw new Error("Method not implemented.");
//     }

//     //? - - - - - - - - - - - - - Others  - - - - - - - - - - - - - - -

//     isPlanExpired(): boolean {
//         throw new Error("Method not implemented.");
//     }

//     isPlanActive(): boolean {
//         return true;
//     }

//     registerAccess(): boolean {
//         throw new Error("Method not implemented.");
//     }
//     cancelSubscription() {
//         throw new Error("Method not implemented.");
//     }

//     /**
//      * Get notes of changes in expiration.
//      * @returns string[]
//      */
//     getNotes() : string[] {
//         return this._notes
//     }

//     /**
//      * Agregar notas ante cambios en las fechas de expiracion.
//      * @param motivoCambio ¿Por que estan cambiando? explicar.
//      * @param oldDateManual
//      * @returns
//      */
//     private registerNotes(motivoCambio: string, oldDateManual: Date) {
//         let message = `Motivo del cambio: ${motivoCambio}.\n\n Cambio realizado el dia ${Helper.TodayDate()}.\n Fecha Vieja Manual: ${oldDateManual ? oldDateManual : "No habia" },\n Fecha Vieja Pagos: ${this._dateToExpired}.\n Nueva fecha manual: ${this._manualDateExpired}`

//         return this._notes.push(message)
//     }
//     //? - - - - - - - - - - - - - GET EXPIRATIONS - - - - - - - - - - - - - - -

//     /**
//      * Fecha de expiracion real. Tiene en cuenta la expiración de pago y la manual. Retorna la mayor.
//      * @returns Date
//      */
//     getExpirationDate(): Date {
//         const expiredDateLastPayment: Date = this._dateToExpired;
//         const manualExpiredDate: Date = this._manualDateExpired;

//         return manualExpiredDate > expiredDateLastPayment ? manualExpiredDate : expiredDateLastPayment;
//     }

//     getExpiration() {
//         throw new Error("Method not implemented.");
//     }

//     getPaymentExpiration(): Date | null {
//         const dateToExpired = this._dateToExpired;
//         const manualDateExpired = this._manualDateExpired;
//         const paymentExpiration = this._planSubscription.getPaymentExpiration(); // Todo. Ver funcion completa. Si tengo una manual sirve? cuando la pediria?

//         if (dateToExpired > paymentExpiration || manualDateExpired > paymentExpiration) {
//             return null
//         }
//         return paymentExpiration;
//     }

//     getExpirationAmount(): number | null {
//         throw new Error("Method not implemented.");
//     }
// }
