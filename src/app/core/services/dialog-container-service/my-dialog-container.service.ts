// import { Injectable } from '@angular/core';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { MyDialogContainerComponent } from '../../modules/components/10-dialog-container/my-dialog-container/my-dialog-container.component';

// @Injectable({
//   providedIn: 'root',
// })
// export class MyDialogService {
//   constructor(private dialog: MatDialog) {}

//   // openDialog(componentType: ComponentType<any>, data?: any): void {
//   //   const dialogRef: MatDialogRef<MyDialogContainerComponent> =
//   //     this.dialog.open(MyDialogContainerComponent, {
//   //       width: '500px',
//   //       data: data,
//   //     });
//   //   dialogRef.componentInstance.component = componentType;
//   // }

//   // openDialog(
//   //   componentType: any,
//   //   data?: any
//   // ): MatDialogRef<MyDialogContainerComponent> {
//   //   const dialogRef = this.dialog.open(MyDialogContainerComponent, {
//   //     width: '500px',
//   //     data: data,
//   //   });
//   //   dialogRef.componentInstance.component = componentType;
//   //   return dialogRef;
//   // }
//   // openDialog(componentType: ComponentType<any>, data?: any): void {
//   //   const dialogRef: MatDialogRef<MyDialogContainerComponent> =
//   //     this.dialog.open(MyDialogContainerComponent, {
//   //       width: '500px',
//   //       data: data,
//   //     });
//   //   dialogRef.componentInstance.component = componentType;
//   // }

//   openDialog(
//     componentType: any,
//     data?: any
//   ): MatDialogRef<MyDialogContainerComponent> {
//     const dialogRef = this.dialog.open(MyDialogContainerComponent, {
//       width: '500px',
//       data: data,
//     });
//     dialogRef.componentInstance.component = componentType;
//     return dialogRef;
//   }
// }

import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { MyDialogContainerComponent } from '../../modules/components/10-dialog-container/my-dialog-container/my-dialog-container.component';

@Injectable({
  providedIn: 'root',
})
export class MyDialogService {
  constructor(private injector: Injector) {}

  open<T>(
    component: Type<T>,
    data?: any
  ): ComponentRef<MyDialogContainerComponent> {
    const containerFactory = this.injector
      .get(ComponentFactoryResolver)
      .resolveComponentFactory(MyDialogContainerComponent);
    const componentFactory = this.injector
      .get(ComponentFactoryResolver)
      .resolveComponentFactory(component);

    const containerRef = containerFactory.create(this.injector);
    const componentRef = componentFactory.create(this.injector);

    containerRef.instance.insert(componentRef);
    containerRef.instance.data = data;

    const componentRootNode = componentRef.location.nativeElement;

    document.body.appendChild(componentRootNode);

    return containerRef;
  }
}
