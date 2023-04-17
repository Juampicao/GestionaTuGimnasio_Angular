import { IRegisterAccessNotes } from '../interface/IRegisterAccessNotes';

export class RegisterAccessNotes implements IRegisterAccessNotes {
  private _entryDate: Date;
  private _exitDate: Date | null;

  /**
   * @param entryDate
   * @param exitDate
   */
  constructor(entryDate: Date, exitDate: Date | null = null) {
    this._entryDate = entryDate;
    this._exitDate = exitDate;
  }
  set entryDate(entryDate: Date) {
    this._entryDate = entryDate;
  }
  set exitDate(exitDate: Date | null) {
    this._exitDate = exitDate;
  }

  get entryDate(): Date {
    return this._entryDate;
  }
  get exitDate(): Date | null {
    return this._exitDate;
  }

  get duration(): number | null {
    if (this._exitDate) {
      return this._exitDate.getTime() - this._entryDate.getTime();
    }
    return null;
  }
}
