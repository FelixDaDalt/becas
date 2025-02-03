export interface Notificacion {
  solicitudesSinLeer: number
  misSolicitudesSinLeer: number
  total: number
  solicitudes: Solicitud[]
  misSolicitudes: MiSolicitud[]
}

export interface Solicitud {
  id: number
  id_red: number
  fecha_hora: string
  nombre:string
  foto:string
  desestimado:boolean
}

export interface MiSolicitud {
  id: number
  id_red: number
  nombre: string
  reso_fecha_hora: string
  foto:string
}
