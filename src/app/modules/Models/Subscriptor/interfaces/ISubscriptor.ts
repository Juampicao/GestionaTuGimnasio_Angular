import { IStatusList } from 'src/app/modules/components/Settings/status-list/status-list.component';
import { SubscriptionSubscriptorPayment } from '../../Payment/models/SubscriptionSubscriptorPayment';
import { CreateNewPaymentSubscriptionData } from '../../Payment/services/models/CreateNewPaymentSubscriptionData';
import { PlanSubscription } from '../../PlanSubscription/models/PlanSubscription';
import { Rutine } from '../../Rutine/models/Rutine';
import { PersonalInformation } from '../.personal-information/model/PersonalInformation';
import { ICondition } from '../.subscription/interface/IConditions';
import { IRegisterAccessNotes } from '../.subscription/interface/IRegisterAccessNotes';
import { ISubscriptionStatus } from '../.subscription/interface/ISubscriptionStatus';
import { FreezeSuscriptionData } from '../.subscription/model/FreezeSuscriptionData';

export interface ISubscriptor {
  isSubscriptionActive(): boolean;

  //? - - - - - - - - - - Status  - - - - - - - - - -
  /**
   * Estado del subsriptor
   * @returns ISubscriptionStatus
   */
  getStatus(): ISubscriptionStatus;

  /**
   * Retorna la condicion del subscriptor.
   * @return ICondition
   */
  getCondition(): ICondition;

  /**
   * @return Retorna el mensaje para del subscriptor segun el estado en el que se encuentra
   */
  getConditionStatusMessage(): string;

  /**
   * Toda la infromacion relacionada a su estado
   * @return objeto de IStatusList;
   */
  getStatusObject(): IStatusList;

  /**
   * @param dateExpired Date
   * @returns Dias que faltan para vencer o dias que ya vencio.
   */
  getNumberDaysToExpired(): string;

  /**
   * Actualiza el estado de forma manual *NO RECOMENDADO* *SOLO PARA PROBAR*
   * @param newStatus ISubscriptionStatus
   */
  updateStatusManual(newStatus: ISubscriptionStatus): ISubscriptionStatus;

  //? - - - - - - - - - - Register Access - - - - - - - - - -

  /**
   * @return las notas de los accesos que tuve el subscriptor.
   */
  getNotesRegisterAccess(): IRegisterAccessNotes[];
  /**
   * Permite acceder al subscriptor, y registra la entrada. Si no esta permitido, retorna un error.
   * @return boolean
   */
  registerAccess(): boolean;

  /**
   * Retorna la expiración que le queda al subscriptor. Si no tiene, arroja 1) 0 2) Error.
   */
  getExpiration(): any;

  /**
   * Retorna la fecha de expiracion de la suscripcion.
   */
  getDateExpiration(): Date;

  /**
   * Retorna la cantidad de usos que le quedan.
   * Si el plan de subscription es !== amountUses, arroja un error.
   * Todo ver si deberia arrojar un error o null.
   */
  getAmountUsesExpiration(): number | null;

  /**
   * Retorna un string, con la cantidad de usos o si es ilimitado (tiempo).
   */
  getAmountUsesExpirationVisual(): string;
  //? - - - - - - - - Update Expiration - - - - - - - -

  /**
   * Actualiza el expiration => expirationDate. (no el manual)
   * @param motivo ¿Por que modificas la expiracion?
   * @param newExpiration Date. Nueva expiración.
   */
  updateManualExpiration(motivo: string, newExpiration: Date): Date;

  /**
   * Todo descomentar.
   * Actualiza la expirationDate del subscriptor de forma automatica según la el último pago completado.
   * @param paymentExpired Date
   */
  // updateExpirationByLastPayment(): Date;

  /**
   * Todo descomentar.
   * Actualiza la expirationDate del subscriptor luego de elimnar un pago. Puede ser: 1) Segun ultimo pago 2) nueva fecha.
   * @param expirationDeleteMethod ExpirationDeleteMethod
   */
  // updateExpirationAfterDeletePayment(
  //   expirationDeleteMethod: ExpirationDeleteMethod
  // ): Date;

  /**
   * Retorna las notas de todos los cambios en la expiracion.
   */
  getNotesExpiration(): string[];

  //? - - - - - - - - Plan - - - - - - - -

  getPlanSubscription(): PlanSubscription;
  //? - - - - - - - - Payments - - - - - - - -

  // Todo ahora descomentar
  createPaymentSubscription(
    createNewPaymentSubscriptionData: CreateNewPaymentSubscriptionData
  ): SubscriptionSubscriptorPayment;

  // Todo descomentar
  // getAllSubscriptionPayments(): SubscriptionSubscriptorPayment[];

  /**
   * Todo descomentar.
   */
  // getAllPayments(): Payment[];

  // createPendingPayment(): any;

  // completePayment(): any;

  /**
   * Todo descomentar.
   *
   * Eliminar un pago. Al estar vinculado a una subscription, va a actualizar la fecha de expiracion.
   * @param pago SubscriptionSubscriptorPayment
   */
  // deletePaymentSubscriptionAndUpdateExpiration(
  //   payment: SubscriptionSubscriptorPayment,
  //   newExpiration: Date
  // ): any;

  /**
   * Todo descomentar.
   * Retorna el último pago del suscriptor COMPLETADO.
   * @returns SubscriptionSubscriptorPayment
   */
  // getLastSubscriptionPaymentCompleted(): SubscriptionSubscriptorPayment;

  //? - - - - - - - - Rutine - - - - - - - -

  getRutine(): Rutine | null;

  //? - - - - - - - - Personal Information - - - - - - - -

  getPersonalInformation(): PersonalInformation;

  //?- - - - - - - - - - - - -  - - - Freezed - - - - - - - - - - - - -  - - -
  isFreezed(): boolean;

  /**
   * Permite "frizar" una suscripcion.
   * Ejemplo un jugador por 6 meses seguira activo, pero no se le crearan pagos. Podes permitir que pasen igual.
   *  Actualiza el status a "Congelado"
   * @param freezeData FreezeSuscriptionData
   */
  updateFreezeDate(freezeData: FreezeSuscriptionData): FreezeSuscriptionData;

  /**
   * Obtener la informacion sobre las congelaciones del subscriptor.
   * Si no tuve, devuelve null.
   * @returns FreezeSubscritionData[] o null.
   */
  getFreezeData(): FreezeSuscriptionData[] | null;

  /**
   * Retorna el objeto FreezeData ultimo que posea. El ultimo congelamiento.
   * @return FreezeSuscriptionData | null
   */
  getLastFreezeData(): FreezeSuscriptionData | null;

  /**
   * Retorna la fecha que finaliza el congelamiento del subscriptor.
   * En caso de que no exista, devuelve null.
   * Si tiene 2 fechas, devuelve las vieja.
   * @return Date | NUll
   */
  getDateFinishFreezed(): Date | null;

  //?- - - - - - - - - - - - -  - - - Creator - - - - - - - - - - - - -  - - -

  /**
   * @return id de quien creo al suscriptor. (que gimnasio, que user).
   */
  getCreator(): any;
}
