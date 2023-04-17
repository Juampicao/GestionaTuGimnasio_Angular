import { Injectable } from '@angular/core';
import { PropsSelectServiceInjector } from 'src/app/modules/Models/Payment/ServiceInjectorPayment';
import { StatusManager2Service } from '../2/status-manager2.service';

@Injectable({
  providedIn: 'root',
})
export class StatusManagerInjectorService {
  private static _service: StatusManager2Service;

  /**
   * Seleccione el servicio de gestión de estado adecuado según el entorno.
   * Si no se proporciona un tipo de servicio, se usará el servicio original.
   * @param type string
   * @returns IStatusManagerService
   */
  static selectService(
    service: PropsSelectServiceInjector['type'] = 'original'
  ): StatusManager2Service {
    if (service === 'original') {
      if (!this._service) {
        this._service = new StatusManager2Service();
      }
      return this._service;
    } else if (service === 'mock') {
      if (!this._service) {
        this._service = new StatusManager2Service();
      }
      return this._service;
    } else {
      return new StatusManager2Service();
    }
  }
}
