import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubscriptorComponent } from './view-subscriptor.component';

describe('ViewSubscriptorComponent', () => {
  let component: ViewSubscriptorComponent;
  let fixture: ComponentFixture<ViewSubscriptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubscriptorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSubscriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
