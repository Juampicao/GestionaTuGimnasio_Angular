import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreatePlanSubscriptionComponent } from './form-create-plan-subscription.component';

describe('FormCreatePlanSubscriptionComponent', () => {
  let component: FormCreatePlanSubscriptionComponent;
  let fixture: ComponentFixture<FormCreatePlanSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreatePlanSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreatePlanSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
