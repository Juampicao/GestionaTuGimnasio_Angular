import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionPageComponent } from './construction-page.component';

describe('ConstructionPageComponent', () => {
  let component: ConstructionPageComponent;
  let fixture: ComponentFixture<ConstructionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
