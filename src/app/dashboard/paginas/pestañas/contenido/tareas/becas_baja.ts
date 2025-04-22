export interface BecasBaja {
  becasProcesadas: number
  colegiosInvolucrados: ColegiosInvolucrado[]
}

export interface ColegiosInvolucrado {
  beca: number
  colegioSolicitante: string
  colegioOfrecio: string
}
