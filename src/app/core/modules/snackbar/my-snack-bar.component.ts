import { Component, Inject, OnInit } from '@angular/core';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

//? INotificationType
export interface INotificationType {
  type: 'success' | 'error' | 'info' | 'notfunction';
}

//? IDataSnackBar
export interface IDataSnackBar {
  message: string;
  type: INotificationType['type'];
}

@Component({
  selector: 'app-my-snack-bar',
  templateUrl: './my-snack-bar.component.html',
  styleUrls: ['./my-snack-bar.component.css'],
})
export class MySnackBarComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: IDataSnackBar) {}

  public get type(): string {
    return this.data.type;
  }

  ngOnInit(): void {}
}
