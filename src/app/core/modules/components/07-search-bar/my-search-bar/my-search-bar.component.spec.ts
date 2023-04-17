import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySearchBarComponent } from './my-search-bar.component';

describe('MySearchBarComponent', () => {
  let component: MySearchBarComponent;
  let fixture: ComponentFixture<MySearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySearchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
