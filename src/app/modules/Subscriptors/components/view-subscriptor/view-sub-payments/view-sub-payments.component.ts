import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { PaymentVisual } from 'src/app/modules/components/Payments/components/payment-list/model/PaymentVisual';
import { PaymentManagerService } from 'src/app/modules/components/Payments/services/payment-manager/payment-manager.service';
import { SUBSCRIPTOR_1_DEFAULT } from 'src/app/modules/data/mockData/subscriptor/SubscriptorDefaultData';
import { Payment } from 'src/app/modules/Models/Payment/models/Payment';
import { PaymentFilter } from 'src/app/modules/Models/Payment/paymentFilter/PaymentFilter';
import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';
import { ViewSubscriptorService } from '../services/view-subscriptor.service';
import { PaymentVisualSubscriptor } from './model/PaymentVisualSubscriptor';

@Component({
  selector: 'app-view-sub-payments',
  templateUrl: './view-sub-payments.component.html',
  styleUrls: ['./view-sub-payments.component.css'],
})
export class ViewSubPaymentsComponent implements OnInit {
  // paymentVisual!: PaymentVisual; // !Dara error por que esta en payments
  paymentVisual!: PaymentVisualSubscriptor;
  subscriptor!: Subscriptor;
  isLoading: boolean = true;

  headArrayPayments = [
    { Head: 'Estado', FieldName: 'estado' },
    { Head: 'Id', FieldName: 'id' },
    { Head: 'Monto', FieldName: 'monto' },
    { Head: 'Pagador', FieldName: 'pagadorNombre' },
    { Head: 'Aclaracion', FieldName: 'tipoPago' },
    { Head: 'Metodo', FieldName: 'metodoPago' },
    { Head: 'Fecha Pago', FieldName: 'fechaPagoParsed' },
    { Head: 'Plan', FieldName: 'planSuscripcionName' },
    { Head: 'ID', FieldName: 'id' },
    { Head: 'Action', FieldName: '' }, // Activando esta fila aparecen las funciones.
  ];

  // Lista pagos.
  paymentsList: any[] = [];

  constructor(
    private _subscriptorViewService: ViewSubscriptorService,
    private _customLogger: MyCustomLogger,
    private _clientNotification: MyClientNotificationService,
    private _paymentManagerService: PaymentManagerService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    Promise.all([this.getSubscriptor(), this.getAllPayments()])
      .then(([subscriptorResult, paymentsResult]) => {
        // Aquí puede hacer algo con los resultados de las promesas
        // Por ejemplo:
        console.info('Subscriptor:', subscriptorResult);
        console.info('Payments:', paymentsResult);
      })
      .catch((error) => {
        // Manejo de errores
        console.error(error);
      });
  }

  ngAfterViewInit() {
    this.isLoading = false;
  }

  async getSubscriptor() {
    try {
      this.subscriptor = await this._subscriptorViewService.getSubscriptor();
    } catch (error) {
      this._customLogger.logError(
        'ViewSubPaymentsComponent, getSubscriptor',
        error
      );
      this._clientNotification.openNotification(
        `No se encuentra el suscriptor`,
        'error'
      );
      throw new Error(`${error}`);
    }
  }

  getAllPayments() {
    try {
      let filter = new PaymentFilter();
      filter.pagador = SUBSCRIPTOR_1_DEFAULT;
      // filter.pagador = this.subscriptor;
      // filter.fechaCreacionSince = new Date('2020 10 10');
      console.info('toString() => filter', filter.toString());
      this._paymentManagerService
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
    } catch (error) {
      this._customLogger.logError('PaymentList, getData', error);
      this._clientNotification.openNotification(
        'Cargar lista de pagos por suscriptor',
        'error'
      );
    }
  }

  // - - - - - - - - - - - Functions Client
  onViewPayment(payment: Payment) {
    this._router.navigate(['pagos/' + payment.id]);
  }
}
