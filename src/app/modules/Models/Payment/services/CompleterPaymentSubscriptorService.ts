import { IPaymentStatus } from "../interfaces/Interfaces";
import { IPaymentMethod } from "../interfaces/IPaymentMethods";
import { ProductSubscriptorPayment } from "../models/ProductSubscriptorPayment";
import { RegistrationSubscriptorPayment } from "../models/RegistrationSubscriptorPayment";
import { SubscriptionSubscriptorPayment } from "../models/SubscriptionSubscriptorPayment";
import { ICompleterPaymentSubscriptorService } from "./interfaces/ICompleterPaymentSubscriptorService";

export class CompleterPaymentSubscriptorService implements ICompleterPaymentSubscriptorService{

    CompletePaymentSubscription(pago: SubscriptionSubscriptorPayment,  metodoPago: IPaymentMethod, fechaPago: Date = new Date()): SubscriptionSubscriptorPayment {
       
        pago.estado = IPaymentStatus.COMPLETADO;
        pago.fechaPago = fechaPago; 
        pago.metodoPago = metodoPago; 
        
        return pago; 
    }
    
    CompletePaymentProductSubscriptor(): ProductSubscriptorPayment {
        throw new Error("Method not implemented.");
    }
    CompletePaymentRegistrationSubscriptor(): RegistrationSubscriptorPayment {
        throw new Error("Method not implemented.");
    }
    


}