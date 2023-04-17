import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStatusPruebaComponent } from './form-status-prueba.component';

describe('FormStatusPruebaComponent', () => {
  let component: FormStatusPruebaComponent;
  let fixture: ComponentFixture<FormStatusPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStatusPruebaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormStatusPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
