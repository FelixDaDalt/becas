import { BufferData } from "./bufferData"
import { Colegio } from "./colegio";
import { Usuario } from "./usuario";

export interface ColegioDetalle{
  colegio:Colegio,
  usuarios:detalle_usuarios
}

interface detalle_usuarios{
  responsables:Usuario[];
  delegados:Usuario[];
  autorizados:Usuario[];
}


