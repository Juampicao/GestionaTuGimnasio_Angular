import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';
import { SubscriptorManagerService } from '../../services/subscriptor-manager/subscriptor-manager.service';
import { ViewSubscriptorService } from './services/view-subscriptor.service';
import { ViewSubPaymentsComponent } from './view-sub-payments/view-sub-payments.component';
import { ViewSubPersonalInformationComponent } from './view-sub-personal-information/view-sub-personal-information.component';
import { ViewSubPlanSubscriptionComponent } from './view-sub-plan-subscription/view-sub-plan-subscription.component';
import { ViewSubRegisterAccessComponent } from './view-sub-register-access/view-sub-register-access.component';

@Component({
  selector: 'app-view-subscriptor',
  templateUrl: './view-subscriptor.component.html',
  styleUrls: ['./view-subscriptor.component.css'],
})
export class ViewSubscriptorComponent implements OnInit {
  isLoading: boolean = true;
  idParam: any;

  tabList = [
    {
      title: 'Informacion Personal',
      explanation: ViewSubPersonalInformationComponent,
      icon: 'person',
    },
    {
      title: 'Plan Suscripto',
      explanation: ViewSubPlanSubscriptionComponent,
      icon: 'assignment',
      active: false,
    },
    {
      title: 'Historial Pagos',
      explanation: ViewSubPaymentsComponent,
      icon: 'payment',
    },
    {
      title: 'Registro Accesos',
      explanation: ViewSubRegisterAccessComponent,
      icon: 'history',
    },
  ];

  constructor(
    private _route: ActivatedRoute,
    private _customLogger: MyCustomLogger,
    private _subscriptorManagerService: SubscriptorManagerService,
    private _subscriptorViewService: ViewSubscriptorService
  ) {}

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
      this._subscriptorManagerService
        .getSubscriptorById(this.idParam)
        .subscribe((subscriptor: Subscriptor) => {
          this._customLogger.logInfo(
            'View-Subscriptor',
            'getSubscriptorById',
            subscriptor
          );
          this._subscriptorViewService.setSubscriptor(subscriptor);
        });
    } catch (error) {
      this._customLogger.logError('SubscriptorList, getData', error);
    }
  }
}
