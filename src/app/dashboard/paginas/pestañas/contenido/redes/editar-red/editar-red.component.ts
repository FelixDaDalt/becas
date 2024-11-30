import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Red } from 'src/interfaces/red';
import { RedService } from 'src/servicios/red.service';

@Component({
  selector: 'app-editar-red',
  templateUrl: './editar-red.component.html',
  styleUrls: ['./editar-red.component.css']
})
export class EditarRedComponent implements OnInit {

    formularioEdicion:FormGroup;
    @Input()red?:Red
    public archivoSeleccionado: File | null = null;

    constructor(private fb:FormBuilder, private activeModal:NgbActiveModal, private redService:RedService)
    {
      this.formularioEdicion = this.fb.group({
        id:[null,Validators.required],
        nombre: ['', Validators.required],
        foto: [null],
        porcentaje: [75, [Validators.required, Validators.min(0), Validators.max(100)]],
        caracteristicas: ['', Validators.required],
      })
    }

    ngOnInit(): void {
      if(this.red)
        this.formularioEdicion.patchValue(this.red)
    }

    private crearFormData(): FormData {
      const formData = new FormData();

      // Datos principales
      const datosPrincipales = this.formularioEdicion.value;;
      for (const key in datosPrincipales) {
        if (key === 'foto' && this.archivoSeleccionado) {
          // Adjuntar la foto seleccionada al FormData
          formData.append('foto', this.archivoSeleccionado);
        } else {
          // Agregar los demás campos del grupo datosPrincipales
          formData.append(`red[${key}]`, datosPrincipales[key]);
        }
      }
      return formData;
    }

    seleccionFoto(event: Event) {
      const input = event.target as HTMLInputElement;

      if (input.files && input.files.length > 0) {
        this.archivoSeleccionado = input.files[0]; // Obtén el archivo seleccionado
        console.log('Archivo seleccionado:', this.archivoSeleccionado);
      } else {
        this.archivoSeleccionado = null;
        console.log('No se seleccionó ningún archivo');
      }
    }

    submitForm() {
      if (this.formularioEdicion.valid) {
        const formData = this.crearFormData();
        this.redService.editarRed(formData).subscribe(respuesta=>{
          this.activeModal.close(true)
        })
      }else{
        this.formularioEdicion.markAllAsTouched()
      }
    }

    cancelar(){
      this.activeModal.close(false)
    }
}
