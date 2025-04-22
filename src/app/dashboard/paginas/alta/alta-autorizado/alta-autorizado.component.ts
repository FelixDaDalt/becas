
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AutorizadoService } from 'src/servicios/autorizado.service';
import { ComprobarService } from 'src/servicios/comprobar.service';


@Component({
  selector: 'app-alta-autorizado',
  templateUrl: './alta-autorizado.component.html',
  styleUrls: ['./alta-autorizado.component.css']
})
export class AltaAutorizadoComponent{
  wizardForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router:Router,
    private autorizadoService:AutorizadoService,
    private comprobarService:ComprobarService,
    private activeRoute: ActivatedRoute) {


    this.wizardForm = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        dni: ['', Validators.required],
        telefono: ['',Validators.pattern(/^\d+$/)],
        celular: ['',Validators.pattern(/^\d+$/)],
        email: ['',Validators.email],
    });
  }

  submitForm() {
    if (this.wizardForm.valid) {
      const formData = this.wizardForm.value;
      this.autorizadoService.altaAutorizado(formData).subscribe(respuesta=>{
        this.router.navigate(['../autorizados'], {relativeTo:this.activeRoute});
      })
    }else{
      this.wizardForm.markAllAsTouched()
    }
  }

  comprobarDni(){
    const dni = this.wizardForm.get('dni')?.value
    if(dni){
      this.comprobarService.comprobarDni(dni).pipe(
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
