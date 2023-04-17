import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of, tap } from 'rxjs';
import { IMySearch } from 'src/app/core/modules/components/07-search-bar/my-search-bar/my-search-bar.component';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { ICondition } from 'src/app/modules/Models/Subscriptor/.subscription/interface/IConditions';
import { ISubscriptionStatus } from 'src/app/modules/Models/Subscriptor/.subscription/interface/ISubscriptionStatus';
import { IForms } from 'src/app/modules/Subscriptors/components/forms/interfaces/IForms';
import { StatusManager2Service } from 'src/app/modules/Subscriptors/services/status-manager/2/status-manager2.service';
import { StatusManagerInjectorService } from 'src/app/modules/Subscriptors/services/status-manager/injector/status-manager-injector.service';
import { StatusList } from '../../status-list/status-list.component';

export class DataFormStatus {
  constructor(
    public status: ISubscriptionStatus,
    public condition: ICondition,
    public message: string,
    public id: any
  ) {}
}

@Component({
  selector: 'app-form-status',
  templateUrl: './form-status.component.html',
  styleUrls: ['./form-status.component.css'],
})
export class FormStatusComponent implements OnInit, IForms {
  idParam: any = 2;
  isLoading: boolean = true;
  message: any = '';
  defaultValues: any = {
    status: ISubscriptionStatus.ACTIVO,
    condition: ICondition.HABILITADO,
    message: 'Puede pasar',
  };

  initialValues: any = {
    status: ISubscriptionStatus.ACTIVO,
    condition: ICondition.HABILITADO,
    message: 'Puede pasar',
  };

  form!: FormGroup<any>;

  selectedstatusOption!: StatusList;
  // selectedstatusOption!: DataFormStatus;

  statusOptions: IMySearch[] = [];
  conditionOptions: ICondition[] = [
    ICondition.HABILITADO,
    ICondition.INHABILITADO,
  ];

  //! Status Manager Service Injector
  private _statusManagerService: StatusManager2Service;

  constructor(
    // public data: DataFormStatus,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _customLogger: MyCustomLogger,
    public dialogRef: MatDialogRef<FormStatusComponent>,
    private _clientNotification: MyClientNotificationService,
    private _location: Location,
    // private _statusManagerService: StatusManager2Service,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    //! Status Manager Service Injector
    this._statusManagerService =
      StatusManagerInjectorService.selectService('mock');
    console.log('Data que se recibe en el formulario:', this.data);
  }

  async ngOnInit() {
    try {
      this.createForm();
      this.getStatusOptions();
      this.idParam = this._route.snapshot.paramMap.get('id');
      this._customLogger.logDebug(
        'viewSubscriptorComponent',
        'id Param:',
        this.idParam
      );

      this.getData();
    } catch (error) {
      this._clientNotification.openNotification('Problema con el Id', 'error');
      this._customLogger.logError('formStatus', error);
    }
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  async getData() {
    try {
      this._statusManagerService
        .getStatusListById(
          this.idParam
          // 2
        )
        .subscribe((data) => {
          this.initialValues = {
            status: data.status,
            condition: data.condition,
            message: data.message,
          };

          console.info('Status a editar desde form ', data);
        });

      this.initEditForm();
    } catch (error) {
      this._clientNotification.openNotification('Problema', 'error');
    }
  }

  getStatusOptions() {
    try {
      this._statusManagerService.getStatusToSelect().subscribe((data) => {
        this.statusOptions = data;
      });
    } catch (error) {
      this._clientNotification.openNotification(
        'getStatusOptions Problema',
        'error'
      );
    }
  }

  async getParams() {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.idParam = id;
      this._customLogger.logDebug('FormStatus', 'id', this.idParam);
    } else {
      throw new Error('Id no encontrado');
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      condition: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]), // Todo no dejar poner una fecha invalida directamente.
    });
  }
  initEditForm(): void {
    this.form.setValue(this.initialValues);
  }

  async onSubmit() {
    try {
      this._customLogger.logDebug('MyForm', 'Form:', this.form.value);

      await this.onEditFinal();

      this._clientNotification.openNotification(
        `Editado con éxito el estado: ${this.selectedstatusOption.status}`,
        'success'
      );

      this.goBack();
    } catch (error) {
      this._customLogger.logError('MyForm', error, this.form.value);
      this._clientNotification.openNotification('Hubo un error!', 'error');
    }
  }

  onDefaultData(): void {
    this.form.setValue(this.initialValues);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  resetForm(): void {
    this.form.reset();
  }

  goBack(): void {
    // this._location.back();
    this.router.navigate(['/settings']);
  }

  onSelectStatus(event: any) {
    const statusSelected = this.form.controls['status'].value;

    console.info(`onSelectStatus, el campo status: `, statusSelected.value);

    this._statusManagerService
      .getStatusListById(statusSelected.value)
      .subscribe((data: StatusList) => {
        console.info('data recibido onSelectStatus', data);

        // Cambiar seleecion
        this.selectedstatusOption = data;

        // Editar valores
        this.initialValues = {
          status: data.status,
          condition: data.condition,
          message: data.message,
        };
      });

    this._customLogger.logDebug('onSelectStatus.', this.selectedstatusOption);
    this.initEditForm();
  }

  async onEditFinal() {
    try {
      console.info(
        'onEditFinal, el status a cambiar',
        this.selectedstatusOption
      );

      await this._statusManagerService
        .getStatusListById(this.selectedstatusOption.id)
        // .getStatusListById(3)
        .subscribe((data: StatusList) => {
          const message = this.form.controls['message'].value;
          const condition = this.form.controls['condition'].value;

          (data.condition = condition), (data.message = message);

          return of(data).pipe(
            tap(() => {
              this._statusManagerService.refreshData$.next();
            })
          );
        });
    } catch (error) {
      this._customLogger.logError('onEditFinal', error);
    }
  }
}
