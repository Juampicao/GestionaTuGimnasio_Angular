import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../../Shared/shared.module';
import { FormStatusComponent } from './forms/form-status/form-status.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { StatusListComponent } from './status-list/status-list.component';
import { TodoDragDropComponent } from './todo-drag-drop/todo-drag-drop.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { ViewStatusComponent } from './status-list/view-status/view-status.component';

@NgModule({
  declarations: [
    SettingsComponent,
    UserRolesComponent,
    TodoDragDropComponent,
    //! Status
    StatusListComponent,
    FormStatusComponent,
    ViewStatusComponent,
  ],
  imports: [CommonModule, SettingsRoutingModule, SharedModule, CoreModule],
  providers: [
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
    MatDialog,
  ],
})
export class SettingsModule {}
