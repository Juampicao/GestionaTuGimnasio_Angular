import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-cancel-button',
  templateUrl: './my-cancel-button.component.html',
  styleUrls: ['./my-cancel-button.component.css'],
})
export class MyCancelButtonComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
