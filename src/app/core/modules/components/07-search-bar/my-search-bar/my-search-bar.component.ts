import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';

export interface IMySearch {
  label: string;
  value: any;
  [x: string]: any;
}

export class MySearchClass implements IMySearch {
  label: string;
  /**
   * Id (generalmente)
   */
  value: any;

  /**
   * @param label muestra el mensaje.
   * @param value id (generalmente)
   */
  constructor(label: string, value: any) {
    this.label = label;
    this.value = value;
  }
}

@Component({
  selector: 'app-my-search-bar',
  templateUrl: './my-search-bar.component.html',
  styleUrls: ['./my-search-bar.component.css'],
})
export class MySearchBarComponent implements OnInit {
  myControl = new FormControl<IMySearch | string>('');

  // @Input() options: IMySearch[] = [];
  @Input() options: MySearchClass[] = [];

  @Input() title: string = 'Buscar';

  // filteredOptions!: Observable<IMySearch[]>;
  filteredOptions!: Observable<MySearchClass[]>;

  @Input() isOptionList: boolean = true;
  @Output() selectionChanged = new EventEmitter<IMySearch>(); // Evento que se emitirá cuando se seleccione una opción

  constructor(private _customLogger: MyCustomLogger) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const label = typeof value === 'string' ? value : value?.label;
        return label ? this._filter(label as string) : this.options.slice();
      })
    );
  }

  displayFn(option: IMySearch): string {
    return option && option.label ? option.label : '';
  }

  private _filter(label: string): IMySearch[] {
    const filterValue = label.toLowerCase();

    return this.options.filter((option) =>
      option.label.toLowerCase().includes(filterValue)
    );
  }

  onOptionSelected(event: any) {
    // onClear(). Reiniciar valor.
    if (event.option.value === null) {
      this.myControl.setValue('');
      this.selectionChanged.emit(undefined);
      return;
    }

    // Si cambio el ultimo value, se renderiza en el input, pero no me selecciona..
    const selectedOption = this.options.find(
      (option) => option.value === event.option.value.value
    );
    if (selectedOption) {
      this._customLogger.logDebug(
        'mySearchBar',
        'Option Selected:',
        selectedOption
      );
      this.myControl.setValue(selectedOption);
      // this.myControl.setValue('');
      this.selectionChanged.emit(selectedOption);
    }
  }

  onClear() {
    this.myControl.setValue('');
    this.onOptionSelected(null);
  }
}
