import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

// import { NgxChartsModule } from '@swimlane/ngx-charts'; // todo instalar
@NgModule({
  declarations: [],
  imports: [
    // NgxChartsModule, //! Todo Instalar  Graficos estadistica
    //? Importantes de angular
    CommonModule,
    HttpClientModule,
    RouterModule,

    //?  Angular Material
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatDatepickerModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    ClipboardModule, // Copy Clipboard
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    TextFieldModule,
    DragDropModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatChipsModule,
    MatGridListModule,
  ],
  exports: [
    // NgxChartsModule, //! Todo Instalar  Graficos estadistica

    //?  Importantes Angular Material
    RouterModule,
    CommonModule,
    HttpClientModule,

    //?  Angular Material
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatDatepickerModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    ClipboardModule, // Copy Clipboard
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    TextFieldModule,
    DragDropModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatChipsModule,
    MatGridListModule,
  ],
})
export class SharedModule {}
