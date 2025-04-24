import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReporteService } from 'src/servicios/reporte.service';


@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteErrorComponent {
  formularioReporte!: FormGroup;
  enviado = false;

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private reporteService: ReporteService
  ) {
    this.formularioReporte = this.fb.group({
      asunto: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  enviarReporte() {
    if (this.formularioReporte.valid) {
      this.reporteService.altaReporte(this.formularioReporte.value).subscribe(() => {
        this.enviado = true;
        setTimeout(() => this.activeModal.close(), 2000); // cerrar después de 2 segundos
      });
    }
  }

  cerrar() {
    this.activeModal.close();
  }
}
