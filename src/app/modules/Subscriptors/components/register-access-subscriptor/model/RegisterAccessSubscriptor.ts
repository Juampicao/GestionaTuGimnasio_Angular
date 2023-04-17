import { ICondition } from 'src/app/modules/Models/Subscriptor/.subscription/interface/IConditions';
import { ISubscriptionStatus } from 'src/app/modules/Models/Subscriptor/.subscription/interface/ISubscriptionStatus';
import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';

export class RegisterAccessSubscriptor {
  private _name: string;
  private _image: string | null;
  private _status: ISubscriptionStatus;
  private _condition: ICondition;
  private _color: string;
  private _dateExpired: Date | null;
  private _planSubscription: string;
  private _id: any;
  private _register: number;
  private _message: string | null;
  private _numberDaysToExpired: any;

  /**
   *
   * @param suscriptor Subscriptor
   */
  constructor(suscriptor: Subscriptor) {
    this._name = suscriptor.personalInformation.name;
    this._image = suscriptor.personalInformation.profileImage;
    this._status = suscriptor.getStatus();
    this._condition = suscriptor.getCondition();
    this._color = suscriptor.getStatusObject().color;
    this._dateExpired = suscriptor.getDateExpiration();
    this._planSubscription = suscriptor.getPlanSubscription().nombre;
    this._id = suscriptor.id;
    this._register = suscriptor.getRegisterNumber();
    this._message = suscriptor.getConditionStatusMessage();
    this._numberDaysToExpired = suscriptor.getNumberDaysToExpired();
  }
  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get image(): string | null {
    return this._image;
  }

  public set image(value: string | null) {
    this._image = value;
  }

  public get status(): ISubscriptionStatus {
    return this._status;
  }

  public set status(value: ISubscriptionStatus) {
    this._status = value;
  }

  public get condition(): ICondition {
    return this._condition;
  }

  public set condition(value: ICondition) {
    this._condition = value;
  }

  public get color(): string {
    return this._color;
  }
  public set color(value: string) {
    this._color = value;
  }

  public get dateExpired(): Date | null {
    return this._dateExpired;
  }

  public set dateExpired(value: Date | null) {
    this._dateExpired = value;
  }

  public get planSubscription(): string {
    return this._planSubscription;
  }

  public set planSubscription(value: string) {
    this._planSubscription = value;
  }

  public get id(): any {
    return this._id;
  }

  public set id(value: any) {
    this._id = value;
  }

  public get register(): number {
    return this._register;
  }

  public set register(value: number) {
    this._register = value;
  }

  public get message(): string | null {
    return this._message;
  }
  public set message(value: string | null) {
    this._message = value;
  }

  public get numberDaysToExpired(): any {
    return this._numberDaysToExpired;
  }
  public set numberDaysToExpired(value: any) {
    this._numberDaysToExpired = value;
  }
}

// !  EJEMPLO
// const exampleSubscriptor = new RegisterAccessSubscriptor(
//   'Juan Perez',
//   'https://example.com/images/juanperez.png',
//   IPaymentStatus.DEUDA,
//   new Date('2022-06-09'),
//   'Gold',
//   1234,
//   567
// );

// exampleSubscriptor.name;

// import { ISubscriptionStatus } from 'src/app/modules/Models/Subscriptor/.subscription/interface/ISubscriptionStatus';

// export class RegisterAccessSubscriptor {
//   public _name: string;
//   public _image: string | null;
//   // public _paymentStatus: IPaymentStatus; // Todo anteriormente era este.
//   private _status: ISubscriptionStatus;
//   public _dateExpired: Date | null;
//   public _planSubscription: string;
//   public _id: any;
//   private _register: number;

//   /**
//    *
//    * @param name
//    * @param image
//    * @param paymentStatus
//    * @param dateExpired
//    * @param planSubscription
//    * @param id
//    * @param register
//    */
//   constructor(
//     name: string,
//     image: string | null,
//     paymentStatus: ISubscriptionStatus,
//     dateExpired: Date | null,
//     planSubscription: string,
//     id: any,
//     register: number
//   ) {
//     this._name = name;
//     this._image = image;
//     this._status = paymentStatus;
//     this._dateExpired = dateExpired;
//     this._planSubscription = planSubscription;
//     this._id = id;
//     this._register = register;
//   }

//   public get name(): string {
//     return this._name;
//   }

//   public set name(value: string) {
//     this._name = value;
//   }

//   public get image(): string | null {
//     return this._image;
//   }

//   public set image(value: string | null) {
//     this._image = value;
//   }

//   public get status(): ISubscriptionStatus {
//     return this._status;
//   }

//   public set status(value: ISubscriptionStatus) {
//     this._status = value;
//   }

//   public get dateExpired(): Date | null {
//     return this._dateExpired;
//   }

//   public set dateExpired(value: Date | null) {
//     this._dateExpired = value;
//   }

//   public get planSubscription(): string {
//     return this._planSubscription;
//   }

//   public set planSubscription(value: string) {
//     this._planSubscription = value;
//   }

//   public get id(): any {
//     return this._id;
//   }

//   public set id(value: any) {
//     this._id = value;
//   }

//   public get register(): number {
//     return this._register;
//   }

//   public set register(value: number) {
//     this._register = value;
//   }
// }

// // !  EJEMPLO
// // const exampleSubscriptor = new RegisterAccessSubscriptor(
// //   'Juan Perez',
// //   'https://example.com/images/juanperez.png',
// //   IPaymentStatus.DEUDA,
// //   new Date('2022-06-09'),
// //   'Gold',
// //   1234,
// //   567
// // );

// // exampleSubscriptor.name;
