import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMenuNavbarComponent } from './my-menu-navbar.component';

describe('MyMenuNavbarComponent', () => {
  let component: MyMenuNavbarComponent;
  let fixture: ComponentFixture<MyMenuNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMenuNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMenuNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
