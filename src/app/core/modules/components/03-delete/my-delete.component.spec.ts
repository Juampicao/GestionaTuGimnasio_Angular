import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDeleteComponent } from './my-delete.component';

describe('MyDeleteComponent', () => {
  let component: MyDeleteComponent;
  let fixture: ComponentFixture<MyDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
