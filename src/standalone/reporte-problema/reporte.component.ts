import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from 'src/interfaces/usuario';
import { TerminosService } from 'src/servicios/terminos.service';
import { usuarioService } from 'src/servicios/usuario.service';
import { ErrorFormularioComponent } from "../error-formulario/error-formulario.component";
import { shareReplay } from 'rxjs';


@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteErrorComponent{

  formularioReporte!:FormGroup

  constructor(private fb:FormBuilder, private activeModal:NgbActiveModal){

  this.formularioReporte = this.fb.group({
    asunto: ['', [Validators.required, Validators.maxLength(100)]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
  });
}


  enviarReporte() {
    if (this.formularioReporte.valid) {
      // Llamada al servicio para enviar el reporte
      console.log('Reporte enviado:', this.formularioReporte.value);
    }
  }

  cerrar(){
    this.activeModal.close()
  }
}
