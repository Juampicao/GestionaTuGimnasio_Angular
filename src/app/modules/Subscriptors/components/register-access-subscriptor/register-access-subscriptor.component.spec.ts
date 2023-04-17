import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAccessSubscriptorComponent } from './register-access-subscriptor.component';

describe('RegisterAccessSubscriptorComponent', () => {
  let component: RegisterAccessSubscriptorComponent;
  let fixture: ComponentFixture<RegisterAccessSubscriptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAccessSubscriptorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAccessSubscriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
