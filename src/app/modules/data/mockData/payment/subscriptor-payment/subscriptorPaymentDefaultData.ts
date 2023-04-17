import { IPaymentStatus } from 'src/app/modules/Models/Payment/interfaces/Interfaces';
import { SubscriptionSubscriptorPayment } from 'src/app/modules/Models/Payment/models/SubscriptionSubscriptorPayment';
import { CashMethod } from 'src/app/modules/Models/Payment/paymentMethods/CashMethod';
import { PAYMENT_METHOD_BANK_CIUDAD } from 'src/app/modules/Models/ValoresDefault2';
import {
  PLAN_SUBSCRIPTION_TIME_DEFAULT_1,
  PLAN_SUBSCRIPTION_TIME_DEFAULT_2,
} from '../../plan-subscription/PlanSubscriptionDefaultData';
import { USER_1_DEFAULT } from '../../rutina/RutineDefaultData';
import {
  SUBSCRIPTOR_1_DEFAULT,
  SUBSCRIPTOR_2_DEFAULT,
  SUBSCRIPTOR_3_DEFAULT,
} from '../../subscriptor/SubscriptorDefaultData';

export const SUBSCRIPTOR_PAYMENT_DEFAULT_1 = new SubscriptionSubscriptorPayment(
  IPaymentStatus.COMPLETADO,
  PLAN_SUBSCRIPTION_TIME_DEFAULT_1.monto,
  new Date(),
  SUBSCRIPTOR_1_DEFAULT,
  new Date(),
  PLAN_SUBSCRIPTION_TIME_DEFAULT_1,
  USER_1_DEFAULT,
  new Date()
);

SUBSCRIPTOR_PAYMENT_DEFAULT_1.fechaPago = new Date();
SUBSCRIPTOR_PAYMENT_DEFAULT_1.metodoPago = new CashMethod('19292482');

export const SUBSCRIPTOR_PAYMENT_DEFAULT_2 = new SubscriptionSubscriptorPayment(
  IPaymentStatus.PENDIENTE,
  PLAN_SUBSCRIPTION_TIME_DEFAULT_1.monto,
  new Date(),
  SUBSCRIPTOR_2_DEFAULT,
  new Date(),
  PLAN_SUBSCRIPTION_TIME_DEFAULT_1,
  USER_1_DEFAULT,
  new Date()
);

SUBSCRIPTOR_PAYMENT_DEFAULT_2.fechaPago = new Date();
SUBSCRIPTOR_PAYMENT_DEFAULT_2.metodoPago = PAYMENT_METHOD_BANK_CIUDAD;

export const SUBSCRIPTOR_PAYMENT_DEFAULT_3 = new SubscriptionSubscriptorPayment(
  IPaymentStatus.PENDIENTE,
  PLAN_SUBSCRIPTION_TIME_DEFAULT_2.monto,
  new Date(),
  SUBSCRIPTOR_3_DEFAULT,
  new Date(),
  PLAN_SUBSCRIPTION_TIME_DEFAULT_2,
  USER_1_DEFAULT,
  new Date()
);

// SUBSCRIPTOR_PAYMENT_DEFAULT_3.fechaPago = new Date();
// SUBSCRIPTOR_PAYMENT_DEFAULT_3.metodoPago = PAYMENT_METHOD_BANK_CIUDAD;
