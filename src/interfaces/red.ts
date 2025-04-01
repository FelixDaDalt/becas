export interface listadoRedes{
  redes:Red[]
  misRedes:Red[]
  vinculado:Red[]
}

export interface Red{
  id:number
  fecha_hora:string
  nombre:string
  foto:string
  porcentaje:string
  caracteristicas:string
  Anfitrion?:colegio
}

interface colegio{
  id:number
  nombre:string
  cuit:string
}
