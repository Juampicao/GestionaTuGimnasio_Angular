import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ISelectOption } from 'src/app/core/modules/components/05-form-reutilizable/my-input/my-input.component';
import { MySearchClass } from 'src/app/core/modules/components/07-search-bar/my-search-bar/my-search-bar.component';
import { MyConfirmComponent } from 'src/app/core/modules/components/11-confirm-reutilizable/my-confirm/my-confirm.component';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { IBankOptions } from 'src/app/modules/Models/Payment/interfaces/Interfaces';
import { BankTransfer } from 'src/app/modules/Models/Payment/paymentMethods/BankTransfer';
import { CashMethod } from 'src/app/modules/Models/Payment/paymentMethods/CashMethod';
import { CreateNewPaymentSubscriptionData } from 'src/app/modules/Models/Payment/services/models/CreateNewPaymentSubscriptionData';
import { PlanSubscription } from 'src/app/modules/Models/PlanSubscription/models/PlanSubscription';
import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';
import {
  BANK_BBVA_TO_RECIEVE_TRANSFER,
  USER_1_DEFAULT,
} from 'src/app/modules/Models/ValoresDefault2';
import { DataFormSubscriptor } from 'src/app/modules/Subscriptors/components/forms/form-create-sub/form-create-sub.component';
import { IForms } from 'src/app/modules/Subscriptors/components/forms/interfaces/IForms';
import { SubscriptorManagerService } from 'src/app/modules/Subscriptors/services/subscriptor-manager/subscriptor-manager.service';
import { PaymentManagerService } from '../../../services/payment-manager/payment-manager.service';
import { PlanSubscriptionManagerService } from '../../../services/plan-subscription-manager/plan-subscription-manager.service';

export class PaymentFormValues {
  constructor(
    public pagador: any,
    public monto: number,
    public planSubscription: any,
    public metodoPago: any,
    public bank: any = null,
    public numeroTransaccion: any = null // public mercadoPago: any = null
  ) {}
}

@Component({
  selector: 'app-form-create-payment',
  templateUrl: './form-create-payment.component.html',
  styleUrls: ['./form-create-payment.component.css'],
})
export class FormCreatePaymentComponent implements OnInit, IForms {
  isLoading: boolean = true;
  form: FormGroup<any> = new FormGroup({});
  defaultValues: PaymentFormValues = {
    pagador: '',
    monto: 10,
    planSubscription: 'plan premium',
    metodoPago: 'efectivo',
    bank: null,
    numeroTransaccion: null,
    // mercadoPago: null,
  };
  initialValues!: PaymentFormValues;

  subscriptor!: Subscriptor;
  subscriptorSelected!: ISelectOption;
  selectSubscriptorOptions: ISelectOption[] = [];

  // PaymentMethod.
  selectPaymentMethodOptions: ISelectOption[] = [
    {
      value: 'efectivo',
      label: 'Efectivo ',
    },
    {
      value: 'transferencia',
      label: 'Transferencia',
    },
    {
      value: 'mercadoPago',
      label: 'Mercado Pago ',
    },
  ];

  // Show transfer payment method fields
  public isTransferPaymentMethod: boolean = false;

  // PaymentMethod.
  selectBanksOptions: ISelectOption[] = [
    {
      value: 'bancoBbva',
      label: 'BBVA juan ',
    },
    {
      value: 'bancoCiudad',
      label: 'Banco Ciudad 181728/2',
    },
  ];

  public isMercadoPagoPaymentMethod: boolean = false;
  selectMercadoPagoOptions: ISelectOption[] = [
    {
      value: 'mercadoPagoOsvaldo',
      label: 'Mercado Pago Osvaldo ',
    },
    {
      value: 'mercadoPagoSofia',
      label: 'Mercado Pago Sofia',
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DataFormSubscriptor,
    public dialogRef: MatDialogRef<FormCreatePaymentComponent>,
    private _customLogger: MyCustomLogger,
    private _clientNotification: MyClientNotificationService,
    private _subscriptorManagerService: SubscriptorManagerService,
    private _paymentManagerService: PaymentManagerService,
    private _planSubscriptionService: PlanSubscriptionManagerService,
    private _dialog: MatDialog,
    private _location: Location
  ) {
    this._customLogger.logDebug('Data id', JSON.stringify(data));
  }

  ngOnInit(): void {
    try {
      this.getData();
      this.createForm();
      this.isLoading = false;

      // Escuchar cambios en el campo de "pagador"
      this.form.get('pagador')?.valueChanges.subscribe((value) => {
        if (value && value.trim() !== '') {
          this.getSubscriptorById(value);
        }
      });
    } catch (error) {
      this._customLogger.logError('FormCreateSubscriptor, ngOnInit()', error);
      this._clientNotification.openNotification(
        'Cargar el formulario de pago',
        'error'
      );
    }
  }

  ngAfterViewInit(): void {
    // this.isLoading = false;
  }

  createForm(): void {
    this.form = new FormGroup({
      pagador: new FormControl('', [Validators.required]),
      planSubscription: new FormControl('', [Validators.required]),
      monto: new FormControl('', [Validators.required]),
      metodoPago: new FormControl('', [Validators.required]),

      // Si el metodo pago es efectivo, no necesito bank y numeroTransaccion/ o hacerlo optativo.
      bank: new FormControl(''),
      numeroTransaccion: new FormControl(''),
    });

    // Validacion dinamica.
    this.form.get('metodoPago')?.valueChanges.subscribe((value) => {
      if (value === 'efectivo') {
        this.form.get('bank')?.setValidators(null);
        this.form.get('numeroTransaccion')?.setValidators(null);
      } else {
        this.form.get('bank')?.setValidators([Validators.required]);
        this.form
          .get('numeroTransaccion')
          ?.setValidators([Validators.required]);
      }
      this.form.get('bank')?.updateValueAndValidity();
      this.form.get('numeroTransaccion')?.updateValueAndValidity();
    });
  }

  async onSubmit() {
    try {
      this._customLogger.logDebug(
        'FormCreatePaymentComponent',
        'Form:',
        this.form.value
      );

      // Separo los values del form
      const pagador = this.form.controls['pagador'].value;
      const planSubscription = this.form.controls['planSubscription'].value;
      const monto = this.form.controls['monto'].value;
      const metodoPago = this.form.controls['metodoPago'].value;
      const bank = this.form.controls['bank'].value;
      const numeroTransaccion = this.form.controls['numeroTransaccion'].value;
      // const mercadoPago = this.form.controls['mercadoPago'].value;

      // Buscar pagador.
      const pagadorComplete = await this._subscriptorManagerService
        .getSubscriptorById(pagador)
        .toPromise();

      // Buscar Plan
      const planSubscriptionComplete = await this.getPlanSubscriptionByName(
        planSubscription
      );

      // Buscar metodoPago
      let metodoPagoComplete;
      if (metodoPago === 'efectivo') {
        metodoPagoComplete = new CashMethod('');
      }

      // Todo cada metodo Banco es diferente..
      if (metodoPago === 'transferencia') {
        metodoPagoComplete = new BankTransfer(
          numeroTransaccion,
          IBankOptions.CIUDAD,
          BANK_BBVA_TO_RECIEVE_TRANSFER
        );
      }

      if (await this.confirmForm(JSON.stringify(this.form.value, null, 2))) {
        //!-1 Creador de pagos automatizado.
        // Creo la informacion a pasarle al subscriptor para pagar.
        if (pagadorComplete && metodoPagoComplete && planSubscriptionComplete) {
          const newPaymentSubscription = new CreateNewPaymentSubscriptionData(
            planSubscriptionComplete,
            pagadorComplete,
            USER_1_DEFAULT,
            metodoPagoComplete
          );

          this._customLogger.logInfo(
            'newPaymentSubscription,',
            `${JSON.stringify(newPaymentSubscription, null, 2)}`
          );

          //!-2 Crear pago manual.
          // const newPayment = new SubscriptionSubscriptorPayment(
          //   IPaymentStatus.COMPLETADO,
          //   monto,
          //   new Date(),
          //   pagador,
          //   new Date(),
          //   planSubscription,
          //   USER_1_DEFAULT,
          //   Helper.getFirstDayOfNextMonth(new Date())
          // );
          // this._customLogger.logInfo(
          //   'newPaymentSubscription MANUAL,',
          //   `${JSON.stringify(newPayment, null, 2)}`
          // );

          // Notificacion de exito

          this._paymentManagerService.createPayment(newPaymentSubscription);
        }

        const notification = await this._clientNotification.openNotification(
          'Exito al registrar un pago',
          'success'
        );

        // Ir para atras.
        this.goBack();

        // Reseteo el form
        this.resetForm();
      }
    } catch (error) {
      this._customLogger.logError('FormCreatePaymentComponent, form', error);
      this._clientNotification.openNotification('Hubo un error!', 'error');
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
    this._customLogger.logDebug(
      'FormCreatePaymentComponent',
      'Form:',
      this.form.value
    );
  }

  resetForm(): void {
    this.form.reset();
  }

  async confirmForm(data?: string): Promise<boolean> {
    const dialogRef = this._dialog.open(MyConfirmComponent, {
      data: data ? data : 'Confirmar el pago',
    });

    const response = await dialogRef.afterClosed().toPromise();

    // Cerrar
    return response;
  }

  goBack(): void {
    this._location.back();
  }
  //? - - - - - - -  Others / Data  - - - - - - -

  /**
   * Buscar pod id el subscriptor.
   * @param id
   */
  async getSubscriptorById(id: any) {
    let subscriptorFinal = await this._subscriptorManagerService
      .getSubscriptorById(id)
      .subscribe((data) => {
        this.subscriptor = data;
        this._customLogger.logDebug('GetSubscriptorById', data);

        //! Actualizar la lista de opciones, solo con este subscriptor. No puede seleccionar otro.
        // this.updateSelectOptions([this.subscriptorSelected]);

        // const subscriptorOption: ISelectOption = {
        //   value: this.subscriptor.id,
        //   label: data.personalInformation.name + ' ' + data.getRegisterNumber(),
        // };

        // Seleccionar el subscriptor.
        // this.onSubscriptorSelectedChange(subscriptorOption);
      });
  }

  getData() {
    this._subscriptorManagerService
      .getAllSubscriptorsToSearch()
      .subscribe((data: MySearchClass[]) => {
        this.selectSubscriptorOptions = data;
        this._customLogger.logDebug('getData()', data);
      });
  }

  /**
   * Seleccionar sub. Quien estara seleccionado.
   * @param subscriptorSelected ISelectOption
   */
  async onSubscriptorSelectedChange(selectedOption: MySearchClass) {
    this._customLogger.logDebug(
      'FormCreatePayment',
      'onSubscriptorSelectedChange()',
      selectedOption
    );

    const findSubscriptor = await this.getSubscriptorById(selectedOption.value);

    // Actualizar campos con los valores del subscriptor.
    this.form.setValue({
      pagador: this.subscriptor.id,
      monto: this.subscriptor.getPlanSubscription().monto,
      planSubscription: this.subscriptor.getPlanSubscription().nombre,
      metodoPago: 'Efectivo',
      bank: null,
      // mercadoPago: null,
      numeroTransaccion: null,
    });
  }

  /**
   * Actualizar la lista de opciones.
   * @param options ISelectOpcion[]
   */
  updateSelectOptions(options: ISelectOption[]) {
    this.selectSubscriptorOptions = options;
  }

  onSelectChangePaymentMethod(event: any) {
    const selectedValue = event.value;
    console.log(selectedValue);

    if (selectedValue === 'transferencia') {
      this.isTransferPaymentMethod = true;
      this.isMercadoPagoPaymentMethod = false;
    } else if (selectedValue === 'mercadoPago') {
      this.isMercadoPagoPaymentMethod = true;
      this.isTransferPaymentMethod = false;
    } else {
      this.isTransferPaymentMethod = false;
      this.isMercadoPagoPaymentMethod = false;
    }

    // realizar la acción deseada con el valor seleccionado
  }

  getPlanSubscriptionByName(name: string): PlanSubscription | null {
    try {
      let newPlan;
      const response = this._planSubscriptionService
        .getPlanSubscriptionByName(name)
        .subscribe((plan) => {
          newPlan = plan;
        });

      if (newPlan) {
        return newPlan;
      } else {
        throw new Error('No existe el plan');
      }
    } catch (error) {
      this._customLogger.logDebug(
        'PaymentForm, onSubmit , getPlanSUbscriptionById',
        error
      );
      throw new Error(`${error}`);
    }
  }
}

// import { Component, Inject, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ISelectOption } from 'src/app/core/modules/components/05-form-reutilizable/my-input/my-input.component';
// import { MySearchClass } from 'src/app/core/modules/components/07-search-bar/my-search-bar/my-search-bar.component';
// import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
// import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
// import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';
// import { DataFormSubscriptor } from 'src/app/modules/Subscriptors/components/forms/form-create-sub/form-create-sub.component';
// import { IForms } from 'src/app/modules/Subscriptors/components/forms/interfaces/IForms';
// import { SubscriptorManagerService } from 'src/app/modules/Subscriptors/services/subscriptor-manager/subscriptor-manager.service';

// export class PaymentFormValues {
//   constructor(
//     public pagador: any,
//     public monto: number,
//     public planSubscription: any,
//     public metodoPago: any,
//     public bank: any = null,
//     public numeroTransaccion: any = null
//   ) {}
// }

// @Component({
//   selector: 'app-form-create-payment',
//   templateUrl: './form-create-payment.component.html',
//   styleUrls: ['./form-create-payment.component.css'],
// })
// export class FormCreatePaymentComponent implements OnInit, IForms {
//   isLoading: boolean = true;
//   form: FormGroup<any> = new FormGroup({});
//   defaultValues: PaymentFormValues = {
//     pagador: '',
//     monto: 10,
//     planSubscription: 'plan premium',
//     metodoPago: 'Efectivo',
//     bank: null,
//     numeroTransaccion: null,
//   };
//   initialValues!: PaymentFormValues;

//   subscriptor!: Subscriptor;
//   subscriptorSelected!: ISelectOption;
//   selectSubscriptorOptions: ISelectOption[] = [];

//   // PaymentMethod.
//   selectPaymentMethodOptions: ISelectOption[] = [
//     {
//       value: 'efectivo',
//       label: 'Efectivo ',
//     },
//     {
//       value: 'transferencia',
//       label: 'Transferencia',
//     },
//     {
//       value: 'mercadoPago',
//       label: 'Mercado Pago ',
//     },
//   ];

//   // Show transfer payment method fields
//   public isTransferPaymentMethod: boolean = false;

//   // PaymentMethod.
//   selectBanksOptions: ISelectOption[] = [
//     {
//       value: 'bancoBbva',
//       label: 'BBVA juan ',
//     },
//     {
//       value: 'bancoCiudad',
//       label: 'Banco Ciudad 181728/2',
//     },
//   ];

//   constructor(
//     @Inject(MAT_DIALOG_DATA)
//     public data: DataFormSubscriptor,
//     public dialogRef: MatDialogRef<FormCreatePaymentComponent>,
//     private _customLogger: MyCustomLogger,
//     private _clientNotification: MyClientNotificationService,
//     private _subscriptorManagerService: SubscriptorManagerService
//   ) {
//     this._customLogger.logDebug('Data id', JSON.stringify(data));
//   }

//   ngOnInit(): void {
//     try {
//       this.getData();
//       this.createForm();
//       this.isLoading = false;

//       // Escuchar cambios en el campo de "pagador"
//       this.form.get('pagador')?.valueChanges.subscribe((value) => {
//         if (value && value.trim() !== '') {
//           this.getSubscriptorById(value);
//         }
//       });
//     } catch (error) {
//       this._customLogger.logError('FormCreateSubscriptor, ngOnInit()', error);
//       this._clientNotification.openNotification(
//         'Cargar el formulario de pago',
//         'error'
//       );
//     }
//   }

//   ngAfterViewInit(): void {
//     // this.isLoading = false;
//   }

//   createForm(): void {
//     this.form = new FormGroup({
//       pagador: new FormControl('', [Validators.required]),
//       planSubscription: new FormControl('', [Validators.required]),
//       monto: new FormControl('', [Validators.required]),
//       metodoPago: new FormControl('', [Validators.required]),
//       bank: new FormControl('', [Validators.required]),
//       numeroTransaccion: new FormControl('', [Validators.required]),
//     });
//   }

//   async onSubmit() {
//     try {
//       this._customLogger.logDebug(
//         'FormCreatePaymentComponent',
//         'Form:',
//         this.form.value
//       );

//       // Separo los values del form
//       const pagador = this.form.controls['pagador'].value;
//       const planSubscription = this.form.controls['planSubscription'].value;
//       const monto = this.form.controls['monto'].value;
//       const metodoPago = this.form.controls['metodoPago'].value;
//       const bank = this.form.controls['bank'].value;
//       const numeroTransaccion = this.form.controls['numeroTransaccion'].value;

//       // Creo la informacion a pasarle al subscriptor para pagar.
//       // const newPaymentSubscription = new CreateNewPaymentSubscriptionData(
//       //   planSubscription,
//       //   pagador,
//       //   USER_1_DEFAULT
//       // );

//       // this._customLogger.logInfo(
//       //   'newPaymentSubscription,',
//       //   `${newPaymentSubscription}`
//       // );

//       // Notificacion de exito
//       const notification = await this._clientNotification.openNotification(
//         'Exito al registrar un pago',
//         'success'
//       );

//       // Reseteo el form
//       this.resetForm();
//     } catch (error) {
//       this._customLogger.logError('FormCreatePaymentComponent, form', error);
//       this._clientNotification.openNotification('Hubo un error!', 'error');
//     }
//   }

//   initEditForm() {
//     this.form.setValue(this.initialValues);
//   }

//   onClose(): void {
//     this.dialogRef.close();
//   }

//   onDefaultData() {
//     this.form.setValue(this.defaultValues);
//     this._customLogger.logDebug(
//       'FormCreatePaymentComponent',
//       'Form:',
//       this.form.value
//     );
//   }

//   resetForm(): void {
//     this.form.reset();
//   }

//   //? - - - - - - -  Others / Data  - - - - - - -

//   // /**
//   //  * Buscar pod id el subscriptor.
//   //  * @param id
//   //  */
//   // async getSubscriptorById(id: any) {
//   //   let subscriptorFinal = await this._subscriptorManagerService
//   //     .getSubscriptorById(id)
//   //     .subscribe((data) => {
//   //       this.subscriptor = data;
//   //       this._customLogger.logDebug('GetSubscriptorById', data);

//   //       const subscriptorOption: ISelectOption = {
//   //         value: this.subscriptor.id,
//   //         label: data.personalInformation.name + ' ' + data.getRegisterNumber(),
//   //       };

//   //       // Seleccionar el subscriptor.
//   //       this.onSubscriptorSelectedChange(subscriptorOption);
//   //     });

//   //   // Actualizar la lista de opciones, solo con este subscriptor. No puede seleccionar otro.
//   //   this.updateSelectOptions([this.subscriptorSelected]);
//   // }

//   /**
//    * Buscar pod id el subscriptor.
//    * @param id
//    */
//   async getSubscriptorById(id: any) {
//     let subscriptorFinal = await this._subscriptorManagerService
//       .getSubscriptorById(id)
//       .subscribe((data) => {
//         this.subscriptor = data;
//         this._customLogger.logDebug('GetSubscriptorById', data);

//         // Actualizar la lista de opciones, solo con este subscriptor. No puede seleccionar otro.
//         this.updateSelectOptions([this.subscriptorSelected]);

//         const subscriptorOption: ISelectOption = {
//           value: this.subscriptor.id,
//           label: data.personalInformation.name + ' ' + data.getRegisterNumber(),
//         };

//         // Seleccionar el subscriptor.
//         this.onSubscriptorSelectedChange(subscriptorOption);
//       });
//   }

//   getData() {
//     this._subscriptorManagerService
//       .getAllSubscriptorsToSearch()
//       .subscribe((data: MySearchClass[]) => {
//         this.selectSubscriptorOptions = data;
//         this._customLogger.logDebug('getData()', data);
//       });
//   }
//   // /**
//   //  * Seleccionar sub. Quien estara seleccionado.
//   //  * @param subscriptorSelected ISelectOption
//   //  */
//   // onSubscriptorSelectedChange(subscriptorSelected: ISelectOption) {
//   //   this.subscriptorSelected = subscriptorSelected;

//   //   // Actualizar campos con los valores del subscriptor.
//   //   this.form.setValue({
//   //     pagador: this.subscriptorSelected,
//   //     monto: this.subscriptor.getPlanSubscription().monto,
//   //     planSubscription: this.subscriptor.getPlanSubscription().nombre,
//   //   });
//   // }

//   /**
//    * Seleccionar sub. Quien estara seleccionado.
//    * @param subscriptorSelected ISelectOption
//    */
//   onSubscriptorSelectedChange(event: any) {
//     this.subscriptorSelected = event.value;

//     console.log(this.subscriptorSelected);

//     // Actualizar campos con los valores del subscriptor.
//     this.form.setValue({
//       pagador: this.subscriptorSelected,
//       monto: this.subscriptor.getPlanSubscription().monto,
//       planSubscription: this.subscriptor.getPlanSubscription().nombre,
//     });
//   }

//   /**
//    * Actualizar la lista de opciones.
//    * @param options ISelectOpcion[]
//    */
//   updateSelectOptions(options: ISelectOption[]) {
//     this.selectSubscriptorOptions = options;
//   }

//   onSelectChangePaymentMethod(event: any) {
//     const selectedValue = event.value;
//     console.log(selectedValue);

//     if (selectedValue === 'transferencia') {
//       this.isTransferPaymentMethod = true;
//     }
//     // realizar la acción deseada con el valor seleccionado
//   }
// }
