import { Colegio } from "./colegio";

export interface administrador{
  id: number;
  id_rol: number;
  dni: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  celular?: string;
  id_rol_role?: Rol;
  suspendido: number;
  email: string;
  foto:string
}

export interface Usuario extends administrador{
  id_colegio: number;
  id_colegio_colegio?:Colegio
}

export interface Rol{
  descripcion: string
}
