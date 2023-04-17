import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap, throwError } from 'rxjs';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import {
  PLAN_SUBSCRIPTION_AMOUNT_DEFAULT_3,
  PLAN_SUBSCRIPTION_TIME_DEFAULT_1,
  PLAN_SUBSCRIPTION_TIME_DEFAULT_2,
} from 'src/app/modules/data/mockData/plan-subscription/PlanSubscriptionDefaultData';
import { IPlanExpirationType } from 'src/app/modules/Models/PlanSubscription/interfaces/IPlanExpirationType';
import { AmountUsesExpirationMethod } from 'src/app/modules/Models/PlanSubscription/models/AmountUsesExpirationMethod';
import { CalendarExpirationMethod } from 'src/app/modules/Models/PlanSubscription/models/CalendarExpirationMethod';
import { PlanSubscription } from 'src/app/modules/Models/PlanSubscription/models/PlanSubscription';
import { PlanSubscriptionFormValues } from '../../../Dashboard/components/forms/form-create-plan-subscription/form-create-plan-subscription.component';

@Injectable({
  providedIn: 'root',
})
export class PlanSubscriptionManagerService {
  private _refreshData$ = new Subject<void>();

  private _planSubscriptionList: PlanSubscription[] = [
    PLAN_SUBSCRIPTION_TIME_DEFAULT_1,
    PLAN_SUBSCRIPTION_TIME_DEFAULT_2,
    PLAN_SUBSCRIPTION_AMOUNT_DEFAULT_3,
  ];

  constructor(private _customLogger: MyCustomLogger) {}

  get refreshData$() {
    return this._refreshData$;
  }

  getAllPlanSubscription(): Observable<PlanSubscription[]> {
    try {
      let response = this._planSubscriptionList.slice();

      return of(response).pipe(
        tap(() => {
          this.refreshData$.next();
        })
      );
    } catch (error) {
      this._customLogger.logError('PlanSubscriptionManagerService', error);
      throw new Error(`${error}`);
    }
  }

  getPlanSubscriptionById(id: any): Observable<PlanSubscription> {
    try {
      const planSubscription = this._planSubscriptionList.find(
        (p) => p.id === id
      );

      if (planSubscription) {
        return of(planSubscription);
      } else {
        return throwError(`No se encontró un plan con el id ${id}`);
      }
    } catch (error) {
      this._customLogger.logError(
        'PlanSubscriptionManagerService, getPlanSubscriptionById',
        error,
        `id: ${id}`
      );
      return throwError(`${error}`);
    }
  }

  getPlanSubscriptionByName(name: string): Observable<PlanSubscription> {
    try {
      const planSubscription = this._planSubscriptionList.find(
        (p) => p.nombre === name
      );

      if (planSubscription) {
        return of(planSubscription);
      } else {
        return throwError(`No se encontró un plan con el nombre: ${name}`);
      }
    } catch (error) {
      this._customLogger.logError(
        'PlanSubscriptionManagerService, getPlanSubscriptionById',
        error,
        `nombre: ${name}`
      );
      return throwError(`${error}`);
    }
  }

  createPlanSubscription(
    planSubscription: PlanSubscriptionFormValues
  ): Observable<PlanSubscription> {
    try {
      // 1° Distingo si es TIEMPO O CANTIDAD

      // 2° Creo el plan
      let newPlanSubscription;
      if (planSubscription.expiracion === IPlanExpirationType.TIME) {
        newPlanSubscription = new PlanSubscription(
          planSubscription.name,
          planSubscription.monto,
          new CalendarExpirationMethod(
            planSubscription.recurrencia,
            planSubscription.diasParaVencerPago,
            false
          )
        );
      }

      if (planSubscription.expiracion === IPlanExpirationType.AMOUNTUSES) {
        newPlanSubscription = new PlanSubscription(
          planSubscription.name,
          planSubscription.monto,
          new AmountUsesExpirationMethod(
            planSubscription.cantidadUsos ? planSubscription.cantidadUsos : 0,
            planSubscription.diasParaVencerPago,
            planSubscription.recurrencia
          )
        );
      }

      // 3° Agrego el nuevo pago a la lista.
      if (newPlanSubscription) {
        this._planSubscriptionList.push(newPlanSubscription);
        this._customLogger.logInfo(
          'CreatePlanSubscription',
          'Creado correctamente',
          newPlanSubscription
        );

        // 4° Retorno
        return of(newPlanSubscription).pipe(
          tap(() => {
            this.refreshData$.next();
          })
        );
      }

      throw new Error(
        `Hubo un error al crear el planSubscription ${newPlanSubscription}`
      );
    } catch (error) {
      this._customLogger.logError(
        'PlanSubscriptionManagerService, createPlanSubscription',
        error
      );
      return throwError(`${error}`);
    }
  }
}
