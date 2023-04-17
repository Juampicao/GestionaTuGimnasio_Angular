import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';

@Component({
  selector: 'app-my-confirm',
  templateUrl: './my-confirm.component.html',
  styleUrls: ['./my-confirm.component.css'],
})
export class MyConfirmComponent implements OnInit {
  message: string;

  @Output() onDeleted: EventEmitter<string> = new EventEmitter<string>();
  @Output() onError: EventEmitter<string> = new EventEmitter<string>();
  @Output() elementDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any = '',
    private _customLogger: MyCustomLogger,
    public _dialog: MatDialogRef<MyConfirmComponent>
  ) {
    this.message = data;
    this._customLogger.logDebug(
      'MyConfirmComponent, onInit',
      'data:',
      this.data
    );
  }

  ngOnInit(): void {}

  close() {
    this._dialog.close();
  }
}
