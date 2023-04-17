import { Helper } from '../../../../core/services/helper/Helper';
import { ErrorCrearRutina } from '../error/ErrorCrearRutina';
import { IDays } from '../interfaces/IDays';
import { IMuscles } from '../interfaces/IMuscles';
import { ExcerciseGeneral } from './ExcerciseGeneral';

export class ExcerciseSubscriptor {
  private _excercise: ExcerciseGeneral;
  private _repetitions: number;
  private _series: number;
  private _days: IDays[];

  /**
   * Crea una instancia de la ExcerciseSubscriptor.
   * @param exercise - ExcerciseGeneral.  El ejercicio a realizar durante el entrenamiento.
   * @param repetitions El número de repeticiones que se deben realizar durante el ejercicio.
   * @param series El número de series que se deben realizar durante el ejercicio.
   * @param days.
   */
  constructor(
    exercise: ExcerciseGeneral,
    repetitions: number,
    series: number,
    days: IDays[]
  ) {
    this._excercise = exercise;
    this._repetitions = this.isValidNumber(repetitions);
    this._series = this.isValidNumber(series);
    this._days = days;
  }

  // Métodos getter y setter
  public get excercise(): ExcerciseGeneral {
    return this._excercise;
  }

  public set excercise(value: ExcerciseGeneral) {
    this._excercise = value;
  }

  public get repetitions(): number {
    return this._repetitions;
  }

  public set repetitions(value: number) {
    this._repetitions = this.isValidNumber(value);
  }

  public get series(): number {
    return this._series;
  }

  public set series(value: number) {
    this._series = this.isValidNumber(value);
  }

  public get days(): IDays[] {
    return this._days;
  }

  public set days(value: IDays[]) {
    this._days = value;
  }

  getName(): string {
    return this._excercise.name;
  }

  getExplanation(): string | null {
    return this._excercise.explanation;
  }

  getMuscles(): IMuscles[] {
    return this.excercise.muscles;
  }

  getVideoUrl(): string | null {
    return this._excercise.videoUrl;
  }

  private isValidNumber(numero: number): number {
    try {
      if (Helper.isValidNumberReturnNumber(numero, 0, 100)) {
        return numero;
      }
      throw new ErrorCrearRutina('Numero incorrecto. Debe estar entre 0 y 100');
    } catch (error) {
      throw new ErrorCrearRutina('Numero incorrecto. Debe estar entre 0 y 100');
    }
  }
}
