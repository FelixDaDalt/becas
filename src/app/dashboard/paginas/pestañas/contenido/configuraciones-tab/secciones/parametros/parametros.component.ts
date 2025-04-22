import { Component } from '@angular/core';
import { shareReplay, tap } from 'rxjs';
import { ParametrosService } from 'src/servicios/parametros.service';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent {
  parametros$ = this.parametrosService.parametros$.pipe(shareReplay(1));
  parametross: any[] = [];
  diasDisponibles: number[] = [];

  meses = [
    { valor: 1, nombre: 'Enero' },
    { valor: 2, nombre: 'Febrero' },
    { valor: 3, nombre: 'Marzo' },
    { valor: 4, nombre: 'Abril' },
    { valor: 5, nombre: 'Mayo' },
    { valor: 6, nombre: 'Junio' },
    { valor: 7, nombre: 'Julio' },
    { valor: 8, nombre: 'Agosto' },
    { valor: 9, nombre: 'Septiembre' },
    { valor: 10, nombre: 'Octubre' },
    { valor: 11, nombre: 'Noviembre' },
    { valor: 12, nombre: 'Diciembre' },
  ];

  constructor(private parametrosService: ParametrosService) {}

  esFecha(valor: string): boolean {
    return /^\d{2}\/\d{2}$/.test(valor);
  }

  actualizarDiasDisponibles(parametro: any) {
    const mes = parametro._mes;
    let maxDias = 31;

    if (mes === 2) {
      maxDias = 28; // Podés poner 29 si querés permitir años bisiestos.
    } else if ([4, 6, 9, 11].includes(mes)) {
      maxDias = 30;
    }

    this.diasDisponibles = Array.from({ length: maxDias }, (_, i) => i + 1);

    // Si el día actual supera el máximo del mes, lo ajustamos
    if (parametro._dia > maxDias) {
      parametro._dia = maxDias;
    }
  }

  actualizarFechaCompuesta(parametro: any) {
    this.actualizarDiasDisponibles(parametro);

    const dia = parametro._dia?.toString().padStart(2, '0');
    const mes = parametro._mes?.toString().padStart(2, '0');

    if (dia && mes) {
      parametro.valor = `${dia}/${mes}`;
    }
  }

  ngOnInit() {
    this.parametros$.subscribe((parametros) => {
      this.parametross = parametros.map(p => {
        if (this.esFecha(p.valor)) {
          const [dia, mes] = p.valor.split('/');
          const nuevo = {
            ...p,
            _dia: Number(dia),
            _mes: Number(mes)
          };
          this.actualizarDiasDisponibles(nuevo);
          return nuevo;
        }
        return p;
      });
    });
  }

  guardarParametro(parametro: any) {
    const diasNotif = this.parametross.find(p => p.nombre.includes('Notificar'))?.valor;
    const diasVenc = this.parametross.find(p => p.nombre.includes('Vencimiento'))?.valor;

    if (
      parametro.nombre.includes('Notificar') ||
      parametro.nombre.includes('Vencimiento')
    ) {
      const nuevoDiasNotif = parametro.descripcion.includes('Notificar') ? +parametro.valor : +diasNotif;
      const nuevoDiasVenc = parametro.descripcion.includes('Vencimiento') ? +parametro.valor : +diasVenc;

      if (nuevoDiasNotif >= nuevoDiasVenc) {
        alert('❌ El número de días para notificar debe ser menor al número de días para considerar vencida la solicitud.');
        return;
      }
    }

    this.parametrosService.actualizarparametro(parametro);
  }
}
