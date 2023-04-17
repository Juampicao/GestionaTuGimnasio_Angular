import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';

//! Interfaz
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

//! Interfaz MenuItemNavBar
export interface MenuItemNavBar {
  routeLink: string;
  icon: string;
  label: string;
}
@Component({
  selector: 'app-my-menu-navbar',
  templateUrl: './my-menu-navbar.component.html',
  styleUrls: ['./my-menu-navbar.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class MyMenuNavbarComponent implements OnInit {
  gimName: string = 'Gimnasio';

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  // navData: MenuItemNavBar[] = navbarData; // ! Data en nav.ts
  @Input() navData: MenuItemNavBar[] = []; // ! Data en nav.ts

  constructor(private _authService: AuthService) {
    console.log('navbar', this.navData);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  ngOnInit(): void {
    this.gimName = this._authService.getUserName();
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
}
