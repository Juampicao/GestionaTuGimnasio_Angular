import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMainLayoutComponent } from './my-main-layout.component';

describe('MyMainLayoutComponent', () => {
  let component: MyMainLayoutComponent;
  let fixture: ComponentFixture<MyMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMainLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
