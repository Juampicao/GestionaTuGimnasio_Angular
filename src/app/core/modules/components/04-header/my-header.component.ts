import { Component, Input, OnInit } from '@angular/core';

export interface headerSize {
  number: '1' | '2' | '3' | '4' | '5';
}
@Component({
  selector: 'app-my-header',
  templateUrl: './my-header.component.html',
  styleUrls: ['./my-header.component.css'],
})
export class MyHeaderComponent implements OnInit {
  @Input() title: string = 'Titulo';
  @Input() size: number = 1;
  @Input() isBackButton: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}
