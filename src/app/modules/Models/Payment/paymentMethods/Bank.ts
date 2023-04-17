import { Helper } from 'src/app/core/services/helper/Helper';
import { IBankOptions } from '../interfaces/Interfaces';

export class Bank {
  private _nombreBanco: IBankOptions;
  private _numeroCuenta: string | number;
  private _otrosDatos: string | number;
  private _id: any;

  constructor(
    nombreBanco: IBankOptions,
    numeroCuenta: string | number,
    otrosDatos: string | number = ''
  ) {
    this._nombreBanco = nombreBanco;
    this._numeroCuenta = numeroCuenta;
    this._otrosDatos = otrosDatos;
    this._id = Helper.generateId();
  }

  public get id(): any {
    return this._id;
  }

  public get nombreBanco(): IBankOptions {
    return this._nombreBanco;
  }

  public set nombreBanco(value: IBankOptions) {
    this._nombreBanco = value;
  }

  public get cuenta(): string | number {
    return this._numeroCuenta;
  }

  public set cuenta(value: string | number) {
    this._numeroCuenta = value;
  }

  public get otrosDatos(): string | number {
    return this._otrosDatos;
  }

  public set otrosDatos(value: string | number) {
    this._otrosDatos = value;
  }
}
