import { FormGroup } from '@angular/forms';

export interface IForms {
  isLoading: boolean;
  form: FormGroup;
  defaultValues: any;
  initialValues: any;

  ngAfterViewInit(): void;

  ngOnInit(): void;

  /**
   * Iniciar el form, crearlo en el ngOnInit
   */
  createForm(): void;

  /**
   * Iniciar el formulario con datos para editar
   */
  initEditForm(): void;

  /**
   * Submit el formulario
   */
  onSubmit(): void;

  /**
   * Crear una data default para probar el formulario.
   */
  onDefaultData(): void;

  /**
   * Cerrar el formulario
   */
  onClose(): void;

  resetForm(): void;

  goBack(): void;

  //? - - - - - - -  Others / Data  - - - - - - -
}
