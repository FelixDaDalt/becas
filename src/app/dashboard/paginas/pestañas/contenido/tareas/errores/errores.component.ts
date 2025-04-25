import { Component } from '@angular/core';
import { shareReplay, take } from 'rxjs';
import { reporte_error } from 'src/interfaces/reporte_error';
import { ReporteService } from 'src/servicios/reporte.service';
import { TareasService } from 'src/servicios/tareas.service';

@Component({
  selector: 'app-reporte-errores',
  templateUrl: './errores.component.html',
  styleUrls: ['./errores.component.css']
})
export class ReporteErroresComponent {

  filtros = {
    fechaDesde: '',
    fechaHasta: '',
    page: 1,
    pageSize: 10
  };

  historial: reporte_error[] = [];
  paginaActual = 1;
  totalPaginas = 1;
  totalItems = 0;

  constructor(private reporteService:ReporteService){
    const hoy = new Date();
    const hoyStr = hoy.toISOString().slice(0, 10); // formato 'YYYY-MM-DD'

    this.filtros.fechaDesde = hoyStr;
    this.filtros.fechaHasta = hoyStr;

    this.buscarHistorial();
  }

  buscarHistorial() {
    this.reporteService.obtenerReportes({
      page: this.filtros.page,
      pageSize: this.filtros.pageSize,
      fechaDesde: this.filtros.fechaDesde,
      fechaHasta: this.filtros.fechaHasta
    }).pipe(take(1)).subscribe(resp => {
      this.historial = resp.data;
      this.paginaActual = resp.paginaActual;
      this.totalPaginas = resp.paginas;
      this.totalItems = resp.total;
      console.log(this.historial)
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
