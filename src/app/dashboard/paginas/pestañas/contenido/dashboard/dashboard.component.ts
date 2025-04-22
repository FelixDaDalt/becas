import { Component, OnInit } from '@angular/core';
import { shareReplay, tap } from 'rxjs';
import { DashboardService } from 'src/servicios/dashboard.service';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexLegend,
  ApexDataLabels,
  ApexPlotOptions,
  ApexFill,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from 'ng-apexcharts';
import { NotificacionService } from 'src/servicios/notificacion.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

// 📈 Para Donut de Estados
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

// 📊 Para Ocupación (Donut también)
export type GaugeChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  colors?: string[]; // ✅ Ahora sí colores
};

export type BarChartOptions = {
  series: { name: string, data: number[] }[];
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  notificaciones$ = this.notificacionesService.notificacionAdmin$.pipe(shareReplay(1))
  dashboard$ = this.dashboardService.dashboard$.pipe(
    tap(dashboard => {
      console.log(dashboard);

      if (dashboard && dashboard.becasPorEstado) {
        this.chartOptions = {
          chart: {
            type: 'donut',
            height: 320
          },
          series: this.estados.map(estado => dashboard.becasPorEstado[estado] || 0),
          labels: this.estados.map(estado => this.estadosNombre[estado]),
          legend: {
            position: 'bottom'
          },
          dataLabels: {
            enabled: true
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 300
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        };
      }
    }),
    shareReplay(1)
  );

  estados = [0, 1, 2, 3, 4, 5, 6];

  estadosNombre: { [key: number]: string } = {
    0: 'Pendiente',
    1: 'Desestimada',
    2: 'Rechazada',
    3: 'Pendiente Baja',
    4: 'Vencida',
    5: 'Aprobada',
    6: 'Dada de Baja'
  };

  public chartOptions: Partial<ChartOptions> = {};      // Donut de Estados
  public barChartOptions: Partial<BarChartOptions> = {}; // Gráfico de Ocupación

  constructor(private dashboardService: DashboardService,
    private notificacionesService:NotificacionService,
    private route:Router,
    private active:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dashboard$.subscribe(dashboard => {
      if (dashboard?.ocupacion) {
        this.barChartOptions = {
          series: [
            {
              name: 'Solicitudes',
              data: [
                Number(dashboard.ocupacion.porcentajeOcupadas) || 0,
                Number(dashboard.ocupacion.porcentajeDisponibles) || 0
              ]
            }
          ],
          chart: {
            type: 'bar',
            height: 300
          },
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 4,
              distributed: true, // Diferentes colores
              barHeight: '70%'
            }
          },
          xaxis: {
            categories: ['Ocupadas', 'Disponibles'],
            labels: {
              formatter: (val) => `${val}`,
               style: {
                fontSize: '10px'
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '10px'
              }
            }
          },
          fill: {
            opacity: 1
          },
          dataLabels: {
            enabled: true,
            formatter: (val) => `${Number(val).toFixed(2)}%`
          },
          tooltip: {
            y: {
              formatter: (val) => `${val.toFixed(2)}%`
            }
          },
          legend: {
            show: false
          }
        };
      }
    });
  }

  tareas(){
    this.route.navigate(['../tareas'],{relativeTo:this.active})
  }
}


