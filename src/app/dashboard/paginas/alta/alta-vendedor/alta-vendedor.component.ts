
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

import { ComprobarService } from 'src/servicios/comprobar.service';
import { vendedorService } from 'src/servicios/vendedor.service';


@Component({
  selector: 'app-alta-vendedor',
  templateUrl: './alta-vendedor.component.html',
  styleUrls: ['./alta-vendedor.component.css']
})
export class AltaVendedorComponent{
  wizardForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router:Router,
    private vendedorService:vendedorService,
    private comprobarService:ComprobarService,
    private activeRoute: ActivatedRoute) {


    this.wizardForm = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        dni: ['', [Validators.required,Validators.minLength(8)]],
        telefono: ['',Validators.pattern(/^\d+$/)],
        celular: ['',Validators.pattern(/^\d+$/)],
        email: ['',Validators.email]
    });
  }

  submitForm() {
    if (this.wizardForm.valid) {
      const formData = this.wizardForm.value;
      this.vendedorService.altaVendedor(formData).subscribe(respuesta=>{
        this.router.navigate(['../vendedores'], {relativeTo:this.activeRoute});
      })
    }else{
      this.wizardForm.markAllAsTouched()
    }
  }

  comprobarDni(){
    const dni = this.wizardForm.get('dni')?.value
    if(dni){
      this.comprobarService.comprobarDniVendedor(dni).pipe(
        take(1)
      ).subscribe(
        disponible => {
          if (!disponible) {
            this.wizardForm.get('dni')?.setErrors({ noDisponible: true });
          }
          this.wizardForm.get('dni')?.markAsTouched()
        }
      )
    }else{
      this.wizardForm.get('acceso.dni')?.markAsTouched()
    }
  }

  cancelar(){
    this.router.navigate(['../'],{relativeTo:this.activeRoute})
  }
}
