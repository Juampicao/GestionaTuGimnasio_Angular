import { Location } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISelectOption } from 'src/app/core/modules/components/05-form-reutilizable/my-input/my-input.component';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { Helper, IDateValidator } from 'src/app/core/services/helper/Helper';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';
import { SubscriptorManagerService } from '../../../services/subscriptor-manager/subscriptor-manager.service';
import { IForms } from '../interfaces/IForms';

export class DataFormFreezeSubsriptor {
  constructor(public id: any) {}
}

@Component({
  selector: 'app-form-freeze-sub',
  templateUrl: './form-freeze-sub.component.html',
  styleUrls: ['./form-freeze-sub.component.css'],
})
export class FormFreezeSubComponent implements OnInit, AfterViewInit, IForms {
  isLoading: boolean = true;
  form!: FormGroup;

  defaultValues: any = {
    reason: 'razon de pruba',
    sinceDate: new Date(), // establecer fecha de hoy
    untilDate: new Date('2023 10 10'), // establecer fecha de hoy
    subscriptor: '', // no establecer ningún subscriptor por defecto
  };

  initialValues: any = {};
  subscriptor!: Subscriptor;
  subscriptorSelected!: ISelectOption;

  selectOptions: ISelectOption[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DataFormFreezeSubsriptor,
    public dialogRef: MatDialogRef<FormFreezeSubComponent>,
    private _customLogger: MyCustomLogger,
    private _clientNotification: MyClientNotificationService,
    private _subscriptorManagerService: SubscriptorManagerService,
    private _location: Location
  ) {
    this._customLogger.logDebug('Data id', JSON.stringify(data));
  }

  ngOnInit(): void {
    this.getSubscriptorById(this.data.id);
    this.createForm();

    if (this.subscriptor.isFreezed()) {
      this.initEditForm();
    }
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  createForm() {
    this.form = new FormGroup({
      reason: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      sinceDate: new FormControl('', [
        Validators.required,
        Helper.dateValidator(IDateValidator.MIN, new Date()),
      ]),
      untilDate: new FormControl('', [
        Validators.required,
        // Helper.dateValidator(IDateValidator.MAX, new Date()),
      ]), // Todo no dejar poner una fecha invalida directamente.
      subscriptor: new FormControl('', [Validators.required]),
    });
  }

  initEditForm(): void {
    this.form.setValue(this.initialValues);
  }

  onSubmit() {
    try {
      this.subscriptor.updateFreezeDate(this.form.value);

      this._customLogger.logDebug(
        'FormFreezeSubComponent',
        'Form:',
        this.form.value
      );
      this._clientNotification.openNotification(
        'Exito al Congelar suscriptor',
        'success'
      );

      this.resetForm();
      this.onClose();
    } catch (error) {
      this._customLogger.logInfo(
        'FormFreezeSubComponent',
        'Form:',
        this.form.value
      );
      this._clientNotification.openNotification(
        'Error al Congelar suscriptor',
        'error'
      );
    }
  }

  onDefaultData() {
    this.form.setValue(this.defaultValues);
  }

  onClose() {
    this.dialogRef.close();
  }

  resetForm(): void {
    this.form.reset();
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

        const subscriptorOption: ISelectOption = {
          value: this.subscriptor.id, // Aquí debes reemplazar `personalInformation` y `getRegisterNumber()` por el nombre de las propiedades que contienen el nombre y el número de registro del subscriptor, respectivamente.
          label: data.personalInformation.name + ' ' + data.getRegisterNumber(),
        };

        // Seleccionar el subscriptor.
        this.onSubscriptorSelectedChange(subscriptorOption);

        // Si tiene un "CONGELAMIENTO", editarlo.
        if (this.subscriptor.isFreezed()) {
          this._customLogger.logInfo(
            'El subscriptor esta frizado',
            `${this.subscriptor.getFreezeData()}`
          );

          this.initialValues = {
            reason: this.subscriptor.getLastFreezeData()?.reason,
            sinceDate: this.subscriptor.getLastFreezeData()?.sinceDate,
            untilDate: this.subscriptor.getLastFreezeData()?.untilDate,
            subscriptor: '',
          };
        }
      });

    // Actualizar la lista de opciones, solo con este subscriptor. No puede seleccionar otro.
    this.updateSelectOptions([this.subscriptorSelected]);
  }

  /**
   * Seleccionar sub. Quien estara seleccionado.
   * @param subscriptorSelected ISelectOption
   */
  onSubscriptorSelectedChange(subscriptorSelected: ISelectOption) {
    this.subscriptorSelected = subscriptorSelected;
  }

  /**
   * Actualizar la lista de opciones.
   * @param options ISelectOpcion[]
   */
  updateSelectOptions(options: ISelectOption[]) {
    this.selectOptions = options;
  }

  /**
   * Desactivar el congelamiento del subscriptor.
   */
  onDesactiveFreeze() {
    this._clientNotification.functionNotImplemented();
  }
}

// selectOptions: ISelectOption[] = [
//   {
//     value: 'Juan Pablo 12412s324',
//     label: 'Juan ',
//   },
//   {
//     value: 'Pedro 111222442124',
//     label: 'Pedro ',
//   },
// ];
