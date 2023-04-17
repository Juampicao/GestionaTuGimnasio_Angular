import { Dialog } from '@angular/cdk/dialog';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MyDeleteComponent } from 'src/app/core/modules/components/03-delete/my-delete.component';

@Component({
  selector: 'app-todo-drag-drop',
  templateUrl: './todo-drag-drop.component.html',
  styleUrls: ['./todo-drag-drop.component.css'],
})
export class TodoDragDropComponent implements OnInit {
  newTask: string = '';

  todo = [
    'Plan de entrenamiento',
    'Compra de equipamiento',
    'Reserva de sala',
    'Contactar nuevos clientes',
  ];
  process = [
    'Atencion a clientes',
    'Evaluacion de progreso',
    'Diseño de rutinas',
  ];
  done = [
    'Entrenamiento personalizado',
    'Seguimiento de resultados',
    'Facturacion y pagos',
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    public dialog: Dialog // public deleteService: MyDeleteComponent
  ) {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  deleteTaskTodo(index: number) {
    this.todo.splice(index, 1);
    this.cdr.detectChanges(); // actualiza la vista después de eliminar el elemento
  }
  deleteTaskDone(index: number) {
    this.done.splice(index, 1);
    this.cdr.detectChanges(); // actualiza la vista después de eliminar el elemento
  }

  deleteTaskProcess(index: number) {
    this.confirmDelete();

    //   this.process.splice(index, 1);
    // this.cdr.detectChanges(); // actualiza la vista después de eliminar el elemento
  }

  onAddTask() {
    this.todo.push(this.newTask);
  }

  confirmDelete() {
    this.dialog.open(MyDeleteComponent, {
      data: 'eliminar esto?',
    });
  }
}
