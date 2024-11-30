import { Colegio } from "./colegio";
import { Red } from "./red";
import { Usuario } from "./usuario";

export interface ColegioDetalle{
  colegio:Colegio,
  usuarios:detalle_usuarios
  anfitrion:Red[]
  miembro:Red[]
}

interface detalle_usuarios{
  responsables:Usuario[];
  delegados:Usuario[];
  autorizados:Usuario[];
}


