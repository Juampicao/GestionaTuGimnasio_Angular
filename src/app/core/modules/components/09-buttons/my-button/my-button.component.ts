import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.css'],
})
export class MyButtonComponent implements OnInit {
  @Input() icon: any;
  @Input() title!: string;
  @Input() click!: Function;
  @Input() class!: string;

  constructor() {}

  ngOnInit(): void {}

  onClick(func: Function) {
    func();
  }
}
