import { Component } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-auth-guard',
  templateUrl: './auth-guard.component.html',
  styleUrls: ['./auth-guard.component.css'],
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    try {
      if (!this.authService.isUserLogged) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    } catch (error) {
      console.error('error en AuthGuard', error);
      throw new Error(`${error}`);
    }
  }
}
