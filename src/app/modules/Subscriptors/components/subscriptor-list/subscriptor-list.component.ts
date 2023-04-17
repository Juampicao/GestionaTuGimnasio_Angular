import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { MyDeleteComponent } from 'src/app/core/modules/components/03-delete/my-delete.component';
import { MySearchClass } from 'src/app/core/modules/components/07-search-bar/my-search-bar/my-search-bar.component';
import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
import { MyDeleterNotificationService } from 'src/app/core/services/deleleter-service/MyDeleterNotificationService';
import { Helper } from 'src/app/core/services/helper/Helper';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';
import { SubscriptorManagerService } from '../../services/subscriptor-manager/subscriptor-manager.service';
import {
  DataFormSubscriptor,
  FormCreateSubComponent,
} from '../forms/form-create-sub/form-create-sub.component';
import { FormFreezeSubComponent } from '../forms/form-freeze-sub/form-freeze-sub.component';
import { RegisterAccessSubscriptor } from '../register-access-subscriptor/model/RegisterAccessSubscriptor';
import { RegisterAccessSubscriptorComponent } from '../register-access-subscriptor/register-access-subscriptor.component';

export class SubscriptorList {
  constructor(
    public register: number,
    public name: string,
    public paymentStatus: any,
    public condicion: any,
    public dateExpiredVisual: any,
    public planSubscription: string,
    public id: any,
    public cantidad: string
  ) {}
}

@Component({
  selector: 'app-subscriptor-list',
  templateUrl: './subscriptor-list.component.html',
  styleUrls: ['./subscriptor-list.component.css'],
})
export class SubscriptorListComponent implements OnInit {
  subscriptor!: Subscriptor;

  headArray = [
    { Head: 'Registro', FieldName: 'register' },
    // { Head: 'Id', FieldName: 'id' },
    { Head: 'Usos', FieldName: 'cantidad' },
    { Head: 'Nombre', FieldName: 'name' },
    { Head: 'Estado', FieldName: 'paymentStatus' },
    { Head: 'Condicion', FieldName: 'condicion' },
    { Head: 'Fecha Expiracion', FieldName: 'dateExpiredVisual' },
    { Head: 'Plan', FieldName: 'planSubscription' },
    { Head: 'Action', FieldName: '' }, // Activando esta fila aparecen las funciones.
  ];

  subscriptorList: any[] = [];
  searchOptions: MySearchClass[] = [];

  constructor(
    private _customLogger: MyCustomLogger,
    private _router: Router,
    private _dialog: MatDialog,
    private _clientNotificacion: MyClientNotificationService,
    private _subscriptorManagerService: SubscriptorManagerService,
    private _deleteNotificationService: MyDeleterNotificationService
  ) {}

  ngOnInit(): void {
    this.getData();
    this._subscriptorManagerService.refreshData$.subscribe(() => {
      this.getData();
    });
  }

  //? - - - - - - - - -  Parse Data and Get Data - - - - - - - - -

  /**
   * Recibir la informacion y recorrer.
   */
  getData() {
    try {
      this._subscriptorManagerService
        .getAllSubscriptors()
        .pipe(
          map((data: Subscriptor[]) => {
            this._customLogger.logInfo(
              'SuscriptorList',
              'getAllSubscriptors()',
              data
            );

            return data.map((suscriptor: Subscriptor) => ({
              register: suscriptor.getRegisterNumber(),
              name: suscriptor.personalInformation.name,
              paymentStatus: suscriptor.getStatus(),
              condition: suscriptor.getCondition(),
              dateExpiredVisual: suscriptor.getDateExpiration(),
              planSubscription: suscriptor.getPlanSubscription().nombre,
              id: suscriptor.id,
              cantidad: suscriptor.getAmountUsesExpirationVisual(),
            }));
          })
        )
        .subscribe(
          (data) => {
            this.subscriptorList = this._createSubscriptorList(data);
            this.searchOptions = this._createSearchBarList(data);
          },
          (error) => {
            this._customLogger.logError('SubscriptorList, getData', error);
          }
        );
    } catch (error) {
      this._customLogger.logError('SubscriptorList, getData', error);
    }
  }

  /**
   *
   * @param data
   * @returns Array de SubscriptorList con la data lista para mostrar. SubscriptorList[]
   */
  private _createSubscriptorList(data: any[]): SubscriptorList[] {
    return data.map(
      (item) =>
        new SubscriptorList(
          item.register,
          item.name,
          item.paymentStatus,
          item.condition,
          Helper.ParseDate(item.dateExpiredVisual),
          item.planSubscription,
          item.id,
          item.cantidad
        )
    );
  }

  /**
   * Crear optionList para searchBar.
   * @param data
   * @returns MySearchClass[]
   */
  private _createSearchBarList(data: any[]): MySearchClass[] {
    return data.map(
      (sub) => new MySearchClass(`${sub.name} -  ${sub.register}`, sub.id)
    );
  }

  //? - - - - - - - - -  Functions - - - - - - - - -

  onViewSubscriptor(item: any) {
    this._customLogger.logDebug('onViewSubscriptor()', 'subscriptor', item);
    // Todo Modificar las rutas para que sean mas dinamicas.
    this._router.navigate(['suscriptores/' + item.id]);
  }

  /**
   * Registrar un acceso.
   * @param item Subscriptor
   */
  onRegisterAccess(item: Subscriptor) {
    // 1° Llamar subscriptor id
    this._subscriptorManagerService
      .getSubscriptorById(item.id)
      .subscribe((subcriptor) => {
        this.subscriptor = subcriptor;
      });

    // 2° Abrir Componente Register Access. Parsear info.
    const dialogRef = this._dialog.open(RegisterAccessSubscriptorComponent, {
      data: new RegisterAccessSubscriptor(
        // this.subscriptor.personalInformation.name,
        // this.subscriptor.personalInformation.profileImage,
        // this.subscriptor.getStatus(),
        // this.subscriptor.getCondition(),
        // this.subscriptor.getStatusObject().color,
        // this.subscriptor.getDateExpiration(),
        // this.subscriptor.getPlanSubscription().nombre,
        // this.subscriptor.id,
        // this.subscriptor.getRegisterNumber()
        this.subscriptor
      ),
    });
    dialogRef;
  }

  onDeleteSubscriptor(item: any) {
    this._customLogger.logDebug('onDeleteSubscriptor()', 'subscriptor', item);
    const dialogRef = this._dialog.open(MyDeleteComponent, {
      data: `al suscriptor ${item.name}`,
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        try {
          this._customLogger.logDebug(
            'SubscritporsListComponent',
            'onDeleteSubscriptor',
            item
          );

          // Eliminar en el servicio y hacer un nuevo llamado para ver la lista actualizada.
          this._subscriptorManagerService
            .deleteSubscriptorById(item.id)
            .subscribe(() => {
              this._deleteNotificationService.success(item.id);
            });

          //! Viejo. Sin renderizar denuevo.
          // this._subscriptorManagerService.deleteSubscriptorById(item.id);
          // this._deleteNotificationService.success(item.id); // Todo no deberia ser dentro del subscribe?
        } catch (error) {
          this._customLogger.logError(
            'MyDeleteComponent',
            error,
            `onDeleteSubscriptor(). Eliminando: ${item}`
          );
          this._deleteNotificationService.error(item.id); // Todo no deberia ser dentro del subscribe?
        }
      }
    });
  }

  onFreezeSubscriptor(item: Subscriptor) {
    this._customLogger.logDebug(
      'MyMainLayoutComponent',
      'onFreezeSubscriptor()'
    );

    const dialogRef = this._dialog.open(FormFreezeSubComponent, {
      data: {
        id: item.id,
      },
    });

    // Renderizar los cambios cuando cierra. Llamar getData()
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    });
  }

  /**
   * Barra search. Cuando selecciona uno, abre el registerAccessComponent.
   * @param selectedOption
   */
  onOptionSelected(selectedOption: MySearchClass) {
    this._customLogger.logDebug(
      'EjemploMySearchBarComponent',
      'Option Selected:',
      selectedOption
    );

    // 1° Buscar el subscriptor id
    this._subscriptorManagerService
      .getSubscriptorById(selectedOption.value)
      .subscribe((subcriptor) => {
        this.subscriptor = subcriptor;
      });

    // 2° Abrir Componente Register Access. Parsear info.
    const dialogRef = this._dialog.open(RegisterAccessSubscriptorComponent, {
      data: new RegisterAccessSubscriptor(
        // this.subscriptor.personalInformation.name,
        // this.subscriptor.personalInformation.profileImage,
        // this.subscriptor.getStatus(),
        // this.subscriptor.getCondition(),
        // this.subscriptor.getStatusObject().color,
        // this.subscriptor.getDateExpiration(),
        // this.subscriptor.getPlanSubscription().nombre,
        // this.subscriptor.id,
        // this.subscriptor.getRegisterNumber()
        this.subscriptor
      ),
    });
    dialogRef;
  }

  /**
   * Abrir formulario para editar un susbcriptor.
   */
  onEditSubscriptor(item: any) {
    this._customLogger.logDebug('MyMainLayoutComponent', 'onEditSubscriptor()');

    const dialogRef = this._dialog.open(FormCreateSubComponent, {
      data: new DataFormSubscriptor(item.id),
    });
  }
}

// subscriptorList: any[] = [
//   {
//     name: 'juan',
//     register: 100,
//     paymentStatus: 'completado',
//     dateExpriedVisual: '101010',
//     planSubscription: 'premium',
//     id: 1,
//   },
// ];

//? Hardoced Data para probar en getData()
// register: 11111,
// name: 'juan',
// paymentStatus: IPaymentStatus.COMPLETADO,
// dateExpiredVisual: new Date('2023 10 10'),
// planSubscription: 'plan premium',
// id: "sa2flsafsaID",
// searchOptions: IMySearch[] = [
//   { label: 'John', value: 1 },
//   { label: 'Mary', value: 2 },
//   { label: 'David', value: 3 },
//   { label: 'Rachel', value: 4 },
//   { label: 'Michael', value: 5 },
// ];
