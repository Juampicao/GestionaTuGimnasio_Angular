const SUBSCRIPTORESLIST = 'suscriptores';

export const SUBSCRIPTOR_ROUTES = {
  SUBSCRIPTORLIST: SUBSCRIPTORESLIST,
  PAYMENTS: `${SUBSCRIPTORESLIST}/:id/pagos`,
  PERSONALINFORMATION: `${SUBSCRIPTORESLIST}/:id/informacion-personal`,
  REGISTERACCESS: `${SUBSCRIPTORESLIST}/:id/registro-accesso`,
  SUBSCRIPTION: `${SUBSCRIPTORESLIST}/:id/suscripcion`,
};

/**
 *
 * @param id
 * @returns
 */
export function getSubscriptorRoutes(id: any) {
  const subscriptorList = 'suscriptores';
  return {
    payments: `/${subscriptorList}/${id}/pagos`,
    personalInformation: `/${subscriptorList}/${id}/informacion-personal`,
    registerAccess: `/${subscriptorList}/${id}/registro-accesso`,
    subscription: `/${subscriptorList}/${id}/suscripcion`,
  };
}

// Todo Modificar las rutas para que sean mas dinamicas.
