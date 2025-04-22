// 👤 Cada tarjeta del dashboard
export interface DashboardCard {
  titulo: string;
  valor: number;
  subtitulo: string;
  color: 'primary' | 'success' | 'warning' | 'info'; // podés agregar más si querés
}

// 📋 Becas por estado (por ID de estado)
export interface BecasPorEstado {
  [estadoId: number]: number;
}

// 🕒 Últimas solicitudes
export interface UltimaSolicitud {
  idBeca: number,
  alumnoNombre: string,
  alumnoApellido: string,
  alumnoDni: string,
  fechaHora: string,
  estado:  {
    id: number ,
    nombre:string
  },
  resolucion:  {
    id: number ,
    nombre:string
  },
  colegioPublico: {
    id: number ,
    nombre:string
  },
  colegioSolicito: {
    id: number,
    nombre:string
  }
  }

// 📊 Resumen general
export interface DashboardResumen {
  colegios: number;
  colegiosActivos: number;
  colegiosInactivos: number;
  porcentajeColegiosActivos: string; // viene como string porque usás .toFixed(2)
  redes: number;
  becasPublicadas: number;
  promedioBecasPorColegio: string; // también string por .toFixed(2)
  totalSolicitudes: number;
  tasaAprobacion: string; // string por .toFixed(2)
  solicitudesDisponibles:number
}

// 🚀 Modelo principal
export interface Dashboard {
  resumen: DashboardResumen;
  cards: DashboardCard[];
  becasPorEstado: BecasPorEstado;
  ultimasSolicitudes: UltimaSolicitud[];
  ocupacion:Ocupacion
}

export interface Ocupacion{
  becasOcupadas:number
  becasDisponibles: number,
  porcentajeOcupadas: number,
  porcentajeDisponibles: number
}

