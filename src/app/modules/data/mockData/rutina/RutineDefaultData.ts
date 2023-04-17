import { Helper } from 'src/app/core/services/helper/Helper';
import { IDays } from 'src/app/modules/Models/Rutine/interfaces/IDays';
import { IMuscles } from 'src/app/modules/Models/Rutine/interfaces/IMuscles';
import { ExcerciseGeneral } from 'src/app/modules/Models/Rutine/models/ExcerciseGeneral';
import { ExcerciseSubscriptor } from 'src/app/modules/Models/Rutine/models/ExcerciseSubscriptor';
import { Rutine } from 'src/app/modules/Models/Rutine/models/Rutine';
import { IUserRoles } from 'src/app/modules/Models/User/interfaces/IUserRoles';
import { User } from 'src/app/modules/Models/User/models/User';
import { UserInformation } from 'src/app/modules/Models/User/models/UserInformation';
// import { USER_1_DEFAULT } from 'src/app/modules/Models/ValoresDefault2';

export const USER_INFORMATION_1 = new UserInformation('Dueño Juan 1 ');

export const USER_1_DEFAULT = new User(USER_INFORMATION_1, IUserRoles.OWNER);

//? - - - - - - - - - - - GENERAL EXCERCISES - - - - - - - - - - - - - - -
export const EXCERCISE_GENERAL_BICEP_DEFAULT1 = new ExcerciseGeneral(
  'Curl Biceps',
  'Extender y levantar el brazo',
  null,
  [IMuscles.BICEP],
  USER_1_DEFAULT
);

export const EXCERCISE_GENERAL_CUADRICEPS_DEFAULT2 = new ExcerciseGeneral(
  'Sentadillas',
  'Agarrar la barra y bajar',
  null,
  [IMuscles.CUADRICEPS],
  USER_1_DEFAULT
);

export const EXCERCISE_GENERAL_PECHOPLANO_DEFAULT3 = new ExcerciseGeneral(
  'Pecho plano',
  'Para el pecho',
  null,
  [IMuscles.PECHO],
  USER_1_DEFAULT
);

//? - - - - - - - - - - - SUBSCRIPTOR  EXCERCISES - - - - - - - - - - - - - - -

export const EXCERCISE_SUBSCRIPTOR_BICEP_DEFAULT1 = new ExcerciseSubscriptor(
  EXCERCISE_GENERAL_BICEP_DEFAULT1,
  10,
  4,
  [IDays.LUNES, IDays.MIERCOLES, IDays.VIERNES]
);

export const EXCERCISE_SUBSCRIPTOR_CUADRICEPTS_DEFAULT2 =
  new ExcerciseSubscriptor(EXCERCISE_GENERAL_BICEP_DEFAULT1, 8, 3, [
    IDays.MARTES,
    IDays.MIERCOLES,
    IDays.SABADO,
  ]);

export const EXCERCISE_SUBSCRIPTOR_PECHO_DEFAULT3 = new ExcerciseSubscriptor(
  EXCERCISE_GENERAL_BICEP_DEFAULT1,
  2,
  8,
  [IDays.DOMINGO, IDays.JUEVES, IDays.VIERNES]
);

//? - - - - - - - - - - - RUTINA - - - - - - - - - - - - - - -
/**
 * Rutina Default creada por USER_DEFAULT_1.
 * 2 ejercicios subscriptor: 1) Bicep 2) Cuadricep.
 */
export const RUTINA_DEFAULT = new Rutine(
  Helper.generateId(),
  [
    EXCERCISE_SUBSCRIPTOR_BICEP_DEFAULT1,
    EXCERCISE_SUBSCRIPTOR_CUADRICEPTS_DEFAULT2,
  ],
  USER_1_DEFAULT,
  Helper.TodayDate()
);
