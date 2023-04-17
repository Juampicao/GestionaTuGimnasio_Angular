import { Helper } from '../../../../../core/services/helper/Helper';

export class PersonalInformation {
  private _name: string;
  private _surname: string;
  private _dni: number;
  private _phoneNumber: number;
  private _category: string;
  private _birthday: Date;
  private _profileImage: string | null;
  private _address: string;
  private _email: string;

  constructor(
    name: string,
    surname: string,
    dni: number,
    phoneNumber: number,
    category: string,
    birthday: Date,
    profileImage: string | null,
    address: string,
    email: string
  ) {
    this._name = name;
    this._surname = surname;
    this._dni = dni;
    this._phoneNumber = phoneNumber;
    this._category = category;
    this._birthday = birthday;
    this._profileImage = profileImage;
    this._address = address;
    this._email = email;
  }

  // Getters y setters
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  get surname(): string {
    return this._surname;
  }
  set surname(surname: string) {
    this._surname = surname;
  }

  get dni(): number {
    return this._dni;
  }
  set dni(dni: number) {
    this._dni = dni;
  }

  get phoneNumber(): number {
    return this._phoneNumber;
  }
  set phoneNumber(phoneNumber: number) {
    this._phoneNumber = phoneNumber;
  }

  get category(): string {
    return this._category;
  }
  set category(category: string) {
    this._category = category;
  }

  get birthday(): Date {
    return this._birthday;
  }
  set birthday(birthday: Date) {
    this._birthday = birthday;
  }

  get profileImage(): string | null {
    return this._profileImage;
  }
  set profileImage(profileImage: string | null) {
    this._profileImage = profileImage;
  }

  get address(): string {
    return this._address;
  }
  set address(address: string) {
    this._address = address;
  }

  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }

  // Método para obtener el nombre completo
  completeName(): string {
    return `${this._name} + " " + ${this._surname}`;
  }

  // Método para obtener la edad
  age(): number {
    const today = Helper.TodayDate();
    const birthDate = new Date(this._birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
}
