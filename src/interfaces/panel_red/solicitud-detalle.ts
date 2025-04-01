export interface solicitud_detalle {
  id: number
  detalle: string
  fecha: string
  estado: Estado
  resolucion: Resolucion
  solicitante: Solicitante
  alumno: Alumno
  baja:boolean
  detalle_baja?:Dettale_Baja
  solicitado:Solicitado
}
export interface Dettale_Baja{
  usuario:Usuario,
  fecha:string,
  comentario:string
}

export interface Estado {
  id: number
  nombre: string
}

export interface Resolucion {
  conResolucion:boolean
  id: number
  nombre: string
  detalle:Resolucion_detalle
}

export interface Resolucion_detalle{
  comentario:string
  fecha:string
  usuario:Usuario
}

export interface Solicitante {
  colegio: Colegio
  usuario: Usuario
}

export interface Solicitado {
  colegio: Colegio
}

export interface Colegio {
  id: number
  cuit: string
  nombre: string
  direccion_calle: string
  direccion_numero: string
  localidad: string
  provincia: string
  cp: string
  id_zona: number
  telefono: string
  url: string
  email: string
  foto: string
  zona_localidad: ZonaLocalidad
}

export interface ZonaLocalidad {
  nombre: string
  id: number
  id_zona: number
  zona: Zona
}

export interface Zona {
  nombre: string
  id: number
}

export interface Usuario {
  nombre: string
  apellido: string
  telefono: string
  celular: string
  email: string
  foto: string
}

export interface Alumno {
  nombre: string
  apellido: string
  dni: string
  nacimiento: string
}
