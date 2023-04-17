export enum IUpdateExpirationAfterDeletePayment {
  LASTPAYMENT = 'lastPayment',
  MANUAL = 'manual',
}

export class ExpirationDeleteMethod {
  private _expirationType: IUpdateExpirationAfterDeletePayment;
  private _newDate: Date | null;

  /**
   *  @param expirationType IUpdateExpirationAfterDeletePayment (1° LastPayment(toma la fecha del ultimo pago completado) 2° Manual(escribir manual))
   * @param newExpirationDate Date. Si es manual, completar manual. Si es LASTPAYMENT, no se tendrá en cuenta esta y arrojará un error.
   */
  constructor(
    expirationType: IUpdateExpirationAfterDeletePayment,
    newDate: Date | null
  ) {
    this.verifyIsValid(expirationType, newDate);
    // Todo no deberia estar aca, aunque tiraria error el verifyisValid
    this._expirationType = expirationType;
    this._newDate = newDate;
  }

  private verifyIsValid(
    expirationType: IUpdateExpirationAfterDeletePayment,
    newDate: Date | null
  ) {
    if (expirationType === IUpdateExpirationAfterDeletePayment.LASTPAYMENT) {
      if (newDate) {
        throw new Error(
          'Si seleccionas nueva expiración según el ultimo pago, no podes poner una fecha de expiración manual'
        );
      }
    }

    this._expirationType = expirationType;
    this._newDate = newDate;
  }

  public get expirationType(): IUpdateExpirationAfterDeletePayment {
    return this._expirationType;
  }

  public set expirationType(value: IUpdateExpirationAfterDeletePayment) {
    this._expirationType = value;
  }

  public get newDate(): Date | null {
    return this._newDate;
  }

  public set newDate(value: Date | null) {
    this._newDate = value;
  }
}
