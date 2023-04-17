import { Helper } from '../../../../core/services/helper/Helper';

import { IUser } from '../interfaces/IUser';
import { IUserRoles } from '../interfaces/IUserRoles';
import { UserInformation } from './UserInformation';

export class User implements IUser {
  private _id: any;
  private _information: UserInformation;
  private _role: IUserRoles;

  constructor(userInformation: UserInformation, role: IUserRoles) {
    this._information = userInformation;
    this._role = role;
    this._id = Helper.generateId();
  }

  public get id(): any {
    return this._id;
  }
  public set id(value: any) {
    this._id = value;
  }

  getInformation(): UserInformation {
    return this._information;
  }

  getRole(): IUserRoles {
    return this._role;
  }

  public get userInformation(): UserInformation {
    return this._information;
  }

  public set userInformation(value: UserInformation) {
    this._information = value;
  }
}
