import { Component, Input, OnInit, Type } from '@angular/core';
export interface ITabList {
  title: string;
  explanation: Type<any>;
  icon: string;
  active?: boolean;
}
@Component({
  selector: 'app-my-tab-button',
  templateUrl: './my-tab-button.component.html',
  styleUrls: ['./my-tab-button.component.css'],
})
export class MyTabButtonComponent implements OnInit {
  @Input() tabList!: ITabList[];

  constructor() {
    console.log(this.tabList);
  }

  ngOnInit(): void {}
}
