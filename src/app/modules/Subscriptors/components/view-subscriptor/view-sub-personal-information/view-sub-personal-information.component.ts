import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Helper } from 'src/app/core/services/helper/Helper';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { FreezeSuscriptionData } from 'src/app/modules/Models/Subscriptor/.subscription/model/FreezeSuscriptionData';
import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';
import { StatusManagerService } from '../../../services/status-manager/status-manager.service';
import { SubscriptorManagerService } from '../../../services/subscriptor-manager/subscriptor-manager.service';
import { FormFreezeSubComponent } from '../../forms/form-freeze-sub/form-freeze-sub.component';
import { ViewSubscriptorService } from '../services/view-subscriptor.service';

export class VisualSubPersonalInformation {
  id: any;
  name: string;
  surname: string;
  dni: number;
  phoneNumber: number;
  category: string;
  birthday: Date | string;
  profileImage: string | null;
  address: string;
  email: string;
  age: number;
  registerNumber: number;
  freezedData: FreezeSuscriptionData[] | null;
  isFreezed: boolean;
  dateFinishFreezed: Date | null;
  private _statusManagerService: StatusManagerService =
    new StatusManagerService();
  private _subscriptor: Subscriptor;

  constructor(subscriptor: Subscriptor) {
    this.id = subscriptor.id;
    this.name = subscriptor.personalInformation.name;
    this.surname = subscriptor.personalInformation.surname;
    this.dni = subscriptor.personalInformation.dni;
    this.phoneNumber = subscriptor.personalInformation.phoneNumber;
    this.category = subscriptor.personalInformation.category;
    this.birthday = Helper.ParseDate(subscriptor.personalInformation.birthday);
    this.profileImage = subscriptor.personalInformation.profileImage;
    this.email = subscriptor.personalInformation.email;
    this.age = subscriptor.personalInformation.age();
    this.address = subscriptor.personalInformation.address;
    this.registerNumber = subscriptor.getRegisterNumber();
    this.freezedData = subscriptor.getFreezeData();
    this.isFreezed = subscriptor.isFreezed();
    this.dateFinishFreezed = subscriptor.getDateFinishFreezed();
    this._subscriptor = subscriptor;
  }

  getFreezedData() {
    if (!this.freezedData) {
      return `No tiene ningun congelamiento de la subscripcion`;
    } else {
      return `${JSON.stringify(this.freezedData, null, 2)}`;
    }
  }

  getDateFinishFreezed() {
    return this.dateFinishFreezed;
  }

  getCondition() {
    return this._subscriptor.getCondition();
  }

  getConditionIcon() {
    return this._statusManagerService.getConditionIcon(
      this._subscriptor.getStatus()
    );
  }

  getNumberDaysToExpired() {
    return this._statusManagerService.daysToExpired(
      this._subscriptor.getDateExpiration()
    );
  }

  getstatusMessage() {
    return this._statusManagerService.statusMessage(
      this._subscriptor.getStatus()
    );
  }

  getStatusColor() {
    this._statusManagerService.statusColor(this._subscriptor.getStatus());
  }
}
@Component({
  selector: 'app-view-sub-personal-information',
  templateUrl: './view-sub-personal-information.component.html',
  styleUrls: ['./view-sub-personal-information.component.css'],
})
export class ViewSubPersonalInformationComponent implements OnInit {
  public isLoading: boolean = true;
  private _idParam: any;

  // person: VisualSubPersonalInformation = new VisualSubPersonalInformation(
  //   PERSONAL_INFORMATION_1,
  //   1111,
  // );

  person!: VisualSubPersonalInformation;

  // person: any = {
  //   name: 'Juan',
  //   age: 30,
  //   address: 'Calle 1234, Buenos Aires',
  //   phoneNumber: 113050293,
  //   birthday: '01/01/1991',
  //   category: '1° Division',
  //   registerNumber: 2932192,
  //   imageUrl: 'url_de_la_imagen_de_Juan.jpg',
  // };

  constructor(
    private _customLogger: MyCustomLogger,
    private _route: ActivatedRoute,
    private _subscriptorManagerService: SubscriptorManagerService,
    private _subscriptorViewService: ViewSubscriptorService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this._idParam = id;

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
      // this._subscriptorManagerService
      //   .getSubscriptorById(this._idParam)
      //   .subscribe((subscriptor: Subscriptor) => {
      //     this._customLogger.logInfo(
      //       'View-Sub-Personal-Information',
      //       'getSubscriptorById',
      //       subscriptor
      //     );
      //     const result = new visualSubPersonalInformation(
      //       subscriptor.personalInformation,
      //       subscriptor.getRegisterNumber()
      //     );
      //     this.person = result;
      //     console.log(this.person);
      //   });
      const subscriptor = this._subscriptorViewService.getSubscriptor();
      // this.person = new VisualSubPersonalInformation(
      //   subscriptor.personalInformation,
      //   subscriptor.getRegisterNumber(),
      //   subscriptor.getFreezeData(),
      //   subscriptor.isFreezed(),
      //   subscriptor.getDateFinishFreezed()
      // );
      this.person = new VisualSubPersonalInformation(subscriptor);
    } catch (error) {
      this._customLogger.logError('SubscriptorList, getData', error);
    }
  }

  onFreezeSubscriptor() {
    this._customLogger.logDebug(
      'View-Subscirptor-Info',
      'onFreezeSubscriptor()',
      this.person.id
    );

    const dialogRef = this._dialog.open(FormFreezeSubComponent, {
      data: {
        id: this.person.id,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    });
  }
}
