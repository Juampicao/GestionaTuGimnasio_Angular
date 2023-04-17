import { Helper } from 'src/app/core/services/helper/Helper';
import { ICalendarTypes } from 'src/app/modules/Models/PlanSubscription/interfaces/ICalendarTypes';
import { AmountUsesExpirationMethod } from 'src/app/modules/Models/PlanSubscription/models/AmountUsesExpirationMethod';
import { CalendarExpirationMethod } from 'src/app/modules/Models/PlanSubscription/models/CalendarExpirationMethod';
import { PlanSubscription } from 'src/app/modules/Models/PlanSubscription/models/PlanSubscription';

export class PlanSubscriptionListVisual {
  public monto: number;
  public nombre: string;
  public expirationDate: Date | any;
  public paymentExpirationDate: Date | any;
  public id: any;
  public recurrencia: ICalendarTypes | null | string;
  public cantidad: any;
  constructor(private plan: PlanSubscription) {
    this.monto = plan.monto;
    this.nombre = plan.nombre;
    this.expirationDate = this.expirationDateParse(plan.getExpirationDate());
    this.paymentExpirationDate = this.expirationDateParse(
      plan.getPaymentExpiration()
    );
    this.id = plan.id;
    if (plan.expiracion instanceof CalendarExpirationMethod) {
      this.recurrencia = plan.expiracion.expiredTime;
    } else {
      this.recurrencia = 'No tiene';
    }
    this.cantidad = this.setCantidad(plan);
  }

  private expirationDateParse(date: any): any {
    return Helper.ParseDate(date);
  }

  setCantidad(plan: PlanSubscription): any {
    if (plan.expiracion instanceof AmountUsesExpirationMethod) {
      return plan.getExpirationAmount();
    } else {
      return 'Ilimitado';
    }
  }
}
