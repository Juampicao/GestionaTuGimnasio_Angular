import { MyCustomLogger } from '../../../../core/services/log/my-custom-logger';
import { PlanSubscription } from '../../PlanSubscription/models/PlanSubscription';
import { ErrorNoTieneAcceso } from '../error/ErrorNoTieneAcceso';
import { IExpirationSubscriptionMethod } from './expiration/interface/IExpirationSubscriptionMethod';
import { IRegisterAccessNotes } from './interface/IRegisterAccessNotes';
import { ISubscription } from './interface/ISubscription';
import { FreezeSuscriptionData } from './model/FreezeSuscriptionData';
import { RegisterAccessNotes } from './model/RegisterAccessNotes';

import { Helper } from 'src/app/core/services/helper/Helper';
import { IStatusList } from 'src/app/modules/components/Settings/status-list/status-list.component';
import { StatusManager2Service } from 'src/app/modules/Subscriptors/services/status-manager/2/status-manager2.service';
import { StatusManagerInjectorService } from 'src/app/modules/Subscriptors/services/status-manager/injector/status-manager-injector.service';
import { Payment } from '../../Payment/models/Payment';
import { AmountUsesExpirationSubscription } from './expiration/model/AmountUsesExpirationSubscription';
import { CalendarExpirationSubscription } from './expiration/model/CalendarExpirationSubscription';
import { ICondition } from './interface/IConditions';
import { ISubscriptionStatus } from './interface/ISubscriptionStatus';

const customLogger = new MyCustomLogger();

export class Subscription implements ISubscription {
  private _estado: ISubscriptionStatus;
  private _creator: any; // Gimnasio creador.
  private _planSubscription: PlanSubscription;
  private _expiration: IExpirationSubscriptionMethod;
  private _freezed: FreezeSuscriptionData[] | null;
  private _registerAccessNotes: IRegisterAccessNotes[];

  //! Servicio statusManager.
  private _statusManagerService: StatusManager2Service;

  /**
   * @param planSubscription PlanSubscription
   * @param expiration  IExpirationSubscriptionMethod
   */
  constructor(
    planSubscription: PlanSubscription,
    expiration: IExpirationSubscriptionMethod
  ) {
    this._planSubscription = planSubscription;
    this._expiration = expiration;
    this._estado = ISubscriptionStatus.NULL;
    this._freezed = null;
    this._registerAccessNotes = [];
    //! Injector Service
    this._statusManagerService =
      StatusManagerInjectorService.selectService('mock');
  }

  public isPlanExpired(): boolean {
    const status: ISubscriptionStatus = this.getStatus();
    if (status !== 'Activo') {
      return false;
    }
    return this._expiration.isPlanExpired();
  }

  public isPlanActive(): boolean {
    try {
      const status: ISubscriptionStatus = this.getStatus();
      if (status !== 'Activo') {
        return false;
      }

      customLogger.logDebug(
        `Subscription, isPlanActive(), status: ${status}`,
        ''
      );

      const response = this._expiration.isPlanActive();

      return response;
      return true;
    } catch (error) {
      throw new ErrorNoTieneAcceso(
        `No puede registrar un acceso. Subscripción con status ${this.getStatus()}`
      );
    }
  }

  public getExpiration() {
    if (!this.isPlanActive()) {
      //Todo. Puedo enviar un error o enviar el 0 directamente. 1) Cero 2) Fecha de creación del ultimo pago. Si debe 3 meses, se muestra de 3 meses atras.
      //  throw new Error(`No puede obtener la expiracion de un plan expirado.`);
      return 0;
    }
    return this._expiration.getExpiration();
  }

  //? - - -  - - - -  - - - - Register Access - - - - - - - - - - - -  - - -  -  - - - -

  public registerAccess() {
    try {
      //! Todo validar si el plan esta activo, verificar con la lista de estados..
      // if (!this.isPlanActive()) {
      //   customLogger.logDebug(
      //     'Subscription.registerAccess()',
      //     `PlanActive: ${this.isPlanActive()}. Subscripción con status ${this.getStatus()} `
      //   );
      //   throw new Error(
      //     `No puede registrar un acceso. Plan No Activo. Subscripción con status ${this.getStatus()}`
      //   );
      // }

      // Todo. Registrar ingreso y egreso. Deberia retornar true desde aca, mas corto. Verificar que esto este bien.
      // if (this._expiration.registerAccess()) {
      //   const registerAccesNote = new RegisterAccessNotes(
      //     Helper.TodayDate(),
      //     null
      //   );
      //   this._registerAccessNotes.push(registerAccesNote);
      // }

      // return this._expiration.registerAccess();

      this._expiration.registerAccess();

      const registerAccesNote = new RegisterAccessNotes(
        Helper.TodayDate(),
        null
      );
      this._registerAccessNotes.push(registerAccesNote);

      customLogger.logInfo(
        'onRegisterAccess: GetAmountUses=',
        `${this.getAmountUsesExpiration()}`
      );
    } catch (error) {
      // throw new ErrorNoTieneAcceso(
      //   `No puede registrar un acceso. Expiration. Subscripción con status ${this.getStatus()}`
      // );
      throw new ErrorNoTieneAcceso(`${error}`);
    }
  }

  getNotesRegisterAccess(): IRegisterAccessNotes[] {
    return this._registerAccessNotes;
  }

  //? - - -  - - - -  - - - - Status - - - - - - - - - - - -  - - -  -  - - - -

  getStatus(): ISubscriptionStatus {
    try {
      return this._estado;
    } catch (error) {
      customLogger.logError('Subscriptor on getStatus', error);
      throw new Error(`${error}`);
    }
  }

  getCondition(): ICondition {
    try {
      return this._statusManagerService.getCondition(this.getStatus());
    } catch (error) {
      customLogger.logError('Subscriptor on getConditionStatusMessage', error);
      throw new Error(`${error}`);
    }
  }

  getConditionStatusMessage(): string {
    try {
      return this._statusManagerService.getStatusObject(this.getStatus())
        .message;
    } catch (error) {
      customLogger.logError('Subscriptor on getConditionStatusMessage', error);
      throw new Error(`${error}`);
    }
  }

  getStatusObject(): IStatusList {
    try {
      return this._statusManagerService.getStatusObject(this.getStatus());
    } catch (error) {
      customLogger.logError('Subscriptor on getStatusObject', error);
      throw new Error(`${error}`);
    }
  }

  getNumberDaysToExpired(): string {
    try {
      return this._statusManagerService.getNumberDaysToExpired(
        this.getExpirationDate()
      );
    } catch (error) {
      customLogger.logError('Subscriptor on getNumberDaysToExpired', error);
      throw new Error(`${error}`);
    }
  }

  /**
   * Verifica todos los pagos. TOdos pagos = "activo". Uno deuda = "deuda1", 4 en deuda = "moroso1", 6 en deuda = "moroso2";
   */
  updateStatus() {
    customLogger.logDebug(
      'Subscription.updateStatus()',
      `Subscripción con status ${this.getStatus()} `
    );
    throw new Error('function not implemented');
    // Iterar los ultimos 6 pagos. Contar las cantidad de "pendiente", "deuda". Segun la cantidad, asignar un status.
    // Pago todo = "activo"
    // Vencio plan pero hay 10 dias para pagar = "periodoPago"
    // Debe 1 cuota = "deuda1".
  }

  /**
   * Actualiza el status de la subscription de forma manual.
   * Todo. ¿Si actualizo manual pero debo 3 pagos?. Actualizar manual, pero un metodo automatico esta viendo si pago o no y volver a inactivo. Pasar a activo pero borrar manual los pagos pendientes. Como el caso de expiration manual. Hay un manualExpired.
   * Todo. No debería actualziarse manual. Si quiere salir de Deuda3 a activo, eliminar los pagos..
   * @param newStatus: ISubscriptionStatus
   */
  updateStatusManual(newStatus: ISubscriptionStatus): ISubscriptionStatus {
    this._estado = newStatus;
    return this._estado;
  }

  //?- - - - - - - - - - - - -  - - - UPDATE - - - - - - - - - - - - -  - - -

  updateExpirationByLastPayment(paymentExpired: Date): Date {
    return this._expiration.updateNewExpirationDate(
      'Actualización Automatica según ultimo pago',
      paymentExpired
    );
  }

  updateExpirationDateManual(motivo: string, newExpiration: Date): Date {
    return this._expiration.updateNewExpirationDate(motivo, newExpiration);
  }

  //?- - - - - - - - - - - - -  - - - Notes expiration  - - - - - - - - - - - - -  - - -

  getNotesExpiration(): string[] {
    return this._expiration.getNotes();
  }

  //?- - - - - - - - - - - - -  - - - PAYMENTS - - - - - - - - - - - - -  - - -

  getAllPayments(): Payment[] {
    throw new Error('function not implemented');
  }

  pruebaExpirationDiferentMethods() {
    if (this._expiration instanceof CalendarExpirationSubscription) {
      return this._expiration.cancelSubscription();
    }

    if (this._expiration instanceof AmountUsesExpirationSubscription) {
      return this._expiration.updateAmount('prueba', 'add', 0);
    }
  }

  /**
   * Todo. instance de plan? o expiration directo?
   * @returns
   */
  getAmountUsesExpiration(): number | null {
    if (this._expiration instanceof AmountUsesExpirationSubscription) {
      return this._expiration.getExpirationAmount();
    } else {
      return null;
    }

    // if (
    //   this._planSubscription.expiracion instanceof AmountUsesExpirationMethod
    // ) {
    //   const expiration = this._expiration.getExpirationAmount();
    //   if (expiration) {
    //     return expiration;
    //   }
    // }

    throw new Error('No tiene un plan con cantidad');
  }

  getAmountUsesExpirationVisual() {
    if (this._expiration instanceof AmountUsesExpirationSubscription) {
      return `${this._expiration.getExpirationAmount()} usos`;
    } else {
      return 'Ilimitado';
    }
  }

  public getExpirationDate(): Date {
    return this._expiration.getExpirationDate();
  }

  getPlanSubscription(): PlanSubscription {
    return this._planSubscription;
  }

  //?- - - - - - - - - - - - -  - - - Freezed - - - - - - - - - - - - -  - - -

  isFreezed(): boolean {
    if (this._freezed !== null) {
      return true;
    }
    return false;
  }

  updateFreezeDate(freezeData: FreezeSuscriptionData): FreezeSuscriptionData {
    try {
      if (Helper.TodayDate().getTime() <= freezeData.sinceDate.getTime()) {
        customLogger.logError(
          'Subscription',
          'No puede ser menor a hoy la fecha',
          'updateFreezeDate()'
        );
        throw new Error('No puede ser menor a hoy la fecha');
      }

      if (freezeData.sinceDate.getTime() > freezeData.untilDate.getTime()) {
        customLogger.logError(
          'Subscription',
          'La fecha de inicio no puede ser mayor que la fecha de fin',
          'updateFreezeDate()'
        );
        throw new Error(
          'La fecha de inicio no puede ser mayor que la fecha de fin'
        );
      }

      // Inicializo el array.
      this._freezed = [];

      // Agrego la data.
      this._freezed.push(freezeData);

      customLogger.logDebug(
        'Subscription',
        'updateFreezeDate().',
        this._freezed
      );

      // Actualiza el status a "Congelado"
      this.updateStatusManual(ISubscriptionStatus.CONGELADO);

      return freezeData;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  getFreezeData(): FreezeSuscriptionData[] | null {
    if (!this.isFreezed()) {
      return null;
    }

    return this._freezed;
  }

  getLastFreezeData(): FreezeSuscriptionData | null {
    if (!this.isFreezed()) {
      return null;
    }

    let lastFreezeData;
    if (this._freezed) {
      return (lastFreezeData = this._freezed[this._freezed?.length - 1]);
    }

    return null;
  }

  getDateFinishFreezed(): Date | null {
    if (!this.isFreezed()) {
      return null;
    }

    if (!this._freezed) {
      return null;
    }

    return null;
    // Todo crear metodo
    // const maxUntilDate = this._freezed.reduce((maxDate, data) => {
    //   return Math.max(maxDate, data.untilDate.getTime());
    // }, 0);

    // const maxUntilDateObj = this._freezed.find(
    //   (data) => data.untilDate.getTime() === maxUntilDate
    // );

    // if (maxUntilDateObj) {
    //   return maxUntilDateObj.untilDate;
    // } else {
    //   return null;
    // }
  }

  //?- - - - - - - - - - - - -  - - - Creator - - - - - - - - - - - - -  - - -
  get creator(): any {
    return this._creator;
  }
}

// TODO ? DOWNCASTING EXAMPLE
// let exp: IExpirationSubscriptionMethod = new CalendarExpirationSubscription(this._planSubscription, new Date());
// (exp as CalendarExpirationSubscription).prueba()

// pruebaExpirationDiferentMethods() {
//     if (this._expiration instanceof CalendarExpirationSubscription) {
//         return this._expiration.cancelSubscription()
//     }

//     if (this._expiration instanceof AmountUsesExpirationSubscription) {
//         return this._expiration.updateManualSustractingAmountUses(10);
//     }

// }
