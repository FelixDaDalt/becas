export interface zona{
  id:number,
  nombre:string,
  zona_localidad?:zona_localidad[]
}

export interface zona_localidad{
  id:number,
  nombre:string,
  id_zona?:number
  zona?:zona
}
