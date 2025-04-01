export interface zona{
  id:number,
  nombre:string,
  zona_localidads?:zona_localidad[]
}

export interface zona_localidad{
  id:number,
  nombre:string,
  id_zona?:number
  id_zona_zona?:zona
}
