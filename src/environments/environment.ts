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
    autorizado: {
      listado:'/autorizado/listado',
      alta:'/autorizado/alta'
    },
    colegio: {
      listado:'/colegio/listado',
      alta:'/colegio/alta',
      obtener:'/colegio/obtener',
      suspender:'/colegio/suspender',
      detalle:'/colegio/detalle',
      borrar:'/colegio/borrar'
    },
    admin:{
      alta:'/admin/alta',
      listado:'/admin/listado',
      suspender:'/admin/suspender',
      obtener:'/admin/obtener',
      borrar:'/admin/borrar',
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
      obtener:'/usuario/detalle',
      borrar:'/usuario/borrar'
    },
    registro:{
      listado:'/registro/listado',
    },
    red:{
      alta:'/red/alta',
      listado:'/red/listado',
      borrar:'/red/borrar'
    }
  }

};
