import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-back-button',
  templateUrl: './my-back-button.component.html',
  styleUrls: ['./my-back-button.component.css'],
})
export class MyBackButtonComponent {
  // @Input() label = 'Back';
  @Input() label = '';

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
