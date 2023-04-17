import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWhatsappButtonComponent } from './my-whatsapp-button.component';

describe('MyWhatsappButtonComponent', () => {
  let component: MyWhatsappButtonComponent;
  let fixture: ComponentFixture<MyWhatsappButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyWhatsappButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyWhatsappButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
