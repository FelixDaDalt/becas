import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { shareReplay, tap } from 'rxjs';
import { forma_pagos } from 'src/interfaces/forma_pagos';
import { plan } from 'src/interfaces/plan';
import { FormasPagoService } from 'src/servicios/formas_pago.service';
import { PlanesService } from 'src/servicios/planes.service';
import { ConfirmarComponent } from 'src/standalone/confirmar/confirmar.component';

@Component({
  selector: 'app-formas_Pago',
  templateUrl: './formas_pago.component.html',
  styleUrls: ['./formas_Pago.component.css']
})
export class FormasPagoComponent {

  pagos$ = this.formasPagoService.pagos$.pipe(shareReplay(1));
  pagoForm: FormGroup;
  pagoSeleccionado?:forma_pagos

  constructor(private formasPagoService: FormasPagoService, private fb: FormBuilder, private modalService:NgbModal) {
    this.pagoForm = this.fb.group({
      id: [null], // <- importante agregar el campo ID
      identificador: [null],
      nombre: [null],
      descuento: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  guardarPago() {
    if (this.pagoForm.valid) {
      const pago = this.pagoForm.value;
      if (pago.id) {
        // 🔵 Está editando
        this.formasPagoService.actualizarpagos(pago).subscribe(() => {
          this.reiniciarFormulario();
        });
      }
    } else {
      this.pagoForm.markAllAsTouched();
    }
  }

  seleccionarPago(pagoSeleccionado: forma_pagos) {
    this.pagoSeleccionado = pagoSeleccionado
    // 🔥 Patchea el formulario con el plan seleccionado
    this.pagoForm.patchValue({
      id: pagoSeleccionado.id,
      identificador: pagoSeleccionado.identificador,
      nombre: pagoSeleccionado.nombre,
      descuento: pagoSeleccionado.descuento
    });
  }

  reiniciarFormulario() {
    this.pagoSeleccionado = undefined
    this.pagoForm.reset();
  }


}
