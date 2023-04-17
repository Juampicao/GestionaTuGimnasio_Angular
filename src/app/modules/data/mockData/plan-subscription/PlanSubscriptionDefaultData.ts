import { ICalendarTypes } from 'src/app/modules/Models/PlanSubscription/interfaces/ICalendarTypes';
import { AmountUsesExpirationMethod } from 'src/app/modules/Models/PlanSubscription/models/AmountUsesExpirationMethod';
import { CalendarExpirationMethod } from 'src/app/modules/Models/PlanSubscription/models/CalendarExpirationMethod';
import { PlanSubscription } from 'src/app/modules/Models/PlanSubscription/models/PlanSubscription';

// !- - - - - - - Expiration Method - - - - - -
// ? TIEMPO

export const EXPIRATION_METHOD_TIME_PLAN_SUBSCRIPTION_DEFAULT_1 =
  new CalendarExpirationMethod(ICalendarTypes.MENSUAL, 5, false);

export const EXPIRATION_METHOD_TIME_PLAN_SUBSCRIPTION_DEFAULT_2 =
  new CalendarExpirationMethod(ICalendarTypes.CATORCE, 5, false);

// ? CANTIDAD
export const EXPIRATION_METHOD_AMOUNT_PLAN_SUBSCRIPTION_DEFAULT_3 =
  new AmountUsesExpirationMethod(3, 10, ICalendarTypes.MENSUAL);

//! - - - - - - - Planes - - - - - -

export const PLAN_SUBSCRIPTION_TIME_DEFAULT_1 = new PlanSubscription(
  'Plan Premium',
  9999,
  EXPIRATION_METHOD_TIME_PLAN_SUBSCRIPTION_DEFAULT_1
);

export const PLAN_SUBSCRIPTION_TIME_DEFAULT_2 = new PlanSubscription(
  'Plan Gold',
  5960,
  EXPIRATION_METHOD_TIME_PLAN_SUBSCRIPTION_DEFAULT_2
);

export const PLAN_SUBSCRIPTION_AMOUNT_DEFAULT_3 = new PlanSubscription(
  'Plan Cantidad',
  8888,
  EXPIRATION_METHOD_AMOUNT_PLAN_SUBSCRIPTION_DEFAULT_3
);
