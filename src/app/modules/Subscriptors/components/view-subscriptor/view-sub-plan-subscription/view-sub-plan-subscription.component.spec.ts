import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubPlanSubscriptionComponent } from './view-sub-plan-subscription.component';

describe('ViewSubPlanSubscriptionComponent', () => {
  let component: ViewSubPlanSubscriptionComponent;
  let fixture: ComponentFixture<ViewSubPlanSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubPlanSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSubPlanSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
