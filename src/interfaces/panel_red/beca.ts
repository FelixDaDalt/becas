export interface Beca {
  id: number
  cantidad: number
  fecha_hora: string
  colegio: Colegio
  usuario: Usuario
  disponible: number
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
  borrado: boolean
  foto: string
}

export interface Usuario {
  nombre: string
  apellido: string
}
