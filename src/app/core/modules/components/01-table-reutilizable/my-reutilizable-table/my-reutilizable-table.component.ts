import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';

export interface IHeadArrayTableReutilizable {
  Head: string;
  FieldName: string;
  ClassName?: string;
  ButtonTemplate?: any;
}

@Component({
  selector: 'app-my-reutilizable-table',
  templateUrl: './my-reutilizable-table.component.html',
  styleUrls: ['./my-reutilizable-table.component.css'],
})
export class MyReutilizableTableComponent implements OnInit {
  isLoading: boolean = false;
  @Input() indexNumber: boolean = true;
  @Input() BackgroundColor: string = 'bg-white';
  @Input() HeadBackgroundColor: string = 'bg-blue-500';
  @Input() HeadTextColor: string = 'text-white';
  @Input() Title: string = '';
  @Input() HeadArray: IHeadArrayTableReutilizable[] = [];
  @Input() GridArray: any[] = [];

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onView = new EventEmitter<any>();

  @Input() labelFunction1: string | undefined;
  @Input() labelFunction2: string | undefined;
  @Input() labelFunction3: string | undefined;

  @Input() iconFunction1: string | undefined;
  @Input() iconFunction2: string | undefined;
  @Input() iconFunction3: string | undefined;

  @Output() onFunction1 = new EventEmitter<any>();
  @Output() onFunction2 = new EventEmitter<any>();
  @Output() onFunction3 = new EventEmitter<any>();

  constructor(_customLogger: MyCustomLogger) {}

  ngOnInit(): void {}

  edit(item: any) {
    this.onEdit.emit(item);
  }

  delete(item: any) {
    this.onDelete.emit(item);
  }

  view(item: any) {
    this.onView.emit(item);
  }

  function1(item: any) {
    this.onFunction1.emit(item);
  }

  function2(item: any) {
    this.onFunction2.emit(item);
  }

  function3(item: any) {
    this.onFunction3.emit(item);
  }

  /**
   * Verifica si le pasaron algun boton extra para renderizarlo en el html.
   * @returns boolean
   */
  hasButtonTemplate(): boolean {
    return this.HeadArray.some((head) => head.ButtonTemplate);
  }
}
