import { User } from '../../User/models/User';
import { IMuscles } from '../interfaces/IMuscles';

export class ExcerciseGeneral {
  private _name: string;
  private _explanation: string | null;
  private _videoUrl: string | null;
  private _muscles: IMuscles[];
  private _creador: User;

  /**
   *
   * @param name
   * @param explanation
   * @param videoUrl
   * @param muscles
   * @param User
   */
  constructor(
    name: string,
    explanation: string | null,
    videoUrl: string | null,
    muscles: IMuscles[],
    creador: User
  ) {
    this._name = name;
    this._explanation = explanation;
    this._videoUrl = videoUrl;
    this._muscles = muscles;
    this._creador = creador;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get explanation(): string | null {
    return this._explanation;
  }

  public set explanation(value: string | null) {
    this._explanation = value;
  }

  public get videoUrl(): string | null {
    return this._videoUrl;
  }

  public set videoUrl(value: string | null) {
    this._videoUrl = value;
  }

  public get muscles(): IMuscles[] {
    return this._muscles;
  }

  public set muscles(value: IMuscles[]) {
    this._muscles = value;
  }

  public get creador(): User {
    return this._creador;
  }

  public set creador(value: User) {
    this._creador = value;
  }
}
