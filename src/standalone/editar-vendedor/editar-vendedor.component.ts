import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { shareReplay, take } from 'rxjs';
import { ErrorFormularioComponent } from "../error-formulario/error-formulario.component";
import { BotonCargandoComponent } from "../boton-cargando/boton-cargando.component";
import { vendedorService } from 'src/servicios/vendedor.service';

@Component({
  selector: 'app-editar-vendedor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorFormularioComponent, BotonCargandoComponent],
  templateUrl: './editar-vendedor.component.html',
  styleUrls: ['./editar-vendedor.component.css']
})
export class EditarVendedorComponent implements OnInit{

  @Input() idVendedor?:number
  formularioEdicion:FormGroup
  utilizadas = 0;

  constructor(private vendedorService:vendedorService,
    private activeModal:NgbActiveModal,
    private fb:FormBuilder
  ){
    this.formularioEdicion = this.fb.group({
      id:[null,Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['',Validators.pattern(/^\d+$/)],
      celular: ['',Validators.pattern(/^\d+$/)],
      email: ['',Validators.email]
    })
  }

  ngOnInit(): void {
  if (this.idVendedor) {
    this.vendedorService.obtenerVendedor(this.idVendedor)
      .pipe(take(1), shareReplay(1))
      .subscribe(vendedor => {
        this.formularioEdicion.patchValue(vendedor);
      });
  }
}

  cerrar(){
    this.activeModal.close()
  }


  submitForm() {
    if (this.formularioEdicion.valid ) {
      const formData = this.formularioEdicion.value
      this.vendedorService.editarVendedor(formData).subscribe(respuesta=>{
        this.activeModal.close(true)
      })
    }else{
      this.formularioEdicion.markAllAsTouched()
    }
  }
}
