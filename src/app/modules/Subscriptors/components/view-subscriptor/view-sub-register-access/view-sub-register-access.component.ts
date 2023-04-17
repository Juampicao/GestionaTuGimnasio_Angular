import { Component, OnInit } from '@angular/core';
import { MyCustomLogger } from 'src/app/core/services/log/my-custom-logger';
import { SUBSCRIPTOR_1_DEFAULT } from 'src/app/modules/data/mockData/subscriptor/SubscriptorDefaultData';
import { IRegisterAccessNotes } from 'src/app/modules/Models/Subscriptor/.subscription/interface/IRegisterAccessNotes';
import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';
import { ViewSubscriptorService } from '../services/view-subscriptor.service';

class VisualSubRegisterAccess {
  notes: IRegisterAccessNotes[] = [];
  length: number = 0;

  constructor(subscriptor: Subscriptor) {
    this.notes = subscriptor.getNotesRegisterAccess();
    this.length = this.notes.length;
  }

  get duration(): number | null {
    return this.duration;
  }
}

@Component({
  selector: 'app-view-sub-register-access',
  templateUrl: './view-sub-register-access.component.html',
  styleUrls: ['./view-sub-register-access.component.css'],
})
export class ViewSubRegisterAccessComponent implements OnInit {
  public isLoading: boolean = true;

  notesList: VisualSubRegisterAccess = new VisualSubRegisterAccess(
    SUBSCRIPTOR_1_DEFAULT
  );

  constructor(
    private _customLogger: MyCustomLogger,
    private _subscriptorViewService: ViewSubscriptorService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.isLoading = false;
  }
  /**
   * Recibir la informacion y recorrer.
   */
  getData() {
    try {
      const subscriptor = this._subscriptorViewService.getSubscriptor();
      this.notesList = new VisualSubRegisterAccess(subscriptor);
      this._customLogger.logDebug(
        'View-Sub-RegisterNotes, notes:',
        this.notesList
      );
    } catch (error) {
      this._customLogger.logError('VisualSubRegisterAccess, getData', error);
    }
  }
}
