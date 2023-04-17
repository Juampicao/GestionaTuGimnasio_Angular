import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptorListComponent } from './subscriptor-list.component';

describe('SubscriptorListComponent', () => {
  let component: SubscriptorListComponent;
  let fixture: ComponentFixture<SubscriptorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
