export interface ver_colegio {
  colegio: Colegio
  responsables: Responsable[]
}

interface Colegio {
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
  email: string
  foto: string
  id_zona_zona_localidad: IdZonaZonaLocalidad
  red_colegios: RedColegio[]
}

 interface IdZonaZonaLocalidad {
  id: number
  nombre: string
  id_zona: number
  id_zona_zona: IdZonaZona
}

interface IdZonaZona {
  id: number
  nombre: string
}

interface RedColegio {
  id_red: number
  id_red_red: IdRedRed
}

interface IdRedRed {
  id: number
  nombre: string
  porcentaje: string
  foto: string
  caracteristicas: string
}

interface Responsable {
  id: number
  dni: string
  nombre: string
  apellido: string
  foto: string
}
