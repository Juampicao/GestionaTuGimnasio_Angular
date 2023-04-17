import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { SubscriptionSubscriptorPayment } from 'src/app/modules/Models/Payment/models/SubscriptionSubscriptorPayment';
import { PaymentManagerService } from '../../services/payment-manager/payment-manager.service';
import { PaymentVisual } from '../payment-list/model/PaymentVisual';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.css'],
})
export class ViewPaymentComponent implements OnInit {
  isLoading: boolean = true;
  idParam: any;
  public message: string = '';
  public paymentVisual!: PaymentVisual;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any = '',
    private _customLogger: MyCustomLogger,
    public _dialog: MatDialogRef<ViewPaymentComponent>,
    private _route: ActivatedRoute,
    private _paymentManagerService: PaymentManagerService
  ) {
    this.message = data;
    this._customLogger.logDebug(
      'ViewPaymentComponent, onInit',
      'data:',
      this.data
    );
  }
  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    this.idParam = id;
    this._customLogger.logDebug('viewSubscriptorComponent', 'id Param:', id);

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
      this._paymentManagerService
        .getPaymentById(this.idParam)
        .subscribe((payment: SubscriptionSubscriptorPayment) => {
          this._customLogger.logInfo(
            'View-Subscriptor',
            'getSubscriptorById',
            payment
          );

          this.paymentVisual = new PaymentVisual(payment);
          this.message = JSON.stringify(this.paymentVisual, null, 2);
        });
    } catch (error) {
      this._customLogger.logError('SubscriptorList, getData', error);
    }
  }
}
