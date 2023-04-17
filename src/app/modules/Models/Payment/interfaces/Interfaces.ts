export enum IPaymentStatus {
  COMPLETADO = 'completado',
  PENDIENTE = 'pendiente',
  DEUDA = 'deuda',
  INACTIVO = 'inactivo',
  ALTA = 'alta',
}

export enum IPaymentTypes {
  MATRICULA = 'matricula',
  CUOTA = 'cuota',
  PRODUCTO = 'producto',
  OTRO = 'otro',
}

export enum IPaymetMethodType {
  EFECTIVO = 'efectivo',
  BANCO = 'banco',
  MERCADOPAGO = 'mercadoPago',
}

export enum IBankOptions {
  BBVA = 'bbva',
  CIUDAD = 'ciudad',
  OTRO = '',
}

/**
 * Puede ser "Primera === 500$ y en Cuarta pagan menos. Agregar aca y dejar libre para el gim/club"
 */
export enum IRegistrationName {
  MES1 = 'mes1',
  INICIO = 'inicio',
}
