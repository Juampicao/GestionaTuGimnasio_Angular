import { Injectable } from '@angular/core';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { PaymentManagerService } from '../../components/Payments/services/payment-manager/payment-manager.service';
import { Payment } from './models/Payment';

export interface PropsSelectServiceInjector {
  type: 'original' | 'mock';
}

export interface PropsSelectDatabaseInjector {
  type: 'objetos' | 'json';
}

@Injectable({
  providedIn: 'root',
})
export class InjectorPaymentService {
  private static _service: PaymentManagerService;
  private static _paymentList: Payment[] = [];

  /**
   * Funcion interna de testing: Levanto una instancia. Inyeccion de dependencias.
   * @returns service
   * @param service: PropsSelectServiceInjector = "original" || "mock"
   */
  static selectService(
    service: PropsSelectServiceInjector['type'] = 'original'
  ): PaymentManagerService {
    if (service === 'original') {
      return new PaymentManagerService(new MyCustomLogger());
    } else if (service === 'mock') {
      if (!this._service) {
        this._service = new PaymentManagerService(new MyCustomLogger());
      }

      return this._service;
    } else {
      return new PaymentManagerService(new MyCustomLogger());
    }
  }
}
