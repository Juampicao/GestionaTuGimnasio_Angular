import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MyClientNotificationService } from '../client-notificacion/my-client-notification.service';

@Injectable({
  providedIn: 'root',
})
export class MyDeleterNotificationService {
  private deletedSource = new Subject<number>();
  entityDeleted$ = this.deletedSource.asObservable();

  constructor(private _clientNotificacion: MyClientNotificationService) {}

  success(id: any) {
    // this.deletedSource.next(id);
    this._clientNotificacion.openNotification(
      'Eliminado correctamente!',
      'success'
    );
  }

  error(id: any) {
    this._clientNotificacion.openNotification('Error al eliminar!', 'error');
  }

  getDeleted() {
    return this.deletedSource;
  }
}
