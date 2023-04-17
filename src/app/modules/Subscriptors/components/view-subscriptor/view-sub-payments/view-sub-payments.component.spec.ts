import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubPaymentsComponent } from './view-sub-payments.component';

describe('ViewSubPaymentsComponent', () => {
  let component: ViewSubPaymentsComponent;
  let fixture: ComponentFixture<ViewSubPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSubPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
