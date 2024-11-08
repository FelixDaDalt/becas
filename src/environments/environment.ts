export const environment = {
  production: false,
  apiUrl: 'http://localhost:3002',
  featureFlag: false,
  endpoint: {
    zona: {
      nueva: '/zona/nuevaZona',
      borrar: '/zona/borrarZona',
      actualizar: '/zona/actualizarZona',
      obtener: '/zona/obtenerZonas',
    },
    localidad: {
      nueva: '/zona/nuevaLocalidad',
      borrar: '/zona/borrarLocalidad',
      actualizar: '/zona/actualizarLocalidad',
    },
    responsable: {
      listado:'/responsable/listado',
      alta:'/responsable/alta'
    },
    delegado: {
      listado:'/delegado/listado',
      alta:'/delegado/alta'
    },
    colegio: {
      listado:'/colegio/listado',
      alta:'/colegio/alta',
      obtener:'/colegio/obtener',
      suspender:'/colegio/suspender',
      detalle:'/colegio/detalle'
    },
    admin:{
      alta:'/admin/admin/alta',
      listado:'/admin/admin/listado',
      tyc_alta: '/admin/tyc/alta',
      tyc_historial: '/admin/tyc/historial',
      comprobar:'/admin/comprobar',
    },
    usuario:{
      tyc:'/usuario/tyc',
      tyc_aceptar:'/usuario/aceptarTyc',
      cambiarPassword:'/usuario/cambiarPassword',
      suspender:'/usuario/suspender',
      resetearPass:'/usuario/resetearPass',
    }
  }

};
