import { Colegio } from "./colegio"
import { Usuario } from "./usuario"

export interface reporte_error{
  id:number
  asunto:string
  descripcion:string
  id_usuario:number
  id_usuario_usuario:Usuario
  borrado:number
  fecha:string
  id_colegio_colegio:Colegio
}
