import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrRegisterAccessComponent } from './qr-register-access.component';

describe('QrRegisterAccessComponent', () => {
  let component: QrRegisterAccessComponent;
  let fixture: ComponentFixture<QrRegisterAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrRegisterAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrRegisterAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
