import { ISubscriptionStatus } from 'src/app/modules/Models/Subscriptor/.subscription/interface/ISubscriptionStatus';
import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';
import {
  PERSONAL_INFORMATION_1,
  PERSONAL_INFORMATION_2,
  PERSONAL_INFORMATION_3,
  PERSONAL_INFORMATION_4,
} from '../personal-information/PersonalInformationDefaultData';
import { RUTINA_DEFAULT } from '../rutina/RutineDefaultData';
import {
  SUBSCRIPTION_AMOUNT_DEFAULT_4,
  SUBSCRIPTION_TIME_DEFAULT_1,
  SUBSCRIPTION_TIME_DEFAULT_2,
  SUBSCRIPTION_TIME_DEFAULT_3,
} from '../subscription/SubscriptionDefaultData';

export const SUBSCRIPTOR_1_DEFAULT = new Subscriptor(
  PERSONAL_INFORMATION_1,
  SUBSCRIPTION_TIME_DEFAULT_1,
  RUTINA_DEFAULT,
  '11111'
);

SUBSCRIPTOR_1_DEFAULT.updateStatusManual(ISubscriptionStatus.ACTIVO);

export const SUBSCRIPTOR_2_DEFAULT = new Subscriptor(
  PERSONAL_INFORMATION_2,
  SUBSCRIPTION_TIME_DEFAULT_2,
  RUTINA_DEFAULT,
  '11111'
);
SUBSCRIPTOR_2_DEFAULT.updateStatusManual(ISubscriptionStatus.DEUDA3);

export const SUBSCRIPTOR_3_DEFAULT = new Subscriptor(
  PERSONAL_INFORMATION_3,
  SUBSCRIPTION_TIME_DEFAULT_3,
  RUTINA_DEFAULT,
  '11111'
);

SUBSCRIPTOR_3_DEFAULT.updateStatusManual(ISubscriptionStatus.MOROSO1);

export const SUBSCRIPTOR_4_AMOUNT_DEFAULT = new Subscriptor(
  PERSONAL_INFORMATION_4,
  SUBSCRIPTION_AMOUNT_DEFAULT_4,
  RUTINA_DEFAULT,
  '11111'
);

SUBSCRIPTOR_4_AMOUNT_DEFAULT.updateStatusManual(ISubscriptionStatus.ACTIVO);
