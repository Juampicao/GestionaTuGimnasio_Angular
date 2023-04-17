import { Helper } from 'src/app/core/services/helper/Helper';
import {
  IBankOptions,
  IPaymentStatus,
  IPaymentTypes
} from './Payment/interfaces/Interfaces';
import { Payment } from './Payment/models/Payment';
import { Bank } from './Payment/paymentMethods/Bank';
import { BankTransfer } from './Payment/paymentMethods/BankTransfer';
import { ICalendarTypes } from './PlanSubscription/interfaces/ICalendarTypes';
import { AmountUsesExpirationMethod } from './PlanSubscription/models/AmountUsesExpirationMethod';
import { CalendarExpirationMethod } from './PlanSubscription/models/CalendarExpirationMethod';
import { PlanSubscription } from './PlanSubscription/models/PlanSubscription';
import { Product } from './Product/model/Product';
import { Subscription } from './Subscriptor/.subscription/Subscription';
import { IUserRoles } from './User/interfaces/IUserRoles';
import { User } from './User/models/User';
import { UserInformation } from './User/models/UserInformation';

import { AmountUsesExpirationSubscription } from './Subscriptor/.subscription/expiration/model/AmountUsesExpirationSubscription';

import {
  PERSONAL_INFORMATION_1,
  PERSONAL_INFORMATION_2
} from '../data/mockData/personal-information/PersonalInformationDefaultData';
import { ProductSubscriptorPayment } from './Payment/models/ProductSubscriptorPayment';
import { SubscriptionSubscriptorPayment } from './Payment/models/SubscriptionSubscriptorPayment';
import { CompleterPaymentSubscriptorService } from './Payment/services/CompleterPaymentSubscriptorService';
import { CreatorPaymentSubscriptorService } from './Payment/services/CreatorPaymentSubscriptorService';
import { Subscriptor } from './Subscriptor/model/Subscriptor';

import { RUTINA_DEFAULT } from '../data/mockData/rutina/RutineDefaultData';
import { CalendarExpirationSubscription } from './Subscriptor/.subscription/expiration/model/CalendarExpirationSubscription';

// - - - - - - - - - - - User - - - - - - - - - - - -
export const USER_INFORMATION_1 = new UserInformation('Dueño Juan 1 ');
export const USER_INFORMATION_2 = new UserInformation('Dueño Pedro 2');

export const USER_1_DEFAULT = new User(USER_INFORMATION_1, IUserRoles.OWNER);
export const USER_2_DEFAULT = new User(USER_INFORMATION_2, IUserRoles.OWNER);

// - - - - - - - - - - - Plan - - - - - - - - - - - -
export const AMOUNT_USES_METHOD_PLAN_DEFAULT = new AmountUsesExpirationMethod(
  10,
  0,
  ICalendarTypes.MENSUAL
);
export const CALENDAR_USES_METHOD_PLAN_DEFAULT = new CalendarExpirationMethod(
  ICalendarTypes.MENSUAL,
  0,
  false
);

export const PLAN_SUBSCRIPTION_AMOUNT_DEFAULT = new PlanSubscription(
  'black amount',
  10,
  AMOUNT_USES_METHOD_PLAN_DEFAULT
);
export const PLAN_SUBSCRIPTION_CALENDAR_DEFAULT = new PlanSubscription(
  'premium calendar',
  20,
  CALENDAR_USES_METHOD_PLAN_DEFAULT
);

// - - - - - - - - - - - Expiration Subscription - - - - - - - - - - - -
export const AMOUNT_USES_EXPIRATION_SUBSCRIPTION_DEFAULT =
  new AmountUsesExpirationSubscription(
    PLAN_SUBSCRIPTION_AMOUNT_DEFAULT,
    new Date()
  );
export const CALENDAR_EXPIRATION_SUBSCRIPTION_DEFAULT =
  new CalendarExpirationSubscription(
    PLAN_SUBSCRIPTION_CALENDAR_DEFAULT,
    new Date()
  );

// - - - - - - - - - - - Subscription - - - - - - - - - - - -
export const SUBSCRIPTION_CALENDAR_1 = new Subscription(
  PLAN_SUBSCRIPTION_CALENDAR_DEFAULT,
  CALENDAR_EXPIRATION_SUBSCRIPTION_DEFAULT
);

// - - - - - - - - - - - Subscriptor - - - - - - - - - - - -
export const INFO_PERSONAL_JUAN_1 = PERSONAL_INFORMATION_1;
export const SUBSCRIPTOR_JUAN_CALENDAR_1 = new Subscriptor(
  INFO_PERSONAL_JUAN_1,
  SUBSCRIPTION_CALENDAR_1,
  RUTINA_DEFAULT,
  USER_1_DEFAULT
);
export const SUBSCRIPTOR_JUAN_CALENDAR_DEFAULT = new Subscriptor(
  INFO_PERSONAL_JUAN_1,
  SUBSCRIPTION_CALENDAR_1,
  RUTINA_DEFAULT,
  USER_1_DEFAULT
);

export const INFO_PERSONAL_PEDRO_2 = PERSONAL_INFORMATION_2;
export const SUBSCRIPTOR_PEDRO_CALENDAR_2 = new Subscriptor(
  INFO_PERSONAL_PEDRO_2,
  SUBSCRIPTION_CALENDAR_1,
  RUTINA_DEFAULT,
  USER_1_DEFAULT
);
export const SUBSCRIPTOR_PEDRO_CALENDAR_DEFAULT2 = new Subscriptor(
  INFO_PERSONAL_PEDRO_2,
  SUBSCRIPTION_CALENDAR_1,
  RUTINA_DEFAULT,
  USER_1_DEFAULT
);

export const PRODUCTO_DEFAULT = new Product('BOTELLA NENES');

// - - - - - - - - - - - Metodos Pago - - - - - - - - - - - -
/**
 * Cuenta de banco donde se recibirán pagos. Es la propia de la empresa donde se registrá el balance de todas las transferencias enviadas aca.
 */
export const BANK_BBVA_TO_RECIEVE_TRANSFER = new Bank(
  IBankOptions.BBVA,
  1111111,
  'Cuenta Oficial Campitos'
);
/**
 * Ejemplo de transferencia del ciudad al BANK creado bbva "cuenta oficial campito".
 */
export const PAYMENT_METHOD_BANK_CIUDAD = new BankTransfer(
  '2929292',
  IBankOptions.CIUDAD,
  BANK_BBVA_TO_RECIEVE_TRANSFER
);

// //? - - - - - -  - - - - - PAGOS - - - - - - - - - - - -
export const PAYMENT_BASIC_DEFAULT = new Payment(
  IPaymentStatus.COMPLETADO,
  100,
  IPaymentTypes.OTRO,
  new Date(),
  USER_1_DEFAULT
);

// /**
//  * Pago suscripcion pendiente por parte de un subscriptor. Creado Manualmente.
//  * Pendiente, $100, Fecha creación hoy, newSubscriptionExpired: Primer dias mes siguiente.
//  */
export const SUBSCRIPTION_PAYMENT_MANUAL_1 = new SubscriptionSubscriptorPayment(
  IPaymentStatus.PENDIENTE,
  100,
  new Date(),
  SUBSCRIPTOR_JUAN_CALENDAR_1,
  SUBSCRIPTOR_JUAN_CALENDAR_1.getPlanSubscription().getPaymentExpiration(),
  PLAN_SUBSCRIPTION_CALENDAR_DEFAULT,
  USER_1_DEFAULT,
  Helper.getFirstDayOfNextMonth(new Date())
);

// /**
//  * Pago producto pendiente por parte de un subscriptor. Creado Manualmente.
//  * Pendiente, $100, Fecha creación hoy.
//  * Producto default (botella nenes).
//  */
export const PRODUCT_PAYMENT_MANUAL_1 = new ProductSubscriptorPayment(
  IPaymentStatus.PENDIENTE,
  100,
  new Date(),
  SUBSCRIPTOR_JUAN_CALENDAR_1,
  SUBSCRIPTOR_JUAN_CALENDAR_1.getPlanSubscription().getPaymentExpiration(),
  PRODUCTO_DEFAULT,
  USER_1_DEFAULT
);

// //? - - - - - -  - - - - - SERVICIO CREADOR DE PAGOS SUBSCRIPTION - - - - - - - - - - - -
export const CREATOR_PENDING_PAYMENT_SERVICE =
  new CreatorPaymentSubscriptorService();
export const COMPLETER_PAYMENT_SERVICE =
  new CompleterPaymentSubscriptorService();

/**
 * Pago pendiente creado por el servicio CreatorPaymentSubscriptorService
 */
export const PENDING_SUBSCRIPTION_PAYMENT_AUTO_1 =
  CREATOR_PENDING_PAYMENT_SERVICE.CreateNewPaymentSubscription(
    PLAN_SUBSCRIPTION_CALENDAR_DEFAULT,
    SUBSCRIPTOR_JUAN_CALENDAR_1,
    USER_1_DEFAULT,
    new Date()
  );

/**
 * Pago estado: Completado creado por el servicio CreatorPaymentSubscriptorService
 */
export const COMPLETE_SUBSCRIPTION_PAYMENT_AUTO_1 =
  COMPLETER_PAYMENT_SERVICE.CompletePaymentSubscription(
    PENDING_SUBSCRIPTION_PAYMENT_AUTO_1,
    PAYMENT_METHOD_BANK_CIUDAD,
    new Date()
  );

// - - - - -  FECHA CREACION - - - - - //

// Fecha creación por defecto
export const FECHA_CREACION_POR_DEFECTO: Date = new Date();

// Fecha creación máxima
export const FECHA_CREACION_MAX: Date = new Date('2040 01 01');

// Fecha creación mínima
export const FECHA_CREACION_MIN: Date = new Date('2000 01 01');

// Filtro para fechas de creación desde una fecha mínima
export const FECHA_CREACION_SINCE_FILTER_MIN: Date = new Date('2000 01 01');
export const FECHA_CREACION_SINCE_FILTER_MAX: Date = new Date('2040 01 01');
export const FECHA_CREACION_SINCE_FILTER_DEFAULT: Date =
  FECHA_CREACION_SINCE_FILTER_MIN;

// Filtro para fechas de creación hasta una fecha máxima
export const FECHA_CREACION_UNTIL_FILTER_MIN: Date = new Date('2000 01 01');
export const FECHA_CREACION_UNTIL_FILTER_MAX: Date = new Date('2040 01 01');
export const FECHA_CREACION_UNTIL_FILTER_DEFAULT: Date =
  FECHA_CREACION_UNTIL_FILTER_MAX;

// - - - - -  FECHA PAGO - - - - - //

// Fecha de pago por defecto
export const FECHA_PAGO_POR_DEFECTO: Date = new Date();

// Fecha de pago máxima
export const FECHA_PAGO_MAX: Date = new Date('2040 01 01');

// Fecha de pago mínima
export const FECHA_PAGO_MIN: Date = new Date('2000 01 01');

// Filtro para fechas de pago desde una fecha mínima
export const FECHA_PAGO_SINCE_FILTER_MIN: Date = new Date('2000 01 01');
export const FECHA_PAGO_SINCE_FILTER_MAX: Date = new Date('2040 01 01');
export const FECHA_PAGO_SINCE_FILTER_DEFAULT: Date =
  FECHA_PAGO_SINCE_FILTER_MIN;

// Filtro para fechas de pago hasta una fecha máxima
export const FECHA_PAGO_UNTIL_FILTER_MIN: Date = new Date('2000 01 01');
export const FECHA_PAGO_UNTIL_FILTER_MAX: Date = new Date('2040 01 01');
export const FECHA_PAGO_UNTIL_FILTER_DEFAULT: Date =
  FECHA_PAGO_UNTIL_FILTER_MAX;

// Monto máximo
export const MONTO_MAX: number = 100000;

// Monto mínimo
export const MONTO_MIN: number = 0;

// Filtro para montos desde un valor mínimo
export const MONTO_SINCE_FILTER_MIN: number = MONTO_MIN;
export const MONTO_SINCE_FILTER_MAX: number = MONTO_MAX;
export const MONTO_SINCE_FILTER_DEFAULT: number = MONTO_SINCE_FILTER_MIN;

// Filtro para montos hasta un valor máximo
export const MONTO_UNTIL_FILTER_MIN: number = MONTO_MIN;
export const MONTO_UNTIL_FILTER_MAX: number = MONTO_MAX;
export const MONTO_UNTIL_FILTER_DEFAULT: number = MONTO_UNTIL_FILTER_MAX;
