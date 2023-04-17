import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { IForms } from '../interfaces/IForms';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css'],
})
export class MyFormComponent implements OnInit, IForms {
  isLoading: boolean = true;
  defaultValues: any;
  initialValues: any;
  form!: FormGroup<any>;

  private _customLogger: MyCustomLogger = new MyCustomLogger();

  constructor(
    public dialogRef: MatDialogRef<MyFormComponent>,
    private _clientNotification: MyClientNotificationService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }
  createForm(): void {
    throw new Error('Method not implemented.');
  }
  initEditForm(): void {
    this.form.setValue(this.initialValues);
  }

  onSubmit() {
    try {
      this._customLogger.logDebug('MyForm', 'Form:', this.form.value);
      this._clientNotification.openNotification('Creado con éxito!', 'success');
      this.onClose();
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
    this._location.back();
  }
}

// import { Location } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormGroup } from '@angular/forms';
// import { MatDialogRef } from '@angular/material/dialog';
// import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
// import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
// import { IForms } from '../interfaces/IForms';

// @Component({
//   selector: 'app-my-form',
//   templateUrl: './my-form.component.html',
//   styleUrls: ['./my-form.component.css'],
// })
// export class MyFormComponent implements OnInit, IForms {
//   isLoading: boolean = true;
//   defaultValues: any;
//   initialValues: any;
//   form!: FormGroup<any>;

//   public dialogRef!: MatDialogRef<MyFormComponent>;
//   private _customLogger!: MyCustomLogger;
//   private _clientNotification!: MyClientNotificationService;
//   private _location!: Location;

//   constructor(
//     public dialogRef: MatDialogRef<MyFormComponent>,
//     private _customLogger: MyCustomLogger,
//     private _clientNotification: MyClientNotificationService,
//     private _location: Location
//   ) {

//   }
//   ngOnInit(): void {
//     this.createForm();
//   }

//   ngAfterViewInit(): void {
//     this.isLoading = false;
//   }
//   createForm(): void {
//     throw new Error('Method not implemented.');
//   }
//   initEditForm(): void {
//     throw new Error('Method not implemented.');
//   }
//   onSubmit() {
//     try {
//       this._customLogger.logDebug('MyForm', 'Form:', this.form.value);
//       this._clientNotification.openNotification('Creado con éxito!', 'success');
//       this.onClose();
//     } catch (error) {
//       this._customLogger.logInfo('MyForm', 'Form:', this.form.value);
//       this._clientNotification.openNotification('Hubo un error!', 'error');
//     }
//   }
//   onDefaultData(): void {
//     this.form.setValue(this.initialValues);
//   }

//   onClose(): void {
//     this.dialogRef.close();
//   }

//   resetForm(): void {
//     this.form.reset();
//   }

//   goBack(): void {
//     this._location.back();
//   }
// }
