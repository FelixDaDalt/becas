import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmar',
  standalone: true,
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent {

    @Input() itemAEliminar: string = '';

    constructor(private activeModal:NgbActiveModal){}

    confirmar() {
      this.activeModal.close(true)
    }

    cancelar(){
      this.activeModal.close(false)
    }

}
