import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReutilizableTableComponent } from './my-reutilizable-table.component';

describe('MyReutilizableTableComponent', () => {
  let component: MyReutilizableTableComponent;
  let fixture: ComponentFixture<MyReutilizableTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReutilizableTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyReutilizableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
