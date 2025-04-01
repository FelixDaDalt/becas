import { Usuario } from "./usuario"

export interface Registro{
  administrador?:registro_detalle[]
  responsable?:registro_detalle[]
  delegado?:registro_detalle[]
  autorizado?:registro_detalle[]
}

interface registro_detalle{
  id:number,
  descripcion:string,
  fechaHora:string
  accion:string
  entidad:string
  realizadoPor:string
  ip:string
  navegador:string,
  administrador?:{id:number,nombre:string,apellido:string},
  usuario?:{id:number,nombre:string,apellido:string}
}
