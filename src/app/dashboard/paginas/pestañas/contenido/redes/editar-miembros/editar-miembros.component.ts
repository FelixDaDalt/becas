import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Colegio } from 'src/interfaces/colegio';
import { Red } from 'src/interfaces/red';
import { RedService } from 'src/servicios/red.service';
import { ConfirmarComponent } from 'src/standalone/confirmar/confirmar.component';

export interface colegiosRed{
  disponibles:Colegio[]
  miembros:Colegio[]
}

@Component({
  selector: 'app-editar-miembros',
  templateUrl: './editar-miembros.component.html',
  styleUrls: ['./editar-miembros.component.css']
})
export class EditarMiembrosComponent implements OnInit{
  apiFile=environment.fileUrl
  @Input()red?:Red
  miembros = this.redService.colegioDisponibles$.pipe(tap(colegiosRed=>{
    if(colegiosRed){
      this.colegiosDisponibles = colegiosRed.disponibles
      this.colegiosMiembros = colegiosRed.miembros
    }
  })).subscribe()

  colegiosDisponibles:Colegio[] = []
  colegiosMiembros:Colegio[] = []
  colegiosSeleccionados:Colegio[] = []
  wizardForm: FormGroup;

  constructor(private redService:RedService,
    private modalService:NgbModal,
    private fb:FormBuilder,
    private activeModal:NgbActiveModal
  ){
    this.wizardForm = this.fb.group({
      id_red: [null, Validators.required],
      integrantes: this.fb.array([],Validators.required)
    });
  }

  ngOnInit(): void {
    if(this.red){
      this.redService.obtenerColegiosDisponibles(this.red.id)
      this.wizardForm.get('id_red')?.patchValue(
       this.red.id
      );
    }
  }

  get integrantes() {
    return this.wizardForm.get('integrantes') as FormArray;
  }

  onIntegrantesChange(selectedIntegrantes: any[]): void {
    this.colegiosSeleccionados = []
    selectedIntegrantes.forEach((colegio, index) => {
      const integrante = {
        id: colegio.id,
        anfitrion: 0, // Marca el primer seleccionado como anfitrion
      };
      this.integrantes.push(new FormControl(integrante));
      this.colegiosSeleccionados.push(colegio)
    });
  }

  confirmarEliminar(colegio:Colegio){
    const modalEliminar = this.modalService.open(ConfirmarComponent,{backdrop:'static'})
    modalEliminar.componentInstance.itemAEliminar = colegio.nombre + ', '+ colegio.cuit + ' de la red ' + this.red?.nombre
    modalEliminar.result.then(r=>{
      if(r)
        this.eliminarMiembro(colegio.id)
    })
  }

  private eliminarMiembro(idColegio:number){
    if(this.red)
      this.redService.borrarMiembro(this.red.id,idColegio)
  }

  guardar(){
    this.redService.editarMiembros(this.wizardForm.value).subscribe(r=>{
      if(r)
        this.activeModal.close(true)
    })
  }

  cancelar(){
    this.activeModal.close(false)
  }
}
