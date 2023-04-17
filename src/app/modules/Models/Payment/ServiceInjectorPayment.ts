import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { IPaymentManagerService } from '../../components/Payments/services/payment-manager/interface/IPaymentManagerService';
import { PaymentManagerService } from '../../components/Payments/services/payment-manager/payment-manager.service';
import { Payment } from './models/Payment';

export interface PropsSelectServiceInjector {
  type: 'original' | 'mock';
}

export interface PropsSelectDatabaseInjector {
  type: 'objetos' | 'json';
}

export class ServiceInjectorPayment {
  private static _service: IPaymentManagerService;
  private static _paymentList: Payment[] = [];

  /**
   * Funcion interna de testing: Levanto una instancia. Inyeccion de dependencias.
   * @returns service
   * @param service: PropsSelectServiceInjector = "original" || "mock"
   */
  static selectService(
    service: PropsSelectServiceInjector['type'] = 'original'
  ): IPaymentManagerService {
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

// Todo deberia usar el paymentManager para facilitar los filtros, que ya lo creamos..
