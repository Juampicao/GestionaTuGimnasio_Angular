import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubPersonalInformationComponent } from './view-sub-personal-information.component';

describe('ViewSubPersonalInformationComponent', () => {
  let component: ViewSubPersonalInformationComponent;
  let fixture: ComponentFixture<ViewSubPersonalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubPersonalInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSubPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
