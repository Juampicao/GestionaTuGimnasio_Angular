// import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
// import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';

// @Component({
//   selector: 'app-my-delete',
//   templateUrl: './my-delete.component.html',
//   styleUrls: ['./my-delete.component.css'],
// })
// export class MyDeleteComponent implements OnInit {
//   message: string;

//   @Output() onDeleted: EventEmitter<string> = new EventEmitter<string>();
//   @Output() onError: EventEmitter<string> = new EventEmitter<string>();

//   constructor(
//     @Inject(MAT_DIALOG_DATA)
//     public data: any = '',
//     private _customLogger: MyCustomLogger,
//     private _clientNotificacion: MyClientNotificationService,
//     public _dialog: MatDialogRef<MyDeleteComponent>
//   ) {
//     this.message = data;
//     this._customLogger.logDebug(
//       'MyDeleteComponent, onInit',
//       'data:',
//       this.data
//     );
//   }
//   ngOnInit(): void { }

// }

import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';

@Component({
  selector: 'app-my-delete',
  templateUrl: './my-delete.component.html',
  styleUrls: ['./my-delete.component.css'],
})
export class MyDeleteComponent implements OnInit {
  message: string;

  @Output() onDeleted: EventEmitter<string> = new EventEmitter<string>();
  @Output() onError: EventEmitter<string> = new EventEmitter<string>();
  @Output() elementDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any = '',
    private _customLogger: MyCustomLogger,
    private _clientNotificacion: MyClientNotificationService,
    public _dialog: MatDialogRef<MyDeleteComponent>
  ) {
    this.message = data;
    this._customLogger.logDebug(
      'MyDeleteComponent, onInit',
      'data:',
      this.data
    );
  }

  ngOnInit(): void {}

  // onDelete(): void {
  //   try {
  //     // Lógica de eliminar el elemento
  //     this._clientNotificacion.openNotification(
  //       'Eliminado correctamente!',
  //       'success'
  //     );
  //     // Emitimos el evento de eliminación exitosa
  //     this.elementDeleted.emit(true);
  //   } catch (error) {
  //     this._clientNotificacion.openNotification('Error al eliminar', 'error');
  //   }
  // }
}
