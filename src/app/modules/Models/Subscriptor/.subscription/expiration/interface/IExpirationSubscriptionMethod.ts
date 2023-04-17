
/**
 * Interfaz para expiration de Subscription. Extiende de la interfaz de PlanSubscription.
 * Tiene metodos extras al de planSubscription, registerAccess, isPlanExpired()..
 */
// export interface IExpirationSubscriptionMethod extends IExpirationPlanSubscriptionMethod{
//     isPlanExpired(): boolean;

//     isPlanActive(): boolean; 

//     getExpirationDate(): Date;

//     update(): void;  

//     registerAccess(): boolean;

//     cancelSubscription(): any; 
// }

/**
 * Interfaz para expiration de Subscription. Extiende de la interfaz de PlanSubscription.
 * Tiene metodos extras al de planSubscription, registerAccess, isPlanExpired()..
 */
export interface IExpirationSubscriptionMethod {
    isPlanExpired(): boolean;

    isPlanActive(): boolean; 

    getExpirationDate(): Date;

    update(): void;  

    registerAccess(): boolean;

    cancelSubscription(): any; 

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
    getPaymentExpiration(): Date | null; 


    /**
     * Retorna las notas de expiración. Los cambios realizados manualmente.
     */
    getNotes(): string[]; 

    // updateFromLastPayment(paymentExpired: Date): Date; 

    updateNewExpirationDate(motivoCambio: string, newExpirationDate: Date): Date 

    
}