import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-table-paginator',
  templateUrl: './my-table-paginator.component.html',
  styleUrls: ['./my-table-paginator.component.css'],
})
export class MyTablePaginatorComponent implements OnInit {
  isLoading: boolean = false;
  @Input() indexNumber: boolean = true;
  @Input() BackgroundColor: string = 'bg-white';
  @Input() HeadBackgroundColor: string = 'bg-blue-500';
  @Input() HeadTextColor: string = 'text-white';
  @Input() Title: string = 'Tabla';
  @Input() HeadArray: any[] = [];
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

  //?  - - - - - - - Paginator info - - - - - - -

  // initialData: pruebaMatPaginator[] = [
  //   { id: 1, name: 'Juan' },
  //   { id: 2, name: 'Pedro' },
  //   { id: 3, name: 'Maria' },
  // ];

  // displayedColumns: string[] = ['id', 'name'];

  initialData: any[] = [
    {
      register: 100,
      name: 'juan',
      paymentStatus: 'completado',
      condicion: 'habilitado',
      dateExpiredVisual: '23-08-2023',
      planSubscription: 'premium',
      id: 2,
      actions: 'a',
    },
    {
      register: 2424,
      name: 'AAA',
      paymentStatus: 'deuda',
      condicion: 'habilitado',
      dateExpiredVisual: '10-10-2020',
      planSubscription: 'premium',
      id: 1,
      actions: 'a',
    },
    {
      register: 5423,
      name: 'BBB',
      paymentStatus: 'completado',
      condicion: 'inhabilitado',
      dateExpiredVisual: '"05-10-2023"',
      planSubscription: 'premium',
      id: 4,
      actions: 'a',
    },
  ];

  headArray = [
    { Head: 'Registro', FieldName: 'register' },
    { Head: 'Id', FieldName: 'id' },
    { Head: 'Nombre', FieldName: 'name' },
    { Head: 'Estado', FieldName: 'paymentStatus' },
    { Head: 'Condicion', FieldName: 'condicion' },
    { Head: 'Fecha Expiracion', FieldName: 'dateExpiredVisual' },
    { Head: 'Plan', FieldName: 'planSubscription' },
    { Head: 'Action', FieldName: 'actions' }, // Activando esta fila aparecen las funciones.
  ];

  // displayedHeaders: string[] = [
  //   'register',
  //   'id',
  //   'name',
  //   'paymentStatus',
  //   'condicion',
  //   'dateExpiredVisual',
  //   'planSubscription',
  //   '',
  // ];

  displayedHeaders: string[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageIndex = 0;
  pageSize = 10;
  totalItems = 0;
  pageEvent!: PageEvent;

  constructor() {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {
    this.createPaginator();
  }

  /**
   * Crear paginador.
   */
  createPaginator() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    // this.displayedColumns = this.headArray.map((item) => item.FieldName);
    this.headArray.forEach((column) => {
      if (column.FieldName) {
        this.displayedHeaders.push(column.FieldName);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.initialData);

    this.totalItems = this.dataSource.data.length;
    this.createPaginator();
  }

  /**
   * Aplicar filtro a la tabla.
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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
