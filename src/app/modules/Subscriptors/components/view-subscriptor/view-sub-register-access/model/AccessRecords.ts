import { AccessIndividualRecord } from './AccessIndividualRecord';

export class AccessRecords {
  private _records: AccessIndividualRecord[];

  constructor(records: AccessIndividualRecord[] = []) {
    this._records = records;
  }

  get records(): AccessIndividualRecord[] {
    return this._records;
  }

  addRecord(record: AccessIndividualRecord): void {
    this._records.push(record);
  }

  getEntryRecords(): AccessIndividualRecord[] {
    return this._records.filter((record) => record.isEntryRegistered);
  }

  getExitRecords(): AccessIndividualRecord[] {
    return this._records.filter((record) => !record.isEntryRegistered);
  }

  getTotalVisitors(): number {
    return this.getEntryRecords().length;
  }

  getAverageDuration(): number | null {
    const exitRecords = this.getExitRecords();
    const durations = exitRecords.map((record) => record.duration);
    const filteredDurations = durations.filter(
      (duration) => duration !== null
    ) as number[];
    if (filteredDurations.length === 0) {
      return null;
    }
    const totalDuration = filteredDurations.reduce((a, b) => a + b, 0);
    return totalDuration / filteredDurations.length;
  }
}
