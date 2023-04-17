import { IStatusList } from 'src/app/modules/components/Settings/status-list/status-list.component';
import { PlanSubscription } from '../../../PlanSubscription/models/PlanSubscription';
import { FreezeSuscriptionData } from '../model/FreezeSuscriptionData';
import { ICondition } from './IConditions';
import { IRegisterAccessNotes } from './IRegisterAccessNotes';
import { ISubscriptionStatus } from './ISubscriptionStatus';

export interface ISubscription {
  getPlanSubscription(): PlanSubscription; // Todo activar.

  /**
   * 1° Estatus !== activo (Si tiene un pago pendiente) estará expirado.
   * 2° Si esta activo, verifica cuanto tiempo o cantidad de usos le quedan.
   */
  isPlanExpired(): boolean;

  /**
   * 1° Estatus !== activo (Si tiene un pago pendiente) estará expirado.
   * 2° Si esta activo, verifica cuanto tiempo o cantidad de usos le quedan.
   */
  isPlanActive(): boolean;

  /**
   * Si el plan no esta activo, devolver la fecha del ultimo pago. Esta deudor.
   * Si esta activo, devuelve el vencimiento del plan normal.
   * @returns expiration que le queda a la subscription.
   */
  getExpiration(): any;

  //? - - -  - - - -  - - - - Register Access - - - - - - - - - - - -  - - -  -  - - - -

  /**
   * Registra un acceso.
   */
  registerAccess(): any;

  /**
   * @return notas de accessos registrados del subscriptor.
   */
  getNotesRegisterAccess(): IRegisterAccessNotes[];
  //? - - -  - - - -  - - - - Update - - - - - - - - - - - -  - - -  -  - - - -
  updateStatus(): any;

  /**
   * Actualiza la expirationDate del subscriptor de forma automatica según la FECHA del último pago completado.
   * @param paymentExpired Date
   * @return Date
   */
  updateExpirationByLastPayment(paymentExpired: Date): Date;
  /**
   * Actualiza la expirationDate del subscriptor de forma manual.
   * @param newExpiration nueva expirationDate.
   * @return Date
   */
  updateExpirationDateManual(motivo: string, newExpiration: Date): Date;
  //? - - -  - - - -  - - - - Notes Expiration - - - - - - - - - - - -  - - -  -  - - - -

  /**
   * @return  Retorna las notas de todos los cambios en la expiracion.
   */
  getNotesExpiration(): string[];

  //? - - -  - - - -  - - - - Status - - - - - - - - - - - -  - - -  -  - - - -

  /**
   * Segun los pagos pendientes o completados.
   * @return ISubscriptionStatus. El estado de la subscripción. (activo, deuda1, deuda2, moroso1)
   */
  getStatus(): ISubscriptionStatus;

  /**
   * Actualizar de forma manual el nuevo estado *No recomendado*
   * @param newStatus
   */
  updateStatusManual(newStatus: ISubscriptionStatus): ISubscriptionStatus;

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

  //? - - -  - - - -  - - - - Get - - - - - - - - - - - -  - - -  -  - - - -

  getAmountUsesExpiration(): number | null;

  /**
   * Retorna un string, con la cantidad de usos o si es ilimitado (tiempo).
   */
  getAmountUsesExpirationVisual(): string;

  /**
   * Get expiration subscription Date.
   * @returns Date
   */
  getExpirationDate(): Date;

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
  //?- - - - - - - - - - - - -  - - - Payments - - - - - - - - - - - - -  - - -

  /**
   * Trae todos los pagos relacionados a esta suscripcion.
   */
  // getAllPayments(): Payment[]; // Todo habilitar luego.

  //? - - -  - - - -  - - - - Creator - - - - - - - - - - - -  - - -  -  - - - -
}
