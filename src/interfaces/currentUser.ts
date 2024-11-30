export interface CurrentUser {
  id: number
  id_colegio: number
  id_rol: number
  dni: string
  nombre: string
  apellido: string
  telefono: string
  celular: string
  email: string
  tyc: boolean
  id_colegio_colegio: IdColegioColegio
  id_rol_role: IdRolRole
  foto:string
}

export interface IdColegioColegio {
  nombre: string
}

export interface IdRolRole {
  descripcion: string
}
