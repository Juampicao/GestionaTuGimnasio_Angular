import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTablePaginatorComponent } from './my-table-paginator.component';

describe('MyTablePaginatorComponent', () => {
  let component: MyTablePaginatorComponent;
  let fixture: ComponentFixture<MyTablePaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTablePaginatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTablePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
