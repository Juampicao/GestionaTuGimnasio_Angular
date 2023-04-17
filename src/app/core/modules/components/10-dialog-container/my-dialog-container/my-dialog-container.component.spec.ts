import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDialogContainerComponent } from './my-dialog-container.component';

describe('MyDialogContainerComponent', () => {
  let component: MyDialogContainerComponent;
  let fixture: ComponentFixture<MyDialogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDialogContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
