import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptorComponent } from './subscriptor.component';

describe('SubscriptorComponent', () => {
  let component: SubscriptorComponent;
  let fixture: ComponentFixture<SubscriptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
