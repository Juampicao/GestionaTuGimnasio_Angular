import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { IMySearch } from '../../07-search-bar/my-search-bar/my-search-bar.component';
export interface ISelectOption {
  label: string;
  value: any;
}
@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.css'],
})
export class MyInputComponent implements OnInit {
  // @Input() value!: string;
  @Input() ngModel: any;
  @Output() ngModelChange = new EventEmitter<any>();
  @Input() control!: FormControl;
  @Input() label: string = 'titulo';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() icon: string = '';
  @Input() minDate: Date = new Date('1920 01 01');
  @Input() maxDate: Date = new Date('2050 01 01');
  @Input() maxNumber: number = 100000;
  @Input() checked: boolean = true;
  @Input() radioOptions: ISelectOption[] = [
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' },
    { value: 'option3', label: 'Opción 3' },
  ];
  // Select
  @Input() selectOptions!: ISelectOption[];
  @Output() selectionChanged = new EventEmitter<IMySearch>(); // Evento que se emitirá cuando se seleccione una opción

  // File
  @Input() fileName: string = 'sin nombre';

  // @Input() selectOptions: ISelectOption[] = [
  //   { label: '- - Select - -', value: '' },
  // ];
  constructor(private _customLogger: MyCustomLogger) {}

  ngOnInit(): void {}

  onNgModelChange(event: any) {
    this.ngModel = event;
    this.ngModelChange.emit(event);
  }

  displayErrors() {
    const { dirty, touched, errors } = this.control;
    // return (dirty || touched) && errors && errors.dateInvalid;

    return dirty && touched && errors;
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.fileName = file.name;
    this.control.setValue(file);
  }

  onSelectionChange(event: any) {
    // Si cambio el ultimo value, se renderiza en el input, pero no me selecciona..
    const selectedOption = this.selectOptions.find(
      (option) => option.value === event.option.value.value
    );

    console.log('cambiando select..');
    if (selectedOption) {
      this._customLogger.logDebug(
        'MyInputSelect',
        'Option Selected:',
        selectedOption
      );
      // this.myControl.setValue('');
      this.selectionChanged.emit(selectedOption);
    }
  }
}
