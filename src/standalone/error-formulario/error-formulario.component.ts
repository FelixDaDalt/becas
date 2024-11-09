import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-error-formulario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-formulario.component.html',
  styleUrls: ['./error-formulario.component.css']
})
export class ErrorFormularioComponent {
  @Input() control: AbstractControl | null = null;
  @Input() checkDisponibilidad:boolean = false


}
