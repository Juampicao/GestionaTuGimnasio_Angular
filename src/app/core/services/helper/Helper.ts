import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorExternoAlPasarParams } from './ErrorExternoAlPasarParams';

@Injectable({
  providedIn: 'root',
})
export class Helper {
  /**
   * Verifica que el número entre en un rango de un mínimo y máximo valido.
   * @param numeroParametro : numero que quiero verificar sea válido.
   * @param minNumber : numero mínimo
   * @param maxNumber : numero Máximo
   * @returns boolean.
   */
  static isValidNumberReturnBoolean(
    numeroParametro: number,
    minNumber: number,
    maxNumber: number
  ): boolean {
    if (numeroParametro < minNumber || numeroParametro > maxNumber) {
      throw new ErrorExternoAlPasarParams(
        `El número debe ser mayor a ${minNumber} y menor a ${maxNumber}`
      );
    }
    return true;
  }

  /**
   * Verifica que el número entre en un rango de un mínimo y máximo valido.
   * @param numeroParametro : numero que quiero verificar sea válido.
   * @param minNumber : numero mínimo
   * @param maxNumber : numero Máximo
   * @returns number.
   */
  static isValidNumberReturnNumber(
    numeroParametro: number,
    minNumber: number,
    maxNumber: number
  ): number {
    if (numeroParametro < minNumber || numeroParametro > maxNumber) {
      throw new ErrorExternoAlPasarParams(
        `El número debe ser mayor a ${minNumber} y menor a ${maxNumber}`
      );
    }
    return numeroParametro;
  }

  /**
    // Todo. Problema si son despeus de las 9 de la noche.
     * Función que suma una cantidad de dias X a una fecha vieja.
     * @param fechaVieja : Fecha que deseo actualizar.
     * @param diasAActualizar : Cantidad de dias a sumar.
     * @returns 
     */
  static sumarDiasAFechas(fechaVieja: Date, diasAActualizar: number): Date {
    fechaVieja.setDate(fechaVieja.getDate() + diasAActualizar - 1);
    return fechaVieja;
  }

  /**
   * @param actualDate : Fecha actual, de la cual quiero conseguir el 1° dia del mes siguiente.
   * @returns el primer día del mes siguiente. El mes actual es el pasado por parametro.
   */
  static getFirstDayOfNextMonth(actualDate: Date) {
    return new Date(actualDate.getFullYear(), actualDate.getMonth() + 1, 1);
  }

  /**
   * @param actualDate : Fecha actual, de la cual quiero conseguir el 1° dia del mes siguiente.
   * @returns el numero de dia elegido por parametros del mes siguiente.
   */
  static getSpecificDayOfNextMonth(
    actualDate: Date,
    numberOfNextMonth: number
  ) {
    return new Date(
      actualDate.getFullYear(),
      actualDate.getMonth() + 1,
      numberOfNextMonth
    );
  }

  /**
   * @param actualDate : Fecha actual, de la cual quiero conseguir el 1° dia del mes siguiente.
   * @param numberMonthToAdd Numero de meses para sumar desde el actualDate.
   * @returns el primer día del mes siguiente. El mes actual es el pasado por parametro.
   */
  static getFirstDayOfParticularMonth(
    actualDate: Date,
    numberMonthsToAdd: number
  ) {
    return new Date(
      actualDate.getFullYear(),
      actualDate.getMonth() + numberMonthsToAdd,
      1
    );
  }

  static TodayDate = () => new Date();

  // static compareTwoDates(operation: IOperationCompareTwoDates, date1: Date, date2: Date): boolean {

  //     const date1Format = date1.toLocaleDateString();
  //     const date2Format = date2.toLocaleDateString();
  //     let datesAreEqual = false;

  //     if (operation === IOperationCompareTwoDates.EQUAL) {
  //         datesAreEqual = date1Format === date2Format;
  //     }

  //     return datesAreEqual;
  // }
  static compareTwoDates(
    operation: IOperationCompareTwoDates,
    date1: Date,
    date2: Date
  ): boolean {
    const date1Ms = date1.getTime();
    const date2Ms = date2.getTime();

    switch (operation) {
      case IOperationCompareTwoDates.EQUAL:
        return date1Ms === date2Ms;
      case IOperationCompareTwoDates.GREATER:
        return date1Ms > date2Ms;
      case IOperationCompareTwoDates.GREATEROREQUAL:
        return date1Ms >= date2Ms;
      case IOperationCompareTwoDates.SMALLER:
        return date1Ms < date2Ms;
      case IOperationCompareTwoDates.SMALLEROREQUAL:
        return date1Ms <= date2Ms;
      default:
        throw new Error(`Invalid operation: ${operation}`);
    }
  }

  /**
   * Generar id unicos.
   * @returns
   */
  static generateId(): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const idLength = 10;
    let id = '';

    while (id.length < idLength) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomChar = characters[randomIndex];
      id += randomChar;
    }

    // Verifica si el id generado ya existe en la lista de ids creados
    const existingIds = ['id1', 'id2', 'id3']; // reemplaza con tus propios ids existentes
    if (existingIds.includes(id)) {
      // Si ya existe, genera otro id recursivamente
      return this.generateId();
    }

    return id;
  }

  /**
   * Método para generar un número de 6 dígitos aleatorio
   */
  static generateRandomNumber(): number {
    const min = 100000; // El número mínimo de 6 dígitos es 100000
    const max = 999999; // El número máximo de 6 dígitos es 999999
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Calcular cuantos dias de diferencia hay.
   * @param fechaActual Fecha que estoy para empezar a contar. Ejemplo hoy.
   * @param FechaObjetivo  Fecha objetivo. Ejemplo cuando vence la suscripcion.
   * @returns
   */
  static daysUntil(fechaActual: Date, FechaObjetivo: Date): number {
    const diff = FechaObjetivo.getTime() - fechaActual.getTime();
    const oneDay = 1000 * 60 * 60 * 24; // milisegundos en un día
    const days = Math.ceil(diff / oneDay);
    return days;
  }

  static ParseDate(date: Date) {
    return date.toLocaleDateString();
  }

  /**
   *
   * @param operation IDateValidator
   * @param date
   * @returns
   */
  static dateValidator(
    operation: IDateValidator = IDateValidator.MAX,
    date: Date = new Date()
  ) {
    let validDate = date;
    return (control: FormControl): { [key: string]: boolean } | null => {
      const date = new Date(control.value);
      const today = validDate;

      // Operation Max
      if (operation === IDateValidator.MAX) {
        if (date > today) {
          return { dateInvalidMax: true };
        }
      }

      // Operation Min
      if (operation === IDateValidator.MIN) {
        if (date < today) {
          return { dateInvalidMin: true };
        }
      }
      return null;
    };
  }

  /**
   *
   * @param operation IDateValidator
   * @param date
   * @returns
   */
  static inputNumberValidator(
    operation: IInputNumberValidator = IInputNumberValidator.MAX,
    number: Number
  ) {
    const validNumber = number;
    return (control: FormControl): { [key: string]: boolean } | null => {
      const actualNumber = control.value;

      // Operation Max
      if (operation === IInputNumberValidator.MAX) {
        if (actualNumber > validNumber) {
          return { invalidMaxNumber: true };
        }
      }

      // Operation Min
      if (operation === IInputNumberValidator.MIN) {
        if (actualNumber < validNumber) {
          return { invalidMinNumber: true };
        }
      }
      return null;
    };
  }
}

export enum IOperationCompareTwoDates {
  EQUAL = 'equal',
  GREATER = 'greater',
  GREATEROREQUAL = 'greaterOrEqual',
  SMALLER = 'smaller',
  SMALLEROREQUAL = 'smallerOrEqual',
}

export enum IDateValidator {
  MIN = 'min',
  MAX = 'max',
}

export enum IInputNumberValidator {
  MIN = 'min',
  MAX = 'max',
}
