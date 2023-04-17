import { Component, OnInit } from '@angular/core';
import { Helper } from 'src/app/core/services/helper/Helper';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { SUBSCRIPTOR_1_DEFAULT } from 'src/app/modules/data/mockData/subscriptor/SubscriptorDefaultData';
import { IPlanExpirationType } from 'src/app/modules/Models/PlanSubscription/interfaces/IPlanExpirationType';
import { ICondition } from 'src/app/modules/Models/Subscriptor/.subscription/interface/IConditions';
import { ISubscriptionStatus } from 'src/app/modules/Models/Subscriptor/.subscription/interface/ISubscriptionStatus';
import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';
import { ViewSubscriptorService } from '../services/view-subscriptor.service';

class VisualSubPlanSubscription {
  name: string;
  amount: number;
  status: ISubscriptionStatus;
  paymentExpirationDate: Date | null | any;
  condition: ICondition;
  message: string;
  planExpirationType: IPlanExpirationType;
  constructor(subscriptor: Subscriptor) {
    this.name = subscriptor.getPlanSubscription().nombre;
    this.amount = subscriptor.getPlanSubscription().monto;
    this.status = subscriptor.getStatus();
    this.paymentExpirationDate = subscriptor
      .getPlanSubscription()
      .getPaymentExpiration()
      ? subscriptor.getPlanSubscription().getPaymentExpiration()
      : 'PROBLEMA';
    this.condition = subscriptor.getCondition();
    this.message = subscriptor.getStatusObject().message;
    this.planExpirationType = subscriptor
      .getPlanSubscription()
      .getPlanExpirationType();
    // this.getPlanType(subscriptor.getPlanSubscription());
  }

  getPaymentExpirationParsed() {
    if (this.paymentExpirationDate) {
      return Helper.ParseDate(this.paymentExpirationDate);
    } else {
      return 'Sin fecha.';
    }
  }

  // getPlanType(plan: PlanSubscription) {
  //   if (plan.expiracion instanceof CalendarExpirationMethod) {
  //     this.planExpirationType = 'Tiempo';
  //   } else {
  //     this.planExpirationMethod = 'Cantidad / Usos ';
  //   }
  // }
}
@Component({
  selector: 'app-view-sub-plan-subscription',
  templateUrl: './view-sub-plan-subscription.component.html',
  styleUrls: ['./view-sub-plan-subscription.component.css'],
})
export class ViewSubPlanSubscriptionComponent implements OnInit {
  public isLoading: boolean = true;
  public suscriptor!: Subscriptor;

  plan: VisualSubPlanSubscription = new VisualSubPlanSubscription(
    SUBSCRIPTOR_1_DEFAULT
  );

  constructor(
    private _customLogger: MyCustomLogger,
    private _subscriptorViewService: ViewSubscriptorService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.isLoading = false;
  }
  /**
   * Recibir la informacion y recorrer.
   */
  getData() {
    try {
      const subscriptor = this._subscriptorViewService.getSubscriptor();
      this.plan = new VisualSubPlanSubscription(subscriptor);
      this.suscriptor = subscriptor;

      this._customLogger.logInfo(
        'Subscriptor-plan',
        '',
        JSON.stringify(subscriptor, null, 2)
      );
    } catch (error) {
      this._customLogger.logError(
        'ViewSubPlanSubscriptionComponent, getData',
        error
      );
    }
  }

  getStatusSubscription() {
    try {
      return this.suscriptor.getStatus();
    } catch (error) {
      this._customLogger.logError(
        'ViewSubPlanSubscriptionComponent',
        error,
        'GetStatusSUbscription()'
      );
      throw new Error(`${error}`);
    }
  }

  getCondition() {
    return this.suscriptor.getCondition();
  }

  getStatusMessage() {
    return this.suscriptor.getConditionStatusMessage();
  }

  getColor() {
    return this.suscriptor.getStatusObject().color;
  }

  getAmountUsesToExpired() {
    return this.suscriptor.getAmountUsesExpiration();
  }
}
