//! Vieja con provider.
// import {
//   Component,
//   ComponentFactoryResolver,
//   Input,
//   Type,
//   ViewChild,
//   ViewContainerRef,
// } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
// import { MyClientNotificationService } from 'src/app/core/services/client-notificacion/my-client-notification.service';
// import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';

// @Component({
//   selector: 'app-my-dialog-container',
//   templateUrl: './my-dialog-container.component.html',
//   styleUrls: ['./my-dialog-container.component.css'],
// })
// export class MyDialogContainerComponent {
//   @ViewChild('componentContainer', { read: ViewContainerRef })
//   componentContainer!: ViewContainerRef;
//   @Input() component!: Type<any>;
//   @Input() data: any;

//   constructor(
//     public dialogRef: MatDialogRef<MyDialogContainerComponent>,
//     private componentFactoryResolver: ComponentFactoryResolver,
//     private _customLogger: MyCustomLogger,
//     private _clientNotification: MyClientNotificationService
//   ) {}

//   ngAfterViewInit(): void {
//     try {
//       const componentFactory =
//         this.componentFactoryResolver.resolveComponentFactory(this.component);
//       const componentRef =
//         this.componentContainer.createComponent(componentFactory);
//       const instance = componentRef.instance;
//       if (this.data) {
//         Object.keys(this.data).forEach((key) => {
//           instance[key] = this.data[key];
//         });
//       }
//     } catch (error) {
//       this._clientNotification.openNotification(
//         'Error en dialogContainer',
//         'error'
//       );
//       this._customLogger.logError('MyDialogContainer', error);
//     }
//   }
// }

// // ! Nueva
// import {
//   Component,
//   ComponentFactoryResolver,
//   Injector,
//   Type,
//   ViewChild,
//   ViewContainerRef,
// } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-my-dialog-container',
//   templateUrl: './my-dialog-container.component.html',
//   styleUrls: ['./my-dialog-container.component.css'],
// })
// export class MyDialogContainerComponent {
//   @ViewChild('container', { read: ViewContainerRef })
//   container!: ViewContainerRef;
//   public component!: Type<any>;

//   constructor(
//     private _resolver: ComponentFactoryResolver,
//     private _injector: Injector,
//     private _dialogRef: MatDialogRef<MyDialogContainerComponent>
//   ) {}

//   ngOnInit(): void {
//     const factory = this._resolver.resolveComponentFactory(this.component);
//     const componentRef = factory.create(this._injector);
//     this.container.insert(componentRef.hostView);
//   }

//   onClose() {
//     this._dialogRef.close();
//   }
// }

// !3°
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-my-dialog-container',
  templateUrl: './my-dialog-container.component.html',
  styleUrls: ['./my-dialog-container.component.css'],
})
export class MyDialogContainerComponent {
  // @ViewChild('container', { read: ViewContainerRef })
  // container!: ViewContainerRef;

  // component!: Type<any>;
  // data: any;

  // contentRef!: ComponentRef<any>; // Agregar esta línea

  // constructor(private resolver: ComponentFactoryResolver) {}
  // insert(componentRef: ComponentRef<any>): void {
  //   this.contentRef.clear();
  //   this.contentRef.insert(componentRef.hostView);
  // }
  // ngAfterViewInit(): void {
  //   const factory = this.resolver.resolveComponentFactory(this.component);
  //   this.contentRef = this.container.createComponent(factory);
  //   this.contentRef.instance.data = this.data;
  // }

  // close() {
  //   this.contentRef.destroy();
  // }
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  component!: any;
  data: any;

  contentRef!: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver) {}

  insert(componentRef: ComponentRef<any>): void {
    this.contentRef?.destroy();
    this.contentRef = componentRef;
    this.container.insert(componentRef.hostView);
  }

  close(): void {
    this.contentRef?.destroy();
  }
}
