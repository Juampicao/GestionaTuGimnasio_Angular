import { IUserRoles } from "./IUserRoles";

export interface IUser{
    getInformation(): any;

    getRole(): IUserRoles

}