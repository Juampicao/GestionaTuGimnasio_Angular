import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreatePaymentComponent } from './form-create-payment.component';

describe('FormCreatePaymentComponent', () => {
  let component: FormCreatePaymentComponent;
  let fixture: ComponentFixture<FormCreatePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreatePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreatePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
