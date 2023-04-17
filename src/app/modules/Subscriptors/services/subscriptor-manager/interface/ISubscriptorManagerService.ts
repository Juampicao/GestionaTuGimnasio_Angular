import { Observable } from 'rxjs';
import { PlanSubscription } from 'src/app/modules/Models/PlanSubscription/models/PlanSubscription';
import { PersonalInformation } from 'src/app/modules/Models/Subscriptor/.personal-information/model/PersonalInformation';
import { Subscriptor } from 'src/app/modules/Models/Subscriptor/model/Subscriptor';

export interface ISubscriptorManagerService {
  getSubscriptorById(id: any): Observable<Subscriptor>;

  getAllSubscriptors(): Observable<Subscriptor[]>;

  pruebaError(): Observable<any>;

  createSubscriptor(
    personalInformation: PersonalInformation,
    planSubscription: PlanSubscription
  ): Observable<Subscriptor>;
  getAllSubscriptors(): Observable<Subscriptor[]>;

  deleteSubscriptorById(id: any): Observable<any>;

  editSubscriptor(subscriptor: Subscriptor): Observable<Subscriptor>;
}
