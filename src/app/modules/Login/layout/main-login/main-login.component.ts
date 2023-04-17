import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { IForms } from 'src/app/modules/Subscriptors/components/forms/interfaces/IForms';
import { AccessData } from '../../services/access.service';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.css'],
})
export class MainLoginComponent implements OnInit, IForms {
  isLoading!: boolean;
  form!: FormGroup<any>;

  defaultValues: any = {
    user: 'gimnasio@gimnasio.com',
    password: '123456',
  };

  initialValues: any;

  constructor(
    // private _accessService: AccessService,
    private _authService: AuthService,
    private _clientNotification: MyClientNotificationService,
    private _router: Router,
    private _customLogger: MyCustomLogger,
    private _location: Location
  ) {}

  ngOnInit(): void {
    try {
      this.createForm();
    } catch (error) {
      this._customLogger.logError('MainLoginComponent, ngOnInit()', error);
    }
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  createForm(): void {
    this.form = new FormGroup({
      user: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  initEditForm(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(): void {
    this._customLogger.logDebug(
      'FormCreateSubComponent',
      'Form:',
      this.form.value
    );
    this.onLogin(this.form.value);
  }
  onDefaultData(): void {
    this.form.setValue(this.defaultValues);
  }
  onClose(): void {
    throw new Error('Method not implemented.');
  }

  onLogin(accessData: AccessData) {
    try {
      this._customLogger.logDebug('onLogin', accessData);
      this._authService.validatePassword(accessData);
      this._clientNotification.openNotification('Usuario correcto!', 'success');
      this._router.navigate(['/suscriptores']);
    } catch (error) {
      this._clientNotification.openNotification(`${error}`, 'error');
      this.resetForm();
      this._customLogger.logError('MainLogginComponent', error);
    }
  }

  onWrongPasswordData() {
    const data = new AccessData('gimnasio@gimnasio.com', '11111111');
    this.form.setValue(data);
  }

  onNonExistentUser() {
    const data = new AccessData('ejemplo@ejemplo.com', '11111111');
    this.form.setValue(data);
  }

  resetForm(): void {
    this.form.reset();
  }

  goBack(): void {
    this._location.back();
  }
}
