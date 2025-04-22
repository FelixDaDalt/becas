import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { shareReplay, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ColegioService } from 'src/servicios/colegio.service';

@Component({
  selector: 'app-ver-colegio',
  templateUrl: './ver-colegio.component.html',
  styleUrls: ['./ver-colegio.component.css']
})
export class VerColegioComponent {
  apiFile=environment.fileUrl
  detalle$ = this.colegioService.verColegio$.pipe(shareReplay(1))
  private queryParamsSubscription: Subscription | undefined;
  @Input() idColegio = null
  @Input() modal = false

  constructor(
    private route: ActivatedRoute,
    private colegioService: ColegioService,
    private router: Router,
    private activeModal:NgbActiveModal
  ) {}

  ngOnInit(): void {
    if (this.idColegio) {
      // Si el idColegio ya vino como Input (por Modal), directamente lo usamos
      this.colegioService.verColegio(this.idColegio)
    } else {
      // Si no vino como Input (estamos navegando por página), lo buscamos de la URL
      this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
        const id = params['id'];
        if (id) {
          this.idColegio = id;
          this.colegioService.verColegio(id)
        }
      });
    }
  }

  // Limpiar la suscripción cuando el componente sea destruido
  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  cerrarModal(){
    this.activeModal.close(false)
  }

}
