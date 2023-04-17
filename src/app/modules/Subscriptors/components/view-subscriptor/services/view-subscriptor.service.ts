import { Injectable } from '@angular/core';
import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';

@Injectable({
  providedIn: 'root',
})
export class ViewSubscriptorService {
  subscriptor!: Subscriptor;

  constructor() {}

  getSubscriptor(): Subscriptor {
    return this.subscriptor;
  }

  setSubscriptor(subscriptor: Subscriptor) {
    this.subscriptor = subscriptor;
  }
}
