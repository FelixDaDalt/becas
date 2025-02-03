import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BecaService } from 'src/servicios/beca.service';

@Component({
  selector: 'app-solicitud-beca',
  templateUrl: './solicitud-beca.component.html',
  styleUrls: ['./solicitud-beca.component.css']
})

export class SolicitudBecaComponent implements OnInit{
  @Input() idBeca?:number
  @Input() idRed?:number
  @Input() maximo:number = 0
  activeTabIndex = 0; // Índice de la pestaña acti
  formSolicitud:FormGroup

  constructor(private fb:FormBuilder,
    private activeModal:NgbActiveModal,
    private becaService:BecaService)
  {
    this.formSolicitud = fb.group({
      id_beca:[null,Validators.required],
      alumnos: this.fb.array([])
    })
  }

  ngOnInit(): void {
    if(this.idBeca)
      this.formSolicitud.patchValue({id_beca: this.idBeca})
  }

  // Getter para acceder al FormArray de alumnos
  get alumnos(): FormArray<FormGroup> {
    return this.formSolicitud.get('alumnos') as FormArray<FormGroup>;
  }

  agregarAlumno(): void {
    const alumnoForm = this.fb.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      dni: [null, [Validators.required,Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^\d+$/)]],
      fecha_nacimiento: [null, Validators.required],
      detalle: [null]
    });

    this.alumnos.push(alumnoForm);
    this.maximo--
    setTimeout(() => {
      this.activeTabIndex = this.alumnos.length - 1;
    }, 1000);
  }

  // Método para eliminar un alumno por índice
  eliminarAlumno(index: number, event: Event): void {
    event.stopPropagation(); // Evitar que se active la pestaña al hacer clic en el botón de eliminar
    this.alumnos.removeAt(index);
    if (this.activeTabIndex >= this.alumnos.length) {
      this.activeTabIndex = this.alumnos.length - 1; // Ajustar la pestaña activa
    }
    this.maximo++
  }

  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }

  enviarFormulario(): void {
    if(this.formSolicitud.valid && this.idRed){
      this.becaService.solicitar(this.formSolicitud.value,this.idRed).subscribe(()=>{
        this.activeModal.close(true)
      })
    }


  }

  cancelar(){
    this.activeModal.close(false)
  }


}
