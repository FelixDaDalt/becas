import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CargandoService } from 'src/servicios/cargando.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  loading: boolean = false;

  constructor(private cargandoService: CargandoService) {}

  ngOnInit(): void {
    this.cargandoService.cargando$.subscribe(cargando => {
      this.loading = cargando;
    });
  }

}
