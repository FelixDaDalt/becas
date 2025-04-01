export interface Solicitudes {
  id: number
  fecha: string
  sinLeer: boolean
  estado: Estado
  solicitante: Solicitante
  colegioSolicitado: string
}

export interface Estado {
  id: number
  nombre: string
}

export interface Solicitante {
  colegio: string
  usuario: string
  alumno: string
}
