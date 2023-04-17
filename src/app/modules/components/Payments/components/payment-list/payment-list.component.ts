import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { MyDeleterNotificationService } from 'src/app/core/services/deleleter-service/MyDeleterNotificationService';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { IPaymentStatus } from 'src/app/modules/Models/Payment/interfaces/Interfaces';
import { Payment } from 'src/app/modules/Models/Payment/models/Payment';
import { SubscriptionSubscriptorPayment } from 'src/app/modules/Models/Payment/models/SubscriptionSubscriptorPayment';
import { PaymentFilter } from 'src/app/modules/Models/Payment/paymentFilter/PaymentFilter';
import { SubscriptorManagerService } from 'src/app/modules/Subscriptors/services/subscriptor-manager/subscriptor-manager.service';
import { PaymentManagerService } from '../../services/payment-manager/payment-manager.service';
import { PaymentVisual } from './model/PaymentVisual';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
})
export class PaymentListComponent implements OnInit {
  public isLoading: boolean = true;

  headArrayPayments = [
    { Head: 'Estado', FieldName: 'estado' },
    // { Head: 'Id', FieldName: 'id' },
    { Head: 'Monto', FieldName: 'monto' },
    { Head: 'Pagador', FieldName: 'pagadorNombre' },
    { Head: 'Aclaracion', FieldName: 'tipoPago' },
    { Head: 'Metodo', FieldName: 'metodoPago' },
    { Head: 'Fecha Pago', FieldName: 'fechaPagoParsed' },
    { Head: 'Plan', FieldName: 'planSuscripcionName' },
    { Head: 'ID', FieldName: 'id' },
    { Head: 'Action', FieldName: '' }, // Activando esta fila aparecen las funciones.
  ];

  paymentsList: any[] = [
    // {
    //   estado: IPaymentStatus.COMPLETADO,
    //   monto: 5960,
    //   pagador: 'juan',
    //   tipoPago: 'suscripcion',
    //   fechaPago: Helper.ParseDate(new Date()),
    //   planSuscripcion: 'Plan Premium',
    // },
  ];

  paymentListPending: any = [];

  constructor(
    private _customLogger: MyCustomLogger,
    private _router: Router,
    private _dialog: MatDialog,
    private _clientNotificacion: MyClientNotificationService,
    private _subscriptorManagerService: SubscriptorManagerService,
    private _paymentManagerService: PaymentManagerService,
    private _deleteNotificationService: MyDeleterNotificationService
  ) {}

  ngOnInit(): void {
    try {
      this.getAllPayments();
      this.getPendingPayments();
      this.isLoading = false;
    } catch (error) {
      this._customLogger.logError('Payment-List, getData()', error);
      this._clientNotificacion.openNotification(
        'Cargar la lista de pagos',
        'error'
      );
      throw new Error(`${error}`);
    }
  }

  getAllPayments() {
    try {
      let filter = new PaymentFilter();
      filter.estado = IPaymentStatus.COMPLETADO;
      let result = this._paymentManagerService
        .getPaymentsByFilter(filter)
        .pipe(
          map((data: Payment[]) => {
            this._customLogger.logInfo(
              'PaymentListComponent',
              'getAllPayments()',
              data
            );
            this.paymentsList = data.map((payment: Payment) => {
              return new PaymentVisual(payment);
            });
          })
        )
        .subscribe((error) => {
          this._customLogger.logError('PaymentList, getData', error);
        });

      this._customLogger.logInfo('get paymentByFilter', '', result);
    } catch (error) {
      this._customLogger.logError('PaymentList, getData', error);
      this._clientNotificacion.openNotification(
        'Cargar lista de pagos',
        'error'
      );
    }
  }

  getPendingPayments() {
    try {
      let filter = new PaymentFilter();
      filter.estado = IPaymentStatus.PENDIENTE;
      let result = this._paymentManagerService
        .getPaymentsByFilter(filter)
        .pipe(
          map((data: Payment[]) => {
            this._customLogger.logInfo(
              'PaymentListComponent',
              'getPendingPayments()',
              data
            );

            this.paymentListPending = data.map((payment: Payment) => {
              return new PaymentVisual(payment);
            });
          })
        )
        .subscribe((error) => {
          this._customLogger.logError('PaymentList, getData', error);
        });

      this._customLogger.logInfo('get paymentByFilter', '', result);
    } catch (error) {
      this._customLogger.logError('PaymentList, getData', error);
      this._clientNotificacion.openNotification(
        'Cargar lista de pagos pendientes',
        'error'
      );
    }
  }

  // - - - - - - - - - - - Functions Client
  onViewPayment(payment: SubscriptionSubscriptorPayment) {
    // this._dialog.open(ViewPaymentComponent, {
    //   data: `${JSON.stringify(event)}`,
    // });
    this._router.navigate(['pagos/' + payment.id]);
  }

  onEditPayment(event: Event) {
    this._clientNotificacion.functionNotImplemented();
  }

  onDeletePayment(event: Event) {
    this._clientNotificacion.functionNotImplemented();
  }
}

//! VIejo getData().

// /**
//    * Recibir la informacion y recorrer.
//    */
//   getData() {
//     try {
//       this._paymentManagerService
//         .getAllPayments()
//         .pipe(
//           map((data: SubscriptionSubscriptorPayment[]) => {
//             this._customLogger.logInfo(
//               'PaymentListComponent',
//               'getAllPayments()',
//               data
//             );

//             return data.map((payment: SubscriptionSubscriptorPayment) => ({
//               estado: payment.estado,
//               monto: payment.monto,
//               pagador: payment.pagador.personalInformation.name,
//               tipoPago: payment.tipoPago,
//               metodoPago: payment.metodoPago?.paymentMethodType,
//               fechaPago: payment.fechaPago,
//               planSuscripcion: payment.planSubscription.nombre,
//               id: payment.id,
//             }));
//           })
//         )
//         .subscribe(
//           (data) => {
//             this.paymentsList = this._createPaymentList(data);
//             // this.searchOptions = this._createSearchBarList(data);
//           },
//           (error) => {
//             this._customLogger.logError('PaymentList, getData', error);
//           }
//         );
//     } catch (error) {
//       this._customLogger.logError('PaymentList, getData', error);
//       this._clientNotificacion.openNotification(
//         'Cargar lista de pagos',
//         'error'
//       );
//     }
//   }

//! Viejo Create List
// /**
//  *
//  * @param data
//  * @returns Array de SubscriptorList con la data lista para mostrar. SubscriptorList[]
//  */
// private _createPaymentList(data: any[]): PaymentVisual[] {
//   try {
//     return data.map(
//       (item) =>
//         new PaymentVisual(
//           item.estado,
//           item.monto,
//           item.pagador,
//           item.tipoPago,
//           item.metodoPago,
//           // Helper.ParseDate(item.fechaPago), // Todo probar ponerla mal para que tire un error. Notificacion
//           item.fechaPago,
//           item.planSuscripcion,
//           item.id
//         )
//     );
//   } catch (error) {
//     throw new Error(`${error}`);
//   }
// }
