import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusListPruebaComponent } from './status-list-prueba.component';

describe('StatusListPruebaComponent', () => {
  let component: StatusListPruebaComponent;
  let fixture: ComponentFixture<StatusListPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusListPruebaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusListPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
