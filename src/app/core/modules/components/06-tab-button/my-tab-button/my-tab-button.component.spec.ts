import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTabButtonComponent } from './my-tab-button.component';

describe('MyTabButtonComponent', () => {
  let component: MyTabButtonComponent;
  let fixture: ComponentFixture<MyTabButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTabButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTabButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
