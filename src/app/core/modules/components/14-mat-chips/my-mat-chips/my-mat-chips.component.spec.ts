import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMatChipsComponent } from './my-mat-chips.component';

describe('MyMatChipsComponent', () => {
  let component: MyMatChipsComponent;
  let fixture: ComponentFixture<MyMatChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMatChipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMatChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
