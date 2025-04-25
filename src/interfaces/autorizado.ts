export interface Autorizado{
  id: number;
  dni: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  celular?: string;
  email: string;
  suspendido:number;
  cantidad:number;
  id_colegio:number;
  utilizadas:number
  disponible?:number
}
