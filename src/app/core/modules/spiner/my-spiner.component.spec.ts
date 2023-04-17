import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySpinerComponent } from './my-spiner.component';

describe('MySpinerComponent', () => {
  let component: MySpinerComponent;
  let fixture: ComponentFixture<MySpinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySpinerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySpinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
