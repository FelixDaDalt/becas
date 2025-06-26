export const environment = {
  production: false,
  apiUrl: 'https://rib.tecnohilet.com.ar/api',
  fileUrl: 'https://rib.tecnohilet.com.ar/file',
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
    plan: {
      nueva: '/plan/nuevoPlan',
      borrar: '/plan/borrarPlan',
      actualizar: '/plan/actualizarPlan',
      obtener: '/plan/obtenerPlanes',
    },
    tareas: {
      forzarBaja: '/tareas/forzar-baja',
      notificarPorVencer: '/tareas/notificar-porVencer',
      notificarVencidas: '/tareas/notificar-Vencidas',
      obtenerEjecuciones:'/tareas/obtener-ejecuciones',
      comprobarRed:'/tareas/comprobar-red',
      sincronizarRed:'/tareas/sincronizar-red'
    },
    parametros: {
      obtener: '/parametros/obtener',
      actualizar: '/parametros/actualizar',
    },
    pagos: {
      actualizar: '/pagos/actualizarPagos',
      obtener: '/pagos/obtenerPagos',
    },
    responsable: {
      listado:'/responsable/listado',
      alta:'/responsable/alta'
    },
    // delegado: {
    //   listado:'/delegado/listado',
    //   alta:'/delegado/alta'
    // },
    autorizado: {
      listado:'/autorizado/listado',
      alta:'/autorizado/alta',
      editar:'/autorizado/editar',
      obtener:'/autorizado/obtener',
      suspender:'/autorizado/suspender',
      borrar:'/autorizado/borrar',
    },
    vendedor: {
      listado:'/vendedor/listado',
      alta:'/vendedor/alta',
      editar:'/vendedor/editar',
      obtener:'/vendedor/obtener',
      suspender:'/vendedor/suspender',
      borrar:'/vendedor/borrar',
    },
    colegio: {
      listado:'/colegio/listado',
      alta:'/colegio/alta',
      obtener:'/colegio/obtener',
      suspender:'/colegio/suspender',
      detalle:'/colegio/detalle',
      borrar:'/colegio/borrar',
      editar:'/colegio/editar',
      ver_colegio:'/colegio/ver-colegio'
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
      editar:'/admin/editar',
      me:'/admin/me',
    },
    usuario:{
      tyc:'/usuario/tyc',
      tyc_aceptar:'/usuario/aceptarTyc',
      cambiarPassword:'/usuario/cambiarPassword',
      suspender:'/usuario/suspender',
      resetearPass:'/usuario/resetearPass',
      obtener:'/usuario/detalle',
      borrar:'/usuario/borrar',
      editar:'/usuario/editar',
      me:'/usuario/me'
    },
    registro:{
      listado:'/registro/listado',
      listadoAdmin:'/registro/listadoAdmin',
    },
    red:{
      alta:'/red/alta',
      listado:'/red/listado',
      borrar:'/red/borrar',
      editarDatos:'/red/editarDatos',
      obtener:'/red/obtener',
      colegiosDisponibles:'/red/colegiosDisponibles',

      borrarMiembro:'/red/borrarMiembro',
      editarMiembros:'/red/editarMiembros',
      obtenerMiembros:'/red/obtenerMiembros',
      meRed:'/red/me'
    },
    beca:{
      listado:'/beca/listado',
      alta:'/beca/alta',
      solicitar:'/beca/solicitar',
      solicitudes:'/beca/solicitudes',
      solicitud_detalle:'/beca/solicitud-detalle',
      mis_solicitudes:'/beca/mis-solicitudes',
      mi_solicitud_detalle:'/beca/mi-solicitud-detalle',
      resolver:'/beca/resolver',
      desestimar:'/beca/desestimar',
      dar_baja:'/beca/dar-baja'
    },
    notificaciones:{
      listado:'/notificacion/listado',
      admin:'/notificacion/listadoAdmin'
    },
    dashboard:{
      listado:'/dashboard/',
    },
    reporte: {
      listado:'/reporte/listado',
      alta:'/reporte/nuevo',
      borrar:'/reporte/borrar',
    }
  }


};
