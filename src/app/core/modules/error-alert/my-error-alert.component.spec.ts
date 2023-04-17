import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyErrorAlertComponent } from './my-error-alert.component';

describe('MyErrorAlertComponent', () => {
  let component: MyErrorAlertComponent;
  let fixture: ComponentFixture<MyErrorAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyErrorAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyErrorAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
