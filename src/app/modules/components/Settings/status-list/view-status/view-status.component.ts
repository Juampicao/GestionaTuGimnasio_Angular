import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-status',
  templateUrl: './view-status.component.html',
  styleUrls: ['./view-status.component.css'],
})
export class ViewStatusComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {
    console.info('view-status data:', this.data);
  }

  ngOnInit(): void {}
}
