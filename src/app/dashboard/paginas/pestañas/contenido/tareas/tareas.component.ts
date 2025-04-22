import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { shareReplay, tap } from 'rxjs';
import { plan } from 'src/interfaces/plan';
import { zona_localidad, zona } from 'src/interfaces/zona';
import { PlanesService } from 'src/servicios/planes.service';
import { TareasService } from 'src/servicios/tareas.service';
import { ZonasService } from 'src/servicios/zonas.service';
import { ConfirmarComponent } from 'src/standalone/confirmar/confirmar.component';
import { BecasBaja } from './becas_baja';
import { NotificacionService } from 'src/servicios/notificacion.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent {
  loading = false;
  verificarRed = false;

  tareas = [
    {
      nombre: 'Procesar Becas Pendientes de Baja',
      icono: 'bi bi-gear-fill', // cualquier ícono de Bootstrap Icons
      accion: 'procesarBecasBaja'
    },
    {
      nombre: 'Procesar Por Vencer y Notificar',
      icono: 'bi bi-gear-fill', // cualquier ícono de Bootstrap Icons
      accion: 'procesarBecasPorVencer'
    },
    {
      nombre: 'Procesar Vencidas y Notificar',
      icono: 'bi bi-gear-fill', // cualquier ícono de Bootstrap Icons
      accion: 'procesarBecasVencidas'
    },
    {
      nombre: 'Verificar Redes',
      icono: 'bi bi-gear-fill', // cualquier ícono de Bootstrap Icons
      accion: 'verificarRedes'
    },
  ];

  respuesta?:any
  sincronizaciones: { [idRed: string]: any[] } = {}

  constructor(private tareasService: TareasService, private notificacionService:NotificacionService,
    private modal:NgbModal
  ) {}

  ejecutarTarea(tarea: any) {
    this.loading = true

    if (tarea.accion === 'procesarBecasBaja') {
      this.tareasService.ejecutarBajas().subscribe((r:BecasBaja)=>{
        this.respuesta = r
        this.notificacionService.obtenerNotificacionesAdmin()
        this.loading = false

      })
      return
    }

    if (tarea.accion === 'procesarBecasPorVencer') {
      this.tareasService.ejecutarPorVencer().subscribe((r:BecasBaja)=>{
        this.respuesta = r
        this.notificacionService.obtenerNotificacionesAdmin()
        this.loading = false
      })
      return
    }

    if (tarea.accion === 'procesarBecasVencidas') {
      this.tareasService.ejecutarVencidas().subscribe((r:BecasBaja)=>{
        this.respuesta = r
        this.notificacionService.obtenerNotificacionesAdmin()
        this.loading = false
      })
      return
    }

    if (tarea.accion === 'verificarRedes') {
      this.verificarRed = true
      this.tareasService.comprobarRed().subscribe((r:any)=>{
        console.log(r)
        this.respuesta = r
        this.loading = false
      })
      return
    }
  }

  sincronizarRed(idRed:number){
    this.tareasService.sincronizarRed(idRed).subscribe(r=>{
      this.sincronizaciones[idRed] = r;
      this.tareasService.comprobarRed(idRed).subscribe((r:any)=>{
        if (r && r.length > 0) {
          const nuevaRed = r[0]; // 🔥 porque comprobarRed devuelve array

          // Buscamos en this.respuesta la red que corresponde
          const indexRed = this.respuesta.findIndex((r:any) => r.red.id === nuevaRed.red.id);

          if (indexRed !== -1) {
            // 🔥 Actualizamos solo esa red
            this.respuesta[indexRed] = {
              ...this.respuesta[indexRed], // conservamos otros campos si tuvieras
              colegios: nuevaRed.colegios // 🚀 Actualizamos los colegios con los nuevos
            };
          }
        }
      })
    })
  }

  tieneErrores(colegios: any[]) {
    return colegios.some(c => !c.testCheck);
  }
}
