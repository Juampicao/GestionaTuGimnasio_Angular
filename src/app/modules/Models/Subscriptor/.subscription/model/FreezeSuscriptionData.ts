import { Helper } from 'src/app/core/services/helper/Helper';
import { User } from '../../../User/models/User';

export class FreezeSuscriptionData {
  private _sinceDate: Date;
  private _untilDate: Date;
  private _reason: string;
  private _creator: User;

  /**
   * @param sinceDate desde cuando
   * @param untilDate hasta cuando
   * @param reason ¿Por que?
   * @param creator  ¿Quien lo crea?
   */
  constructor(sinceDate: Date, untilDate: Date, reason: string, creator: User) {
    this._sinceDate = sinceDate;
    this._untilDate = untilDate;
    this._reason = reason;
    this._creator = creator;
  }

  public get sinceDate(): Date {
    return this._sinceDate;
  }
  public set sinceDate(value: Date) {
    this._sinceDate = value;
  }

  public get untilDate(): Date {
    return this._untilDate;
  }

  public set untilDate(value: Date) {
    this._untilDate = value;
  }

  public get reason(): string {
    return this._reason;
  }

  public set reason(value: string) {
    this._reason = value;
  }

  public get creator(): User {
    return this._creator;
  }

  public set creator(value: User) {
    this._creator = value;
  }

  public getUntilDateParse() {
    return Helper.ParseDate(this._untilDate);
  }

  public getSinceDateParse() {
    return Helper.ParseDate(this._sinceDate);
  }

  public getDurationOfFreezedInDays(): number {
    return Helper.daysUntil(this._sinceDate, this._untilDate);
  }
}
