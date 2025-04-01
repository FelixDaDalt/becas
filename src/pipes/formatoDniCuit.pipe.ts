import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDniCuit',
  standalone: true
})
export class FormatDniCuitPipe implements PipeTransform {

  transform(value: string, tipo: 'cuit' | 'dni'): string {
    if (!value) return '';

    if (tipo === 'cuit') {
      return this.formatCuit(value);
    } else if (tipo === 'dni') {
      return this.formatDni(value);
    }

    return value; // Devuelve el valor original si no es 'cuit' ni 'dni'
  }

  private formatCuit(cuit: string): string {
    if (cuit.length !== 11) return cuit; // Valida longitud del CUIT
    return `${cuit.substring(0, 2)}-${cuit.substring(2, 10)}-${cuit.charAt(10)}`;
  }

  private formatDni(dni: string): string {
    if (dni.length < 7 || dni.length > 8) return dni; // Valida longitud del DNI
    return dni.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
