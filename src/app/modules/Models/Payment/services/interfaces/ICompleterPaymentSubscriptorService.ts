import { IPaymentMethod } from "../../interfaces/IPaymentMethods";
import { ProductSubscriptorPayment } from "../../models/ProductSubscriptorPayment";
import { RegistrationSubscriptorPayment } from "../../models/RegistrationSubscriptorPayment";
import { SubscriptionSubscriptorPayment } from "../../models/SubscriptionSubscriptorPayment";

export interface ICompleterPaymentSubscriptorService{
    
    /**
     * Cobrar y pasar a estado completado. Completar el pago que se creo previamente por parte de un subscriptor.
     * @param pago : SubscriptionSubscriptorPayment
     * @param metodoPago: IPaymentMethod
     * @param fechaPago : fechaPago: Date
     * @returns SubscriptionSubscriptorPayment.
     */
    CompletePaymentSubscription(pago: SubscriptionSubscriptorPayment, metodoPago: IPaymentMethod, fechaPago: Date): SubscriptionSubscriptorPayment;

    
    /**
    * Cobrar y pasar a estado completado el pago de producto por parte de un subscriptor
    * @returns ProductSubscriptorPayment
    */
    CompletePaymentProductSubscriptor(): ProductSubscriptorPayment;

    /**
    * Cobrar y pasar a estado completado la matricula por  parte de un subscriptor
    * @returns RegistrationSubscriptorPayment
    */
    CompletePaymentRegistrationSubscriptor(): RegistrationSubscriptorPayment;

}