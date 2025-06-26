import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { map, shareReplay, Subscription, tap } from 'rxjs';
import { AutorizadoService } from 'src/servicios/autorizado.service';
import { BecaService } from 'src/servicios/beca.service';

@Component({
  selector: 'app-solicitud-beca',
  templateUrl: './solicitud-beca.component.html',
  styleUrls: ['./solicitud-beca.component.css'],
})
export class SolicitudBecaComponent implements OnInit, OnDestroy {
  @Input() idBeca?: number;
  @Input() idRed?: number;
  @Input() maximo: number = 0;
  activeTabIndex = 0; // Índice de la pestaña acti
  formSolicitud: FormGroup;
  autorizados$ = this.autorizadoService.autorizados$.pipe(
    map(vs => vs.map(v => ({
      ...v,
      label: `${v.apellido}, ${v.nombre}${v.suspendido == 1 ? ' (Suspendido)' : v.disponible === 0?' (Sin Cupo)':''}`,
      disabled: v.suspendido == 1 || v.disponible === 0
    }))),
    tap(autorizados => {
      // Guardamos una copia modificable local
      this.autorizadosDisponibles = autorizados.map(a => ({ ...a }));
      console.log(this.autorizadosDisponibles)
    }),
    shareReplay(1)
  ).subscribe();

  autorizadosDisponibles: any[] = [];
  private suscripcionesIdPariente: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private becaService: BecaService,
    private autorizadoService: AutorizadoService
  ) {
    this.formSolicitud = fb.group({
      id_beca: [null, Validators.required],
      alumnos: this.fb.array([]),
    });
  }

  ngOnDestroy(): void {
    this.suscripcionesIdPariente.forEach(sub => sub.unsubscribe());
    this.suscripcionesIdPariente = [];
  }

  ngOnInit(): void {
    if (this.idBeca){ this.formSolicitud.patchValue({ id_beca: this.idBeca })
      this.autorizadoService.obtenerAutorizados()
    };


  }

  // Getter para acceder al FormArray de alumnos
  get alumnos(): FormArray<FormGroup> {
    return this.formSolicitud.get('alumnos') as FormArray<FormGroup>;
  }

  agregarAlumno(): void {

  const alumnoForm = this.fb.group({
    nombre: [null, Validators.required],
    apellido: [null, Validators.required],
    dni: [
      null,
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern(/^\d+$/),
      ],
    ],
    fecha_nacimiento: [null, Validators.required],
    detalle: [null],
    id_pariente: [null, Validators.required],
  });

  const sub = alumnoForm.get('id_pariente')?.valueChanges.subscribe(idPariente => {
    if (idPariente != null) {
      const autorizado = this.autorizadosDisponibles.find(a => a.id === idPariente);
      if (autorizado) {
        autorizado.disponible = (autorizado.disponible ?? 1) - 1;
        if (autorizado.disponible <= 0) {
          autorizado.disabled = true;
          autorizado.label = `${autorizado.apellido}, ${autorizado.nombre} (Sin Cupo)`
        }
        // 🔄 Forzar actualización en el ng-select
        this.autorizadosDisponibles = [...this.autorizadosDisponibles];
      }
    }
  });

  this.suscripcionesIdPariente.push(sub!);
  this.alumnos.push(alumnoForm);
  this.maximo--;
}


  // Método para eliminar un alumno por índice
  eliminarAlumno(index: number, event: Event): void {
    event.stopPropagation();

    const alumnoForm = this.alumnos.at(index);
    const idPariente = alumnoForm.get('id_pariente')?.value;

    this.alumnos.removeAt(index);

    // Cancelar suscripción
    const sub = this.suscripcionesIdPariente[index];
    if (sub) {
      sub.unsubscribe();
      this.suscripcionesIdPariente.splice(index, 1);
    }

    // Devolver cupo
    if (idPariente != null) {
      const autorizado = this.autorizadosDisponibles.find(a => a.id === idPariente);
      if (autorizado) {
        autorizado.disponible = (autorizado.disponible ?? 0) + 1;
        if (autorizado.disponible > 0) {
          autorizado.disabled = false;
          autorizado.label = `${autorizado.apellido}, ${autorizado.nombre}`
        }
        // 🔄 Actualizar visualización
        this.autorizadosDisponibles = [...this.autorizadosDisponibles];
      }
    }

    if (this.activeTabIndex >= this.alumnos.length) {
      this.activeTabIndex = this.alumnos.length - 1;
    }

    this.maximo++;
  }

  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }

  enviarFormulario(): void {
    if (this.formSolicitud.valid && this.idRed) {
      this.becaService
        .solicitar(this.formSolicitud.value, this.idRed)
        .subscribe(() => {
          this.suscripcionesIdPariente.forEach(sub => sub.unsubscribe());
          this.suscripcionesIdPariente = [];
          this.activeModal.close(true);
        });
    } else {
      this.formSolicitud.markAllAsTouched();
    }
  }

  cancelar() {
    this.suscripcionesIdPariente.forEach(sub => sub.unsubscribe());
    this.suscripcionesIdPariente = [];
    this.activeModal.close(false);
  }

  compararAutorizados = (a: any, b: any): boolean => {
    return a && b && a.id === b.id;
  };
}
