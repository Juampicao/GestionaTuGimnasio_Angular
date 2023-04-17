import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateSubComponent } from './form-create-sub.component';

describe('FormCreateSubComponent', () => {
  let component: FormCreateSubComponent;
  let fixture: ComponentFixture<FormCreateSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreateSubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
