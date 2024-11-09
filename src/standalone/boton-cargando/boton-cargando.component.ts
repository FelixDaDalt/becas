import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CargandoService } from 'src/servicios/cargando.service';

@Component({
  selector: 'app-boton-cargando',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boton-cargando.component.html',
  styleUrls: ['./boton-cargando.component.css']
})
export class BotonCargandoComponent {

  @Input() disabled = false; // Propiedad para habilitar/deshabilitar el botón
  @Input() label: string = 'Submit'; // Texto del botón

  loading: boolean = false; // Estado local de loading

  constructor(private cargandoService: CargandoService) {}

  ngOnInit(): void {
    this.cargandoService.cargando$.subscribe(cargando => {
      this.loading = cargando; // Actualizar el estado local al del servicio
    });
  }
}
