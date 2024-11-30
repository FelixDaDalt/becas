import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CargandoService } from 'src/servicios/cargando.service';

@Component({
  selector: 'app-boton-cargando',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boton-cargando.component.html',
  styleUrls: ['./boton-cargando.component.css']
})
export class BotonCargandoComponent {
  @Input() disabled = false;
  @Input() label: string = 'Submit';
  @Output() action = new EventEmitter<void>();

  loading: boolean = false;

  constructor(private cargandoService: CargandoService) {}

  ngOnInit(): void {
    this.cargandoService.cargando$.subscribe(cargando => {
      this.loading = cargando;
    });
  }

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.action.emit(); // Emitir el evento solo si no está deshabilitado o cargando
    }
  }
}
