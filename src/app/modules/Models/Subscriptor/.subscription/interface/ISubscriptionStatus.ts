export enum ISubscriptionStatus {
  NULL = 'null',
  PENDIENTE = 'Pendiente',
  PERIODOPAGO = 'PeriodoPago', // Plan vence el 5, pero tiempo a pagar hasta el 15.
  ACTIVO = 'Activo',
  DEUDA1 = 'Deuda1', // Debe 1 mes.
  DEUDA2 = 'Deuda2',
  DEUDA3 = 'Deuda3',
  DEUDA4 = 'Deuda4',
  MOROSO1 = 'Moroso1', // Si debe mas de 4 cuotras, pasar a moroso1.
  MOROSO2 = 'Moroso2', // Si debe mas de 6 cuotas, pasara moroso2.
  CONGELADO = 'Congelado', // Congelado
  PRUEBA = 'Prueba',
  ALTA = 'Reciente Alta',
}
