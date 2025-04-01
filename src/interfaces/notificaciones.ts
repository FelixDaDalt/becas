export interface Notificacion {
  solicitudesSinLeer: number
  misSolicitudesSinLeer: number
  total: number
  solicitudes: Solicitud[]
  misSolicitudes: MiSolicitud[]
}

export interface Solicitud {
  id: number,
        colegio: string,
        foto: string,
        id_red: number,

        vencida: boolean,
        porVencer: boolean,
        desestimado: boolean,
        porBaja: boolean,
        dadaDeBaja: boolean,
        fecha: string,
}

export interface MiSolicitud {
  id: number,
  colegio: string,
  foto: string,
  id_red: number,

  vencida: boolean,
  porVencer: boolean,
  desestimado: boolean,
  porBaja: boolean,
  dadaDeBaja: boolean,
  fecha: string,
}
