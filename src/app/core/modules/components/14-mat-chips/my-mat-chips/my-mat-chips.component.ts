import { COMMA, ENTER, SEMICOLON, SPACE } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-my-mat-chips',
  templateUrl: './my-mat-chips.component.html',
  styleUrls: ['./my-mat-chips.component.css'],
})
export class MyMatChipsComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA, SPACE, SEMICOLON];

  constructor() {}

  ngOnInit(): void {}

  tagCtrl = new FormControl();
  tagsList: string[] = ['Queso', 'Jamon', 'Tomate'];
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tagsList.push(value);
    }
    event.chipInput!.clear();
    console.info(this.tagsList);
  }

  remove(tag: string): void {
    const index = this.tagsList.indexOf(tag);

    if (index >= 0) {
      this.tagsList.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tagsList.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  removeTag(event: any): void {
    const index = this.tagsList.indexOf(event);

    if (index >= 0) {
      this.tagsList.splice(index, 1);
    }
  }
}
