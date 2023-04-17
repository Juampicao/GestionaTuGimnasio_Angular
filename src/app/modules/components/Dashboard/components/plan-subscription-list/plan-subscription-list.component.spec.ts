import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSubscriptionListComponent } from './plan-subscription-list.component';

describe('PlanSubscriptionListComponent', () => {
  let component: PlanSubscriptionListComponent;
  let fixture: ComponentFixture<PlanSubscriptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanSubscriptionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanSubscriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
