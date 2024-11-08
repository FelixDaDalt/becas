import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-formulario',
  standalone: true,
  templateUrl: './error-formulario.component.html',
  styleUrls: ['./error-formulario.component.css']
})
export class ErrorFormularioComponent {
  @Input() control: AbstractControl | null = null;
  @Input() checkDisponibilidad:boolean = false


}
