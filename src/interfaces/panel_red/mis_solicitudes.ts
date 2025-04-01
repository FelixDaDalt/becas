export interface Mis_solicitudes {
  id: number
  fecha: string
  sinLeer: boolean
  estado: Estado
  solicitante: Solicitante
  solicitud: Solicitud
}

export interface Estado {
  id: number
  nombre: string
}

export interface Solicitante {
  usuario: string
}

export interface Solicitud {
  colegio: string
  alumno: string
}
