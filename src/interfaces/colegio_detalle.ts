import { Autorizado } from "./autorizado";
import { Colegio } from "./colegio";
import { Red } from "./red";
import { Usuario } from "./usuario";

export interface ColegioDetalle{
  colegio:Colegio,
  usuarios:detalle_usuarios
  anfitrion:Red[]
  miembro:Red[]
  autorizados:Autorizado[]
}

interface detalle_usuarios{
  responsables:Usuario[];
}


