export interface Solicitudes {
  id: number
  fecha: string
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
