import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, shareReplay, take } from 'rxjs';
import { AuthService } from 'src/core/auth.service';
import { Usuario } from 'src/interfaces/usuario';
import { AdminService } from 'src/servicios/admin.service';
import { usuarioService } from 'src/servicios/usuario.service';
import { ErrorFormularioComponent } from "../error-formulario/error-formulario.component";
import { BotonCargandoComponent } from "../boton-cargando/boton-cargando.component";

@Component({
  selector: 'app-editar-mis-datos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorFormularioComponent, BotonCargandoComponent],
  templateUrl: './editar-mis-datos.component.html',
  styleUrls: ['./editar-mis-datos.component.css']
})
export class EditarMisDatosComponent implements OnInit{

  @Input() idUsuario?:number
  @Input() idRol?:number
  admin=false
  formularioEdicion:FormGroup
  public archivoSeleccionado: File | null = null;

  usuario$?:Observable<Usuario | undefined> = of(undefined)

  constructor(private usuarioService:usuarioService,
    private activeModal:NgbActiveModal,
    private adminService:AdminService,
    private authService:AuthService,
    private fb:FormBuilder
  ){
    this.formularioEdicion = this.fb.group({
      id:[null,Validators.required],
      dni:[null,Validators.required],
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      telefono: ['',Validators.pattern(/^\d+$/)],
      celular: ['',Validators.pattern(/^\d+$/)],
      email: ['',Validators.email],
      foto: [null]
    })
  }

  ngOnInit(): void {
    if(!this.idUsuario){
      this.idUsuario = this.authService.getUser().id
    }

    if(!this.idRol){
      this.idRol = this.authService.getUserRole()
    }

    this.admin = this.idRol==0?true:false

    if(this.idUsuario){
      !this.admin?
      this.usuarioService.obtenerUsuario(this.idUsuario).pipe(take(1),shareReplay(1)).subscribe(
        usuario=>this.formularioEdicion.patchValue(usuario)
      ):
      this.adminService.obtenerAdmin(this.idUsuario).pipe(take(1),shareReplay(1)).subscribe(
        usuario=>this.formularioEdicion.patchValue(usuario)
      )
    }
  }

  cerrar(){
    this.activeModal.close()
  }

  seleccionFoto(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0]; // Obtén el archivo seleccionado
    } else {
      this.archivoSeleccionado = null;
    }
  }

  submitForm() {
    if (this.formularioEdicion.valid) {
      const formData = this.crearFormData();
      this.usuarioService.editarUsuario(formData,this.idRol!).subscribe(respuesta=>{
        this.activeModal.close(true)
      })
    }else{
      this.formularioEdicion.markAllAsTouched()
    }
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
        formData.append(`usuario[${key}]`, datosPrincipales[key]);
      }
    }
    return formData;
  }
}
