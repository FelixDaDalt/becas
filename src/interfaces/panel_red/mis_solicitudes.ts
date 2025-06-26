export interface Mis_solicitudes {
  id: number
  fecha: string
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
