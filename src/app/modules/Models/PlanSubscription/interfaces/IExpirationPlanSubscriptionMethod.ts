import { IPlanExpirationType } from './IPlanExpirationType';

/**
 * Interfaz para expiration del PlanSubscription
 */
export interface IExpirationPlanSubscriptionMethod {
  expirationType: IPlanExpirationType;
  /**
   * Retorna la expiración del plan.
   */
  getExpiration(): any;

  /**
   * Retorna el amountUses que le quedan por utilizar.
   * @return number o null
   */
  getExpirationAmount(): number | null;

  /**
   * Retorna la fecha de expiración del plan.
   */
  getExpirationDate(): Date;

  /**
   * Retorna la expiración del pago.
   */
  getPaymentExpiration(): Date;

  /**
   * Cantidad o tiempo.
   */
  getPlanExpirationType(): IPlanExpirationType;
}
