import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Elimina los queryParams de la URL actual
        const cleanUrl = this.router.url.split('?')[0];
        const breadcrumbs = this.createBreadcrumbs(cleanUrl);
        this.breadcrumbs$.next(breadcrumbs);
      });
  }

  get breadcrumbs(): Observable<Breadcrumb[]> {
    return this.breadcrumbs$.asObservable();
  }

  private createBreadcrumbs(url: string): Breadcrumb[] {
    const breadcrumbs: Breadcrumb[] = [];
    const segments = url.split('/').filter(segment => segment); // Divide la URL en segmentos

    let accumulatedUrl = '';

    segments.forEach(segment => {
      accumulatedUrl += `/${segment}`; // Construye la URL acumulativa

      // Convierte el segmento en un texto legible (ej. reemplaza guiones y capitaliza)
      const label = this.formatLabel(segment);

      breadcrumbs.push({ label, url: accumulatedUrl });
    });

    return breadcrumbs;
  }

  private formatLabel(segment: string): string {
    // Personaliza el formato del texto para los breadcrumbs
    return segment
      .replace(/-/g, ' ') // Reemplaza guiones por espacios
      .replace(/\b\w/g, char => char.toUpperCase()); // Capitaliza la primera letra de cada palabra
  }
}


