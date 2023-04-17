import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ISelectOption } from 'src/app/core/modules/components/05-form-reutilizable/my-input/my-input.component';
import { MyConfirmComponent } from 'src/app/core/modules/components/11-confirm-reutilizable/my-confirm/my-confirm.component';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import {
  Helper,
  IInputNumberValidator,
} from 'src/app/core/services/helper/Helper';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { PlanSubscriptionManagerService } from 'src/app/modules/components/Payments/services/plan-subscription-manager/plan-subscription-manager.service';
import { ICalendarTypes } from 'src/app/modules/Models/PlanSubscription/interfaces/ICalendarTypes';
import { IPlanExpirationType } from 'src/app/modules/Models/PlanSubscription/interfaces/IPlanExpirationType';
import { DataFormSubscriptor } from 'src/app/modules/Subscriptors/components/forms/form-create-sub/form-create-sub.component';
import { IForms } from 'src/app/modules/Subscriptors/components/forms/interfaces/IForms';
import { SubscriptorManagerService } from 'src/app/modules/Subscriptors/services/subscriptor-manager/subscriptor-manager.service';

export class PlanSubscriptionFormValues {
  constructor(
    public name: any,
    public monto: number,
    public expiracion: IPlanExpirationType,
    public recurrencia: any,
    public diasParaVencerPago: number,
    public calendarioOParticular: any,
    public cantidadUsos: number | null
  ) {}
}

@Component({
  selector: 'app-form-create-plan-subscription',
  templateUrl: './form-create-plan-subscription.component.html',
  styleUrls: ['./form-create-plan-subscription.component.css'],
})
export class FormCreatePlanSubscriptionComponent implements OnInit, IForms {
  isLoading: boolean = true;
  form: FormGroup<any> = new FormGroup({});
  defaultValues: PlanSubscriptionFormValues = {
    name: 'Plan Nuevo Prueba',
    monto: 9875,
    expiracion: IPlanExpirationType.AMOUNTUSES,
    recurrencia: ICalendarTypes.MENSUAL,
    diasParaVencerPago: 10,
    calendarioOParticular: true,
    cantidadUsos: 2,
  };

  initialValues: PlanSubscriptionFormValues = {
    name: '',
    monto: 0,
    expiracion: IPlanExpirationType.TIME,
    recurrencia: ICalendarTypes.MENSUAL,
    diasParaVencerPago: 0,
    calendarioOParticular: '',
    cantidadUsos: null,
  };

  // Tipo expiracion
  selectedOptionExpiracion!: ISelectOption;
  expiracionOptions: ISelectOption[] = [
    {
      value: IPlanExpirationType.TIME,
      label: 'Tiempo ',
    },
    {
      value: IPlanExpirationType.AMOUNTUSES,
      label: 'Cantidad ',
    },
  ];

  // Recurrencia
  selectedOptionRecurrency!: ISelectOption;
  selectOptions: ISelectOption[] = [
    {
      value: ICalendarTypes.MENSUAL,
      label: 'Mensual ',
    },
    {
      value: ICalendarTypes.BIMENSUAL,
      label: 'Bimensual ',
    },
    {
      value: ICalendarTypes.TRIMESTRAL,
      label: 'Trimestral',
    },
    {
      value: ICalendarTypes.SEMESTRAL,
      label: 'Semestral',
    },
    {
      value: ICalendarTypes.ANUAL,
      label: 'Anual',
    },
    {
      value: ICalendarTypes.SIETE,
      label: '7 Dias',
    },
    {
      value: ICalendarTypes.CATORCE,
      label: '14 Dias',
    },
  ];

  public isTimeExpiration!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DataFormSubscriptor,
    public dialogRef: MatDialogRef<FormCreatePlanSubscriptionComponent>,
    private _customLogger: MyCustomLogger,
    private _clientNotification: MyClientNotificationService,
    private _subscriptorManagerService: SubscriptorManagerService,
    private _dialog: MatDialog,
    private _location: Location,
    private _planSubscriptionManagerService: PlanSubscriptionManagerService
  ) {
    this._customLogger.logDebug('Data id', JSON.stringify(data));
  }

  ngOnInit(): void {
    try {
      //  this.getData();
      this.createForm();
      this.isLoading = false;
      this.form.setValue(this.initialValues);
    } catch (error) {
      this._customLogger.logError('FormCreateSubscriptor, ngOnInit()', error);
      this._clientNotification.openNotification(
        'Error al Cargar el formulario de pago',
        'error'
      );
    }
  }

  ngAfterViewInit(): void {}

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      monto: new FormControl('', [
        Validators.required,
        Helper.inputNumberValidator(IInputNumberValidator.MIN, 0),
        Helper.inputNumberValidator(IInputNumberValidator.MAX, 100000),
      ]),
      expiracion: new FormControl('', [Validators.required]),
      recurrencia: new FormControl('', [Validators.required]),
      diasParaVencerPago: new FormControl('', [
        Validators.required,
        Helper.inputNumberValidator(IInputNumberValidator.MIN, 0),
        Helper.inputNumberValidator(IInputNumberValidator.MAX, 365),
      ]),
      calendarioOParticular: new FormControl('', [Validators.required]),
      cantidadUsos: new FormControl('', []),
    });

    this.form.get('expiracion')?.valueChanges.subscribe((value) => {
      if (value === IPlanExpirationType.TIME) {
        this.isTimeExpiration = true;
        this.form.get('cantidadUsos')?.setValidators(null);
      } else {
        this.isTimeExpiration = false;
        this.form.get('cantidadUsos')?.setValidators([Validators.required]);
        this.form
          .get('numeroTransaccion')
          ?.setValidators([Validators.required]);
      }
      this.form.get('cantidadUsos')?.updateValueAndValidity();
    });
  }

  // async onSubmit(): Promise<void> {
  //   try {
  //     this._customLogger.logDebug(
  //       'FormCreatePaymentComponent',
  //       'Form:',
  //       this.form.value
  //     );

  //     // Separo los values del form
  //     const name = this.form.controls['name'].value;
  //     const monto = this.form.controls['monto'].value;
  //     const expiracion = this.form.controls['expiracion'].value;
  //     const recurrencia = this.form.controls['recurrencia'].value;
  //     const diasParaVencerPago = this.form.controls['diasParaVencerPago'].value;
  //     const calendarioOParticular =
  //       this.form.controls['calendarioOParticular'].value;

  //     // Creo el objeto a pasarle el servicio.
  //     const planSubscriptionForm = new PlanSubscriptionFormValues(
  //       name,
  //       monto,
  //       expiracion,
  //       recurrencia,
  //       diasParaVencerPago,
  //       calendarioOParticular
  //     );

  //     if (await this.confirmForm(JSON.stringify(this.form.value, null, 2))) {
  //       try {
  //         this._planSubscriptionManagerService.createPlanSubscription(
  //           planSubscriptionForm
  //         );

  //         // Notification
  //         const notification = this._clientNotification.openNotification(
  //           'Exito al crear un plan de suscripcion',
  //           'success'
  //         );
  //       } catch (error) {
  //         this._customLogger.logError(
  //           'FormCreatePaymentComponent, form',
  //           error
  //         );
  //         throw new Error(`${error}`);
  //       }

  //       // Reseteo el form
  //       this.resetForm();

  //       // Back
  //       this.goBack();
  //     }
  //   } catch (error) {
  //     this._customLogger.logError('FormCreatePaymentComponent, form', error);
  //     this._clientNotification.openNotification('Hubo un error!', 'error');
  //   }
  // }
  async onSubmit(): Promise<void> {
    try {
      this._customLogger.logDebug(
        'FormCreatePaymentComponent',
        'Form:',
        this.form.value
      );

      // Separo los values del form
      const name = this.form.controls['name'].value;
      const monto = this.form.controls['monto'].value;
      const expiracion = this.form.controls['expiracion'].value;
      const recurrencia = this.form.controls['recurrencia'].value;
      const diasParaVencerPago = this.form.controls['diasParaVencerPago'].value;
      const calendarioOParticular =
        this.form.controls['calendarioOParticular'].value;
      const cantidadUsos = this.form.controls['cantidadUsos'].value;

      // Creo el objeto a pasarle el servicio.
      const planSubscriptionForm = new PlanSubscriptionFormValues(
        name,
        monto,
        expiracion,
        recurrencia,
        diasParaVencerPago,
        calendarioOParticular,
        cantidadUsos
      );

      if (await this.confirmForm(JSON.stringify(this.form.value, null, 2))) {
        try {
          await this._planSubscriptionManagerService
            .createPlanSubscription(planSubscriptionForm)
            .toPromise(); // Convertimos el observable en promesa y esperamos la respuesta

          // Notification
          const notification = this._clientNotification.openNotification(
            'Exito al crear un plan de suscripcion',
            'success'
          );
        } catch (error) {
          this._customLogger.logError(
            'FormCreatePaymentComponent, form',
            error
          );
          throw new Error(`${error}`);
        }

        // Reseteo el form
        this.resetForm();

        // Back
        this.goBack();
      }
    } catch (error) {
      this._customLogger.logError('FormCreatePaymentComponent, form', error);
      this._clientNotification.openNotification(`${error}`, 'error');
    }
  }

  initEditForm() {
    this.form.setValue(this.initialValues);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onDefaultData() {
    this.form.setValue(this.defaultValues);
  }

  resetForm(): void {
    this.form.reset();
  }

  async confirmForm(data?: string): Promise<boolean> {
    const dialogRef = this._dialog.open(MyConfirmComponent, {
      data: data ? data : 'Confirmar el plan',
    });

    const response = await dialogRef.afterClosed().toPromise();

    return response;
  }

  goBack(): void {
    this._location.back();
  }

  onSelectExpiracion(any: any) {
    const expiracion = this.form.controls['expiracion'].value;

    this._customLogger.logInfo('onSelectExpiracion', '', expiracion);
  }
}
