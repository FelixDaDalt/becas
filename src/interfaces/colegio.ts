import { forma_pagos } from "./forma_pagos";
import { plan } from "./plan";
import { Usuario } from "./usuario";
import { Vendedor } from "./vendedor";
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
  email?: string | null;
  id_zona_zona_localidad?:zona_localidad
  usuarios?: Usuario[];
  suspendido?: boolean
  anfitrion?:number
  foto?:string
  id_zona?:number
  id_forma_pago_forma_pago?:forma_pagos
  id_plan_plan?:plan
  id_vendedor_vendedor?:Vendedor
  cbu?:string
  alias?:string
}


