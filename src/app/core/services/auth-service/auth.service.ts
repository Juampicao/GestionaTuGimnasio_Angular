import { Injectable } from '@angular/core';

export class AccessData {
  constructor(public user: string, public password: any) {}
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogged: boolean = false;
  private accessData: AccessData = {
    user: 'gimnasio@gimnasio.com',
    password: '123456',
  };

  constructor() {}

  validatePassword(accessData: AccessData): boolean {
    const password = accessData.password;
    const user = accessData.user;

    if (user !== this.accessData.user) {
      throw new Error('El usuario no existe.');
    }

    if (password !== this.accessData.password) {
      throw new Error('Contraseña erronea.');
    }

    if (
      user === this.accessData.user &&
      password === this.accessData.password
    ) {
      this.isLogged = true;
      return true;
    }

    throw new Error('Error en la contraseña o el usuario');
  }

  isUserLogged() {
    return this.isLogged;
  }

  getUserName() {
    return 'Vikingos';
  }
}
