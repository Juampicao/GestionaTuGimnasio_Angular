import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubRegisterAccessComponent } from './view-sub-register-access.component';

describe('ViewSubRegisterAccessComponent', () => {
  let component: ViewSubRegisterAccessComponent;
  let fixture: ComponentFixture<ViewSubRegisterAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubRegisterAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSubRegisterAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
