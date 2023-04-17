import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCancelButtonComponent } from './my-cancel-button.component';

describe('MyCancelButtonComponent', () => {
  let component: MyCancelButtonComponent;
  let fixture: ComponentFixture<MyCancelButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCancelButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCancelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
