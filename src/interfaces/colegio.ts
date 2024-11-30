import { Usuario } from "./usuario";
import { zona_localidad } from "./zona";


export interface Colegio {
  id: number;
  cuit: string;
  nombre: string;
  direccion_calle: string;
  direccion_numero: string;
  localidad: string;
  provincia: string;
  cp: string;
  telefono: string;
  url: string;
  email?: string | null;
  zona_localidad?:zona_localidad
  usuarios?: Usuario[];
  suspendido?: boolean
  terminos?:boolean
  anfitrion?:number
  foto?:string
  id_zona?:number
}


