import { Injectable } from '@angular/core';
import { map, Observable, of, Subject, tap, throwError } from 'rxjs';
import { MySearchClass } from 'src/app/core/modules/components/07-search-bar/my-search-bar/my-search-bar.component';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import {
  SUBSCRIPTOR_1_DEFAULT,
  SUBSCRIPTOR_2_DEFAULT,
  SUBSCRIPTOR_3_DEFAULT,
  SUBSCRIPTOR_4_AMOUNT_DEFAULT,
} from 'src/app/modules/data/mockData/subscriptor/SubscriptorDefaultData';
import { PlanSubscription } from 'src/app/modules/Models/PlanSubscription/models/PlanSubscription';
import { PersonalInformation } from 'src/app/modules/Models/Subscriptor/.personal-information/model/PersonalInformation';
import { Subscription } from 'src/app/modules/Models/Subscriptor/.subscription/Subscription';
import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';

import { Helper } from 'src/app/core/services/helper/Helper';
import { CalendarExpirationSubscription } from 'src/app/modules/Models/Subscriptor/.subscription/expiration/model/CalendarExpirationSubscription';
import { ISubscriptionStatus } from 'src/app/modules/Models/Subscriptor/.subscription/interface/ISubscriptionStatus';
import { USER_1_DEFAULT } from 'src/app/modules/Models/ValoresDefault2';
import { ISubscriptorManagerService } from './interface/ISubscriptorManagerService';

@Injectable({
  providedIn: 'root',
})
export class SubscriptorManagerService implements ISubscriptorManagerService {
  private _refreshData$ = new Subject<void>();

  private _subscriptorListToSearch: MySearchClass[] = [];

  private subscriptorList: Subscriptor[] = [
    SUBSCRIPTOR_1_DEFAULT,
    SUBSCRIPTOR_2_DEFAULT,
    SUBSCRIPTOR_3_DEFAULT,
    SUBSCRIPTOR_4_AMOUNT_DEFAULT,
  ];

  constructor(private _customLogger: MyCustomLogger) {
    this._customLogger.logInfo('ContentManagerMock', 'Instanciando Servicio');
  }

  get refreshData$() {
    return this._refreshData$;
  }

  createSubscriptor(
    personalInformation: PersonalInformation,
    planSubscription: PlanSubscription
  ): Observable<Subscriptor> {
    try {
      // Crear un suscriptor con cada objeto..
      let newSubscriptor = new Subscriptor(
        personalInformation,
        new Subscription(
          planSubscription,
          new CalendarExpirationSubscription(
            planSubscription,
            Helper.TodayDate()
          )
        ),
        null,
        USER_1_DEFAULT
      );

      //! Estado Inicial de la subscription
      newSubscriptor.updateStatusManual(ISubscriptionStatus.ALTA);

      // Agregar el nuevo suscriptor a la lista (solo saldra por consola)
      this.subscriptorList.push(newSubscriptor);

      this._customLogger.logInfo(
        'SubscriptorManager, createSubscriptor, creado correctamente:',
        '',
        newSubscriptor
      );

      // Mostrar nueva lista por INFO para verificar que funciona
      this._customLogger.logDebug(
        'La nueva lista de subscriptores es:',
        this.subscriptorList
      );

      // Retornar observable.
      return of(newSubscriptor).pipe(
        tap(() => {
          this.refreshData$.next();
        })
      );
    } catch (error) {
      this._customLogger.logError(
        'SubscriptorManager, createSubscriptor:',
        error
      );
      throw new Error(`${error}`);
    }
  }

  // createSubscriptor(
  //   personalInformation: PersonalInformation,
  //   planSubscription: PlanSubscription
  // ): Observable<Subscriptor> {
  //   try {
  //     // Crear con parametros default.
  //     let newSubscriptor = new Subscriptor(
  //       personalInformation,
  //       SUBSCRIPTION_TIME_DEFAULT_4,
  //       RUTINA_DEFAULT,
  //       1111
  //     );

  //     // Agregar el nuevo suscriptor a la lista (solo saldra por consola)
  //     this.subscriptorList.push(newSubscriptor);

  //     this._customLogger.logDebug(
  //       'SubscriptorManager, createSubscriptor, creado correctamente:',
  //       newSubscriptor
  //     );

  //     // Mostrar nueva lista por INFO para verificar que funciona
  //     this._customLogger.logInfo(
  //       'La nueva lista de subscriptores es:',
  //       '',
  //       this.subscriptorList
  //     );

  //     // Retornar observable.
  //     return of(newSubscriptor).pipe(
  //       tap(() => {
  //         this.refreshData$.next();
  //       })
  //     );
  //   } catch (error) {
  //     this._customLogger.logError(
  //       'SubscriptorManager, createSubscriptor:',
  //       error
  //     );
  //     throw new Error(`${error}`);
  //   }
  // }

  getSubscriptorById(id: any): Observable<Subscriptor> {
    try {
      const subscriptor = this.subscriptorList.find((s) => s.id === id);
      this._customLogger.logDebug(
        'SubscriptorManager, GetSubscriptorById',
        'Todos los suscriptores:',
        this.subscriptorList
      );
      if (subscriptor) {
        return of(subscriptor);
      } else {
        return throwError(`No se encontró un subscriptor con el id ${id}`);
      }
    } catch (error) {
      this._customLogger.logError('getSubscriptorById', error, `id: ${id}`);
      return throwError(`${error}`);
    }
  }

  getAllSubscriptors(): Observable<Subscriptor[]> {
    try {
      let response = this.subscriptorList.slice();
      return of(response);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  deleteSubscriptorById(id: any): Observable<any> {
    try {
      // Encontrar el subscriptor a eliminar.
      const index = this.subscriptorList.findIndex(
        (subscriptor) => subscriptor.id === id
      );

      // Eliminarlo.
      if (index !== -1) {
        this.subscriptorList.splice(index, 1);
        this._customLogger.logDebug(
          'SubscriptorManager, deleteById, eliminado correctamente:',
          index
        );

        // Mostrar nueva lista por INFO para verificar que funciona
        this._customLogger.logInfo(
          'La nueva lista de subscriptores es:',
          '',
          this.subscriptorList
        );

        // return this.getAllSubscriptors();
        return of('exito').pipe(
          tap(() => {
            this.refreshData$.next();
          })
        );
      } else {
        this._customLogger.logError(
          'SubscriptorManager, deleteById, subscriptor no encontrado:',
          id
        );
        throw new Error(`Suscriptor con id ${id} no encotrado.`);
      }
    } catch (error) {
      this._customLogger.logError(
        'SubscriptorManager, deleteSubscriptorById:',
        error
      );
      throw new Error(`${error}`);
    }
  }

  editSubscriptor(subscriptor: Subscriptor): Observable<Subscriptor> {
    const id = subscriptor.id;
    try {
      // Encontrar el subscriptor a editar.
      const subscriptorToEdit = this.subscriptorList.find(
        (sub) => sub.id === id
      );

      if (subscriptorToEdit) {
        // Mostrar nueva lista por INFO para verificar que funciona
        this._customLogger.logInfo('Suscriptro Editado', '', subscriptorToEdit);

        // Retornar el subscriptor Editado.
        return of(subscriptorToEdit).pipe(
          tap(() => {
            this.refreshData$.next();
          })
        );
      }

      throw new Error(`No se encontro ningun suscriptor con el id ${id}`);
    } catch (error) {
      this._customLogger.logError(
        'SubscriptorManager, editSubscriptor:',
        error
      );
      throw new Error(`${error}`);
    }
  }

  /**
   * Funcion de prueba de errores.
   */
  pruebaError(): Observable<any> {
    try {
      throw new Error('Error de prueba');
    } catch (error) {
      this._customLogger.logError(
        'SubscriptorManagerService, deleteSubscriptorById',
        error
      );
      throw new Error(`${error}`);
    }
  }

  /**
   * Toma todos los suscriptores y los retorna listos para un search con un label y un value nada mas.
   * @returns Observable<MySearchClass[]>
   */
  getAllSubscriptorsToSearch(): Observable<MySearchClass[]> {
    try {
      this.getAllSubscriptors()
        .pipe(
          map((data: Subscriptor[]) => {
            return data.map((suscriptor: Subscriptor) => ({
              register: suscriptor.getRegisterNumber(),
              name: suscriptor.personalInformation.name,
              id: suscriptor.id,
            }));
          })
        )
        .subscribe(
          (data) => {
            this._subscriptorListToSearch = this._createSearchBarList(data);
          },
          (error) => {
            this._customLogger.logError(
              'SubscriptorList, getAllSubscriptors',
              error
            );
          }
        );

      return of(this._subscriptorListToSearch);
    } catch (error) {
      this._customLogger.logError(
        'SubscriptorList, getAllSubscriptorsToSearch',
        error
      );
      throw new Error(`${error}`);
    }
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
}

// import { Injectable } from '@angular/core';
// import { Observable, of, throwError } from 'rxjs';
// import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
// import { RUTINA_DEFAULT } from 'src/app/modules/data/mockData/rutina/RutineDefaultData';
// import { SUBSCRIPTION_TIME_DEFAULT_4 } from 'src/app/modules/data/mockData/subscription/SubscriptionDefaultData';
// import {
//   SUBSCRIPTOR_1_DEFAULT,
//   SUBSCRIPTOR_2_DEFAULT,
//   SUBSCRIPTOR_3_DEFAULT,
// } from 'src/app/modules/data/mockData/subscriptor/SubscriptorDefaultData';
// import { PersonalInformation } from 'src/app/modules/Models/Subscriptor/.personal-information/model/PersonalInformation';
// import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';
// import { ISubscriptorManagerService } from './interface/ISubscriptorManagerService';

// @Injectable({
//   providedIn: 'root',
// })
// // export class SubscriptorManagerService implements ISubscriptorManagerService {
// export class SubscriptorManagerService implements ISubscriptorManagerService {
//   private subscriptorList: Subscriptor[] = [
//     SUBSCRIPTOR_1_DEFAULT,
//     SUBSCRIPTOR_2_DEFAULT,
//     SUBSCRIPTOR_3_DEFAULT,
//   ];

//   constructor(private _customLogger: MyCustomLogger) {
//     this._customLogger.logInfo('ContentManagerMock', 'Instanciando Servicio');
//   }

//   getSubscriptorById(id: any): Observable<Subscriptor> {
//     try {
//       const subscriptor = this.subscriptorList.find((s) => s.id === id);
//       this._customLogger.logDebug(
//         'SubscriptorManager, GetSubscriptorById',
//         'Todos los suscriptores:',
//         this.subscriptorList
//       );
//       if (subscriptor) {
//         return of(subscriptor);
//       } else {
//         return throwError(`No se encontró un subscriptor con el id ${id}`);
//       }
//     } catch (error) {
//       this._customLogger.logError('getSubscriptorById', error, `id: ${id}`);
//       return throwError(`${error}`);
//     }
//   }

//   getAllSubscriptors(): Observable<Subscriptor[]> {
//     try {
//       let response = this.subscriptorList.slice();
//       return of(response);
//     } catch (error) {
//       throw new Error(`${error}`);
//     }
//   }

//   deleteSubscriptorById(id: any): Observable<any> {
//     try {
//       // Encontrar el subscriptor a eliminar.
//       const index = this.subscriptorList.findIndex(
//         (subscriptor) => subscriptor.id === id
//       );

//       // Eliminarlo.
//       if (index !== -1) {
//         this.subscriptorList.splice(index, 1);
//         this._customLogger.logDebug(
//           'SubscriptorManager, deleteById, eliminado correctamente:',
//           index
//         );

//         // Mostrar nueva lista por INFO para verificar que funciona
//         this._customLogger.logInfo(
//           'La nueva lista de subscriptores es:',
//           '',
//           this.subscriptorList
//         );

//         // return this.getAllSubscriptors();
//         return of('exito');
//       } else {
//         this._customLogger.logError(
//           'SubscriptorManager, deleteById, subscriptor no encontrado:',
//           id
//         );
//         throw new Error(`Suscriptor con id ${id} no encotrado.`);
//       }
//     } catch (error) {
//       this._customLogger.logError(
//         'SubscriptorManager, deleteSubscriptorById:',
//         error
//       );
//       throw new Error(`${error}`);
//     }
//   }

//   createSubscriptor(
//     personalInformation: PersonalInformation
//   ): Observable<Subscriptor> {
//     try {
//       // Crear con parametros default.
//       let newSubscriptor = new Subscriptor(
//         personalInformation,
//         SUBSCRIPTION_TIME_DEFAULT_4,
//         RUTINA_DEFAULT,
//         1111
//       );

//       // Agregar el nuevo suscriptor a la lista (solo saldra por consola)
//       this.subscriptorList.push(newSubscriptor);

//       this._customLogger.logDebug(
//         'SubscriptorManager, createSubscriptor, creado correctamente:',
//         newSubscriptor
//       );

//       // Mostrar nueva lista por INFO para verificar que funciona
//       this._customLogger.logInfo(
//         'La nueva lista de subscriptores es:',
//         '',
//         this.subscriptorList
//       );

//       // Retornar observable.
//       return of(newSubscriptor);
//     } catch (error) {
//       this._customLogger.logError(
//         'SubscriptorManager, createSubscriptor:',
//         error
//       );
//       throw new Error(`${error}`);
//     }
//   }

//   editSubscriptor(subscriptor: Subscriptor): Observable<Subscriptor> {
//     const id = subscriptor.id;
//     try {
//       // Encontrar el subscriptor a editar.
//       const subscriptorToEdit = this.subscriptorList.find(
//         (sub) => sub.id === id
//       );

//       if (subscriptorToEdit) {
//         // Mostrar nueva lista por INFO para verificar que funciona
//         this._customLogger.logInfo(
//           'La nueva lista de subscriptores es:',
//           '',
//           this.subscriptorList
//         );

//         // Retornar el subscriptor Editado.
//         return of(subscriptorToEdit);
//       }

//       throw new Error(`No se encontro ningun suscriptor con el id ${id}`);
//     } catch (error) {
//       this._customLogger.logError(
//         'SubscriptorManager, editSubscriptor:',
//         error
//       );
//       throw new Error(`${error}`);
//     }
//   }

//   pruebaError(): Observable<any> {
//     try {
//       throw new Error('Error de prueba');
//     } catch (error) {
//       this._customLogger.logError(
//         'SubscriptorManagerService, deleteSubscriptorById',
//         error
//       );
//       throw new Error(`${error}`);
//     }
//   }
// }
