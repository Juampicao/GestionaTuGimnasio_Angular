export interface IRegisterAccessNotes {
  set entryDate(entryDate: Date | null);
  set exitDate(exitDate: Date | null);

  get entryDate(): Date | null;
  get exitDate(): Date | null;
}
