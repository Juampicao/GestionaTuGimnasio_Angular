import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-whatsapp-button',
  templateUrl: './my-whatsapp-button.component.html',
  styleUrls: ['./my-whatsapp-button.component.css'],
})
export class MyWhatsappButtonComponent implements OnInit {
  @Input() message: any;
  @Input() label: any;
  @Input() phoneNumber: number = 0;

  url!: string;
  finalMessage!: string;

  defaultMessage = 'Hola, te hablo desde el gimnasio ${NombreGimnasio}.';

  ngOnInit(): void {
    this.finalMessage = this.defaultMessage + this.message;
    this.url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(
      this.finalMessage
    )}`;
  }
}
