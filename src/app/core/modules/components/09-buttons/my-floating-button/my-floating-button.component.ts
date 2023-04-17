import { Component, Input, OnInit } from '@angular/core';

export interface IOptionsButtons {
  label: string;
  function: Function;
}

@Component({
  selector: 'app-my-floating-button',
  templateUrl: './my-floating-button.component.html',
})
export class MyFloatingButtonComponent implements OnInit {
  @Input() optionsButtons: IOptionsButtons[] = [
    {
      label: 'ver',
      function: this.onClick,
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  onClick(func: Function) {
    func();
  }
}
