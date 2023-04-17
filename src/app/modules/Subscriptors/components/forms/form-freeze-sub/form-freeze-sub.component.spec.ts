import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFreezeSubComponent } from './form-freeze-sub.component';

describe('FormFreezeSubComponent', () => {
  let component: FormFreezeSubComponent;
  let fixture: ComponentFixture<FormFreezeSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFreezeSubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFreezeSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
