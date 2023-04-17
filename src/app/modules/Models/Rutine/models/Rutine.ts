import { Helper } from '../../../../core/services/helper/Helper';
import { User } from '../../User/models/User';
import { ExcerciseSubscriptor } from './ExcerciseSubscriptor';

export class Rutine {
  private _creationDate: Date;
  private _creator: User;
  private _subscriptorOwner: any;
  private _excercises: ExcerciseSubscriptor[] = [];
  private _id: any;

  constructor(
    subscriptorOwner: any,
    excercises: ExcerciseSubscriptor[],
    creator: User,
    creationDate: Date = new Date()
  ) {
    this._subscriptorOwner = subscriptorOwner;
    this._excercises = this.validateExcerciseLength(excercises);
    this._creationDate = creationDate;
    this._creator = creator;
    this._id = Helper.generateId();
  }

  public get id(): any {
    return this._id;
  }
  public set id(value: any) {
    this._id = value;
  }

  public get creationDate(): Date {
    return this._creationDate;
  }

  public set creationDate(value: Date) {
    this._creationDate = value;
  }

  public get creator(): User {
    return this._creator;
  }

  public set creator(value: User) {
    this._creator = value;
  }

  public get subscriptorOwner(): any {
    return this._subscriptorOwner;
  }

  public set subscriptorOwner(value: any) {
    this._subscriptorOwner = value;
  }

  addExcercise(excercise: ExcerciseSubscriptor) {
    try {
      if (Helper.isValidNumberReturnBoolean(this._excercises.length, 0, 12)) {
        this._excercises.push(excercise);
      }
    } catch (error) {
      throw new Error('El maximo de numero por rutina es 12.');
    }
  }

  /**
   * Validate if length < 12.
   * @param excercises
   * @returns
   */
  private validateExcerciseLength(
    excercises: ExcerciseSubscriptor[]
  ): ExcerciseSubscriptor[] {
    try {
      if (Helper.isValidNumberReturnBoolean(excercises.length, 0, 12)) {
        return (this._excercises = excercises);
      }
      throw new Error('El maximo de numero por rutina es 12.');
    } catch (error) {
      throw new Error('El maximo de numero por rutina es 12.');
    }
  }

  deleteExcercise(excercise: ExcerciseSubscriptor) {
    throw new Error('function not implemented');
  }

  getAllExcercises(): ExcerciseSubscriptor[] {
    return this._excercises;
  }
}
