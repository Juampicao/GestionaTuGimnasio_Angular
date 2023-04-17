import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBackButtonComponent } from './my-back-button.component';

describe('MyBackButtonComponent', () => {
  let component: MyBackButtonComponent;
  let fixture: ComponentFixture<MyBackButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBackButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
