export class AccessIndividualRecord {
  private _entryDate: Date;
  private _exitDate: Date | null;
  private _isEntryRegistered: boolean;

  constructor(entryDate: Date, isEntryRegistered: boolean = true) {
    this._entryDate = entryDate;
    this._isEntryRegistered = isEntryRegistered;
    this._exitDate = null;
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

  get isEntryRegistered(): boolean {
    return this._isEntryRegistered;
  }

  get duration(): number | null {
    if (this._exitDate) {
      return this._exitDate.getTime() - this._entryDate.getTime();
    }
    return null;
  }
}
