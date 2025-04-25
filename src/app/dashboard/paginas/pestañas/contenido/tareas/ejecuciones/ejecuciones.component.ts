import { Component } from '@angular/core';
import { shareReplay, take } from 'rxjs';
import { TareasService } from 'src/servicios/tareas.service';
import { BecaAutomatizacionEjecuciones } from './beca_automatizacion';

@Component({
  selector: 'app-ejecuciones',
  templateUrl: './ejecuciones.component.html',
  styleUrls: ['./ejecuciones.component.css']
})
export class EjecucionesComponent {

  filtros = {
    tipo: [],
    fechaDesde: '',
    fechaHasta: '',
    page: 1,
    pageSize: 10
  };

  historial: BecaAutomatizacionEjecuciones[] = [];
  paginaActual = 1;
  totalPaginas = 1;
  totalItems = 0;

  constructor(private tareasService:TareasService){
    const hoy = new Date();
    const hoyStr = hoy.toISOString().slice(0, 10); // formato 'YYYY-MM-DD'

    this.filtros.fechaDesde = hoyStr;
    this.filtros.fechaHasta = hoyStr;

    this.buscarHistorial();
  }

  buscarHistorial() {
    this.tareasService.obtenerEjecuciones({
      page: this.filtros.page,
      pageSize: this.filtros.pageSize,
      fechaDesde: this.filtros.fechaDesde,
      fechaHasta: this.filtros.fechaHasta,
      tipo: this.filtros.tipo // 👈 tipo ya es array
    }).pipe(take(1)).subscribe(resp => {
      this.historial = resp.data;
      this.paginaActual = resp.paginaActual;
      this.totalPaginas = resp.paginas;
      this.totalItems = resp.total;
    });
  }

  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.filtros.page = pagina;
      this.buscarHistorial();
    }
  }

  paginasArray(): number[] {
    return Array(this.totalPaginas)
      .fill(0)
      .map((_, i) => i + 1);
  }
}
