import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReporteErrorComponent } from 'src/standalone/reporte-problema/reporte.component';
import { tycComponent } from 'src/standalone/terminos/terminos.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private modalService:NgbModal){}

  tyc(){
    const tycModal = this.modalService.open(tycComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'xl'
    });
    tycModal.componentInstance.soloMostrar = true
  }

  reportar(){
    const tycModal = this.modalService.open(ReporteErrorComponent, {
      size: 'xl'
    });
  }
}
