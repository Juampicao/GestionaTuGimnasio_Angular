import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { Helper, IDateValidator } from 'src/app/core/services/helper/Helper';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { PlanSubscriptionListVisual } from 'src/app/modules/components/Dashboard/components/plan-subscription-list/model/PlanSubscriptionListVisual';
import { PlanSubscriptionManagerService } from 'src/app/modules/components/Payments/services/plan-subscription-manager/plan-subscription-manager.service';
import { PLAN_SUBSCRIPTION_TIME_DEFAULT_1 } from 'src/app/modules/data/mockData/plan-subscription/PlanSubscriptionDefaultData';
import { PlanSubscription } from 'src/app/modules/Models/PlanSubscription/models/PlanSubscription';
import { PersonalInformation } from 'src/app/modules/Models/Subscriptor/.personal-information/model/PersonalInformation';
import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';
import { SubscriptorManagerService } from '../../../services/subscriptor-manager/subscriptor-manager.service';
import { IForms } from '../interfaces/IForms';

export class DataFormSubscriptor {
  constructor(public id: any) {}
}
@Component({
  selector: 'app-form-create-sub',
  templateUrl: './form-create-sub.component.html',
  styleUrls: ['./form-create-sub.component.css'],
})
export class FormCreateSubComponent implements OnInit, IForms {
  isLoading: boolean = true;
  form!: FormGroup<any>;

  defaultValues: any = {
    name: 'Juan',
    surname: 'Perez',
    dni: '12345678',
    phoneNumber: '5555555555',
    category: 'Category A',
    birthday: new Date('1990-01-01'),
    profileImage: null,
    address: 'Calle Falsa 123',
    email: 'juan.perez@example.com',
    planSubscription: PLAN_SUBSCRIPTION_TIME_DEFAULT_1,
  };

  initialValues: any = {};
  subscriptorEdit!: Subscriptor;

  planSubscriptionsList: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DataFormSubscriptor,
    public dialogRef: MatDialogRef<FormCreateSubComponent>,
    private _customLogger: MyCustomLogger,
    private _clientNotification: MyClientNotificationService,
    private _subscriptorManagerService: SubscriptorManagerService,
    private _location: Location,
    private _planSubscriptionService: PlanSubscriptionManagerService
  ) {
    this._customLogger.logDebug('Data id', JSON.stringify(data));
  }

  ngOnInit(): void {
    try {
      if (this.data.id) {
        this.getData();
      }
      this.getPlanSubscriptionData();
      this.createForm();
      if (this.subscriptorEdit) {
        this.initEditForm();
      }
    } catch (error) {
      this._customLogger.logError('FormCreateSubscriptor, ngOnInit()', error);
    }
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  createForm(): void {
    this.form = new FormGroup({
      // 2° Personal Infromation
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [Validators.required]),
      dni: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(4),
        Validators.maxLength(10),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      category: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [
        Validators.required,
        Helper.dateValidator(IDateValidator.MAX, new Date()),
      ]),
      profileImage: new FormControl(null, [this.fileSizeValidator()]),
      address: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),

      // 2° Plan SUbscription
      planSubscription: new FormControl('', [Validators.required]),
    });
  }

  initEditForm() {
    try {
      this.form.setValue(this.initialValues);
      this._customLogger.logInfo('initEditForm', '', this.subscriptorEdit);
    } catch (error) {
      this._customLogger.logError('initEditForm()', error);
      this._clientNotification.openNotification(
        'Problema para editar el suscriptor',
        'error'
      );
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onDefaultData() {
    this.form.setValue(this.defaultValues);
  }

  async onSubmit() {
    try {
      // Separo cada campo del formulario
      const name = this.form.controls['name'].value;
      const surname = this.form.controls['surname'].value;
      const email = this.form.controls['email'].value;
      const dni = this.form.controls['dni'].value;
      const phoneNumber = this.form.controls['phoneNumber'].value;
      const category = this.form.controls['category'].value;
      const birthday = this.form.controls['birthday'].value;
      const address = this.form.controls['address'].value;
      const profileImage = this.form.controls['profileImage'].value;

      // 1° personalInformation
      const personalInformation = new PersonalInformation(
        name,
        surname,
        dni,
        phoneNumber,
        category,
        birthday,
        profileImage,
        address,
        email
      );

      // 2° Plan Subscription seleccionado.
      const planSubscription = this.form.controls['planSubscription'].value;

      if (this.subscriptorEdit) {
        this.subscriptorEdit.personalInformation = personalInformation;
        // this.subscriptorEdit.planSubscription = planSubscription; // Todo cambiar plan.

        const response = await this._subscriptorManagerService.editSubscriptor(
          this.subscriptorEdit
        );

        this._customLogger.logInfo(
          'FormCreate, subscriptor editado:',
          '',
          this.subscriptorEdit
        );
      } else {
        // Llamada al servicio
        const response = await this._subscriptorManagerService
          .createSubscriptor(personalInformation, planSubscription)
          .subscribe((data) => {});
      }

      this._subscriptorManagerService.refreshData$.next();

      this._customLogger.logInfo(
        'FormCreateSubComponent',
        'Form:',
        this.form.value
      );

      // Notificacion de exito
      const notification = await this._clientNotification.openNotification(
        'Exito al Crear un Suscriptor',
        'success'
      );

      // Reset Form
      this.resetForm();

      // Cierro el formulario
      this.onClose();
    } catch (error) {
      this._customLogger.logInfo(
        'FormCreateSubComponent',
        'Form:',
        this.form.value
      );
      this._clientNotification.openNotification(
        'Error al Crear un Suscriptor',
        'error'
      );
    }
  }

  resetForm(): void {
    this.form.reset();
  }

  goBack(): void {
    this._location.back();
  }
  //? - - - - - - -  Others / Data  - - - - - - -

  getData() {
    try {
      this._subscriptorManagerService
        .getSubscriptorById(this.data.id)
        .subscribe((subscriptor: Subscriptor) => {
          this._customLogger.logInfo(
            'FormCreateSubscriptor, getData(). Subscriptor:',
            JSON.stringify(subscriptor, null, 2)
          );

          //2° personal infromation
          this.initialValues.name = subscriptor.personalInformation.name;
          this.initialValues.surname = subscriptor.personalInformation.surname;
          this.initialValues.dni = subscriptor.personalInformation.dni;
          this.initialValues.phoneNumber =
            subscriptor.personalInformation.phoneNumber;
          this.initialValues.category =
            subscriptor.personalInformation.category;
          this.initialValues.birthday =
            subscriptor.personalInformation.birthday;
          this.initialValues.profileImage =
            subscriptor.personalInformation.profileImage;
          this.initialValues.address = subscriptor.personalInformation.address;
          this.initialValues.email = subscriptor.personalInformation.email;

          //2° Plan Subscription
          this.initialValues.planSubscription =
            subscriptor.getPlanSubscription();
          this.subscriptorEdit = subscriptor;
        });
    } catch (error) {
      this._clientNotification.openNotification(
        'Error al Editar un Suscriptor',
        'error'
      );
      this._customLogger.logError('FormCreateSubscriptor, getData()', error);
    }
  }

  // Validator to check if date is valid
  // dateValidator() {
  //   return (control: FormControl): { [key: string]: boolean } | null => {
  //     const date = new Date(control.value);
  //     const today = new Date();
  //     if (date > today) {
  //       return { dateInvalid: true };
  //     }
  //     return null;
  //   };
  // }

  // Validator to check if file size is less than 2MB

  private fileSizeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const file = control.value;
      if (file && file.size) {
        const sizeInMB = file.size / (1024 * 1024);
        return sizeInMB > 2 ? { fileSizeExceeded: true } : null;
      }
      return null;
    };
  }

  // - - - - - - Plan Subscription Data - - - - - - //
  getPlanSubscriptionData() {
    try {
      this._planSubscriptionService.getAllPlanSubscription().subscribe(
        (data: PlanSubscription[]) => {
          this._customLogger.logInfo(
            'PlanSubscriptionList',
            'getPlanSubscriptionData()',
            data
          );

          this.planSubscriptionsList = data.map(
            (planSubscription: PlanSubscription) => {
              return new PlanSubscriptionListVisual(planSubscription);
            }
          );
        },
        (error) => {
          this._customLogger.logError('PlanSubscriptionList, getData', error);
        }
      );
    } catch (error) {
      this._customLogger.logError('PlanSusbcriptionList, getData', error);
      this._clientNotification.openNotification(
        'Cargar lista de planes',
        'error'
      );
    }
  }

  onSelectPlanSubscription(event: any) {
    const planSubscription = this.form.controls['planSubscription'].value;

    this._customLogger.logDebug(
      'FormCreateSubComponent',
      'Form:',
      this.form.value
    );
  }
  // - - - - - -  Accordeon - - - - - - //
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
