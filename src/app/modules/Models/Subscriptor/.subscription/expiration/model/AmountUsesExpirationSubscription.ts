import { AmountUsesExpirationMethod } from 'src/app/modules/Models/PlanSubscription/models/AmountUsesExpirationMethod';
import { Helper } from '../../../../../../core/services/helper/Helper';

import { PlanSubscription } from '../../../../PlanSubscription/models/PlanSubscription';
import { ExpirationSubscriptionMethod } from './ExpirationMethodSubscription';

export interface IAmountUsesOperation {
  operation: 'add' | 'sustract' | 'newAmount';
}

// Todo NUEVA IMPLEMENTACION. Como la voy a llamar al metodo particular desde el suscriptor?.
// Todo Checkear que estan bien los metodos de abajo pero se override algunos con el padre.
export class AmountUsesExpirationSubscription extends ExpirationSubscriptionMethod {
  private _manualAmountUsesToExpired: number | null;
  private _amountUsesToExpired: number;

  // Todo Eliminar el planSubscription de aca, lo pasa subscription.
  /**
   * @param planSubscription
   * @param dateExpired
   */
  constructor(planSubscription: PlanSubscription, dateExpired: Date) {
    super(planSubscription, dateExpired);
    this._amountUsesToExpired = this.setAmountUses(planSubscription);
    this._manualAmountUsesToExpired = null;
  }

  //? - - - - - - - - - - - - - Update Amount Uses From init  - - - - - - - - - - - - - - --

  setAmountUses(planSubscription: PlanSubscription): number {
    if (planSubscription.expiracion instanceof AmountUsesExpirationMethod) {
      return planSubscription.expiracion.amountUses;
    } else {
      console.error(
        'SetAmountUses error, el plan no es de tipo cantidad.',
        `el plan: ${JSON.stringify(planSubscription, null, 2)}`
      );
      throw new Error('Error al definir setAmountUses');
    }
  }
  //? - - - - - - - - - - - - - Update Expirations  - - - - - - - - - - - - - - --

  /**
   * Actualizar el amountUses de forma manual.
   */
  updateAmount(
    motivoCambio: string,
    operation: IAmountUsesOperation['operation'],
    number: number
  ): number {
    const oldManualAmountUses = this._manualAmountUsesToExpired;
    this.registerNotesAmount(motivoCambio, oldManualAmountUses);

    operation === 'add'
      ? (this._amountUsesToExpired = this._amountUsesToExpired + number)
      : null;
    operation === 'sustract'
      ? (this._amountUsesToExpired = this._amountUsesToExpired - number)
      : null;
    operation === 'newAmount'
      ? (this._amountUsesToExpired = this._amountUsesToExpired = number)
      : null;

    return this._amountUsesToExpired;
  }

  //? - - - - - - - - - - - - - Others  - - - - - - - - - - - - - - -

  /**
   * Agregar notas ante cambios en la cantidad de usos.
   * @param motivoCambio ¿Por que estan cambiando? explicar.
   * @param oldDateManual
   * @returns
   */
  private registerNotesAmount(
    motivoCambio: string,
    oldManualAmountUses: number | null
  ) {
    let messageAmount = `\nCANTIDAD CHANGE. Motivo del cambio: ${motivoCambio}.\n\n Realizado el dia: ${Helper.TodayDate()}.\n Cantidad Vieja Manual: ${
      oldManualAmountUses ? oldManualAmountUses : 'Nula'
    }.\n Cantidad Vieja Automatica: ${
      this._amountUsesToExpired
    }.\n Nueva Cantidad Manual: ${this._manualAmountUsesToExpired}`;

    // Todo mismas notas? o unas nuevas?
    return this._notes.push(messageAmount);
  }

  //? - - - - - - - - - - - - - GET EXPIRATIONS - - - - - - - - - - - - - - -

  override getExpirationAmount(): number | null {
    return this._amountUsesToExpired;
  }

  //? - - - - - - - - - - - - - OTROS  - - - - - - - - - - - - - - --

  // todo
  override update(): void {
    throw new Error('Method not implemented.');
  }

  override isPlanExpired(): boolean {
    return this._amountUsesToExpired <= 0;
  }

  override isPlanActive(): boolean {
    if (this._amountUsesToExpired > 0) {
      return true;
    } else {
      return false;
    }
  }

  override registerAccess(): boolean {
    if (this.isPlanExpired()) {
      throw new Error(`No tiene mas entradas al gimnasio`);
    }
    this._amountUsesToExpired--;
    return true;
  }
}

//? Intento 2
// export class AmountUsesExpirationSubscription extends AmountUsesExpirationMethod implements IExpirationSubscriptionMethod{

//     constructor(amountUses: number) {
//         super(amountUses)
//     }

// getPaymentExpiration() {
// Todo. Una fecha para el pago.
// throw new Error("Method not implemented.");
// let paymentExpirationDate = sumarDiasAFechas(this.getExpiration(), this._diasParaVencerPago);
// return paymentExpirationDate;
//     }

//     registerAccess(): boolean {
//         if (this.isPlanExpired()) {
//             throw new Error(`No tiene mas entradas al gimnasio`)
//         }
//         // this.amountUses = this.amountUses - 1;
//         this.amountUses--;
//         return true
//     }

// isPlanExpired(): boolean {
//     return (this.amountUses <= 0);
// }

//     isPlanActive(): boolean {
//         if (this.amountUses > 0) {
//             return true;
//         } else {
//             return false;
//         }
//     }

//     getExpiration(): number {
//         //Todo. Una fecha maxima tambien.
//         return this.amountUses;
//     }

//     updateAmountUses(number: number): void {
//         this.amountUses = number;
//     }

//     getExpirationDate(): Date {
//         throw new Error("Method not implemented.");
//     }

//     update(): void {
//         throw new Error("Method not implemented.");
//     }

//     cancelSubscription() {
//         throw new Error("Method not implemented.");
//     }
// }

//? Intento 3

// export class AmountUsesExpirationSubscription implements IExpirationSubscriptionMethod {

//     private _amountUses: number
//     private _planSubscription: PlanSubscription;

//     /**
//      * @param planSubscription
//      */
//     constructor(amountUses: number , planSubscription: PlanSubscription) {
//         this._planSubscription = planSubscription;
//         this._amountUses = amountUses;
//     }

//     // Todo para que verga retorno todo esto? si el plan ya lo tiene?
//     getExpirationAmount(): number | null {
//         if (this._planSubscription.getExpirationAmount()) {
//             return this._planSubscription.getExpirationAmount();
//         }
//         return null;
//     }

//     getExpirationDate(): Date {
//         return this._planSubscription.getExpirationDate();
//     }

//     getExpiration(): number | null {

//         return this._amountUses;
//     }

//     getPaymentExpiration() {
//         return this._planSubscription.getPaymentExpiration()
//     }

//     registerAccess(): boolean {
//         if (this.isPlanExpired()) {
//             throw new Error(`No tiene mas entradas al gimnasio`)
//         }
//         // this.amountUses = this.amountUses - 1;
//         this._amountUses--;
//         return true
//     }

//     isPlanExpired(): boolean {
//         return (this._amountUses <= 0);
//     }

//     isPlanActive(): boolean {
//         if (this._amountUses > 0) {
//             return true;
//         } else {
//             return false;
//         }
//     }

//     updateAmountUses(number: number): void {
//         this._amountUses = number;
//     }

//     update(): void {
//         throw new Error("Method not implemented.");
//     }

//     cancelSubscription() {
//         throw new Error("Method not implemented.");
//     }

// }

//? Intento 4
// export class AmountUsesExpirationSubscription extends ExpirationSubscriptionMethod {

//     private _amountUses: number

//     /**
//      *
//      * @param amountUses
//      * @param planSubscription
//      * @param dateToExpired
//      */
//     constructor(amountUses: number, planSubscription: PlanSubscription, dateToExpired: Date) {
//         super(planSubscription, dateToExpired)
//         this._amountUses = amountUses;
//     }

//     registerAccess(): boolean {
//         if (this.isPlanExpired()) {
//             throw new Error(`No tiene mas entradas al gimnasio`)
//         }
//         // this.amountUses = this.amountUses - 1;
//         this._amountUses--;
//         return true
//     }

//     isPlanActive(): boolean {
//         if (this._amountUses > 0) {
//             return true;
//         } else {
//             return false;
//         }
//     }
// }

//? Viejas funciones reemplazadas por una sola arriba (updateAmount)
// /**
//  * Actualizar nuevo monto de usos.
//  * @param newUsesAmount
//  * @returns
//  */
// updateManualNewAmount(newUsesAmount: number): number {
//     this._amountUsesToExpired = newUsesAmount;
//     return this._amountUsesToExpired;
// }

// /**
//  * Sumar usos manualmente a la cantidad actual
//  * @param addUsesNumber
//  * @returns
//  */
// updateManualAddingAmountUses(addUsesNumber: number): number {
//     this._amountUsesToExpired = this._amountUsesToExpired + addUsesNumber;
//     return this._amountUsesToExpired;
// }

// /**
//  * Restar usos manualmente a la cantidad actual
//  * @param restUsesNumber
//  * @returns
//  */
// updateManualSustractingAmountUses(restUsesNumber: number): number {
//     this._amountUsesToExpired = this._amountUsesToExpired - restUsesNumber;
//     return this._amountUsesToExpired;
// }
