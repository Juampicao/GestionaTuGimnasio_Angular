import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSubscriptorListComponent } from './table-subscriptor-list.component';

describe('TableSubscriptorListComponent', () => {
  let component: TableSubscriptorListComponent;
  let fixture: ComponentFixture<TableSubscriptorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSubscriptorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSubscriptorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
