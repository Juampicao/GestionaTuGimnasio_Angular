import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MyErrorAlertComponent } from '../../modules/error-alert/my-error-alert.component';
import {
  INotificationType,
  MySnackBarComponent,
} from '../../modules/snackbar/my-snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class MyClientNotificationService {
  // Cambiar posición del snackBar
  private horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _notification: MatSnackBar, private _dialog: MatDialog) {}

  /**
   * Show alert dialog on client side.
   * @param component Where is activated this function.
   */
  openAlert(message: string, component?: string) {
    this._dialog.open(MyErrorAlertComponent, {
      data: `Hubo un error en ${component}. Mensaje: ${message} `,
    });
  }

  /**
   * @param message
   * @param type INotificationType["type"]
   */
  openNotification(message: string, type: INotificationType['type']) {
    this._notification.openFromComponent(MySnackBarComponent, {
      data: {
        message,
        type,
      },
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  functionNotImplemented() {
    this._notification.openFromComponent(MySnackBarComponent, {
      data: {
        message: 'Función no implementada',
        type: 'info',
      },
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
