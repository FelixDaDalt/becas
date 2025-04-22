export interface BecaAutomatizacionEjecuciones {
  id: number
  tipo: string
  fecha: string
  estado: string
  total_procesadas: number
  error: string
  beca_automatizacion_logs: BecaAutomatizacionLog[]
}

export interface BecaAutomatizacionLog {
  id: number
  id_beca_solicitud: number
  id_estado_anterior: number
  id_estado_nuevo: number
  fecha_registro: string
  tipo_notificacion: string
  email_colegio_solicitante: string
  email_colegio_ofrecio: string
  motivo: string
  id_ejecucion: number
}
