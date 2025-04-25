import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Params, ActivatedRoute } from '@angular/router';
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
  private currentQueryParams: Params = {}; // Almacenar queryParams actuales

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentQueryParams = this.route.snapshot.queryParams; // Captura los queryParams actuales

        const cleanUrl = this.router.url.split('?')[0];
        const breadcrumbs = this.createBreadcrumbs(cleanUrl);
        this.breadcrumbs$.next(breadcrumbs);
      });
  }

  get breadcrumbs(): Observable<Breadcrumb[]> {
    return this.breadcrumbs$.asObservable();
  }

  get queryParams(): Params {
    return this.currentQueryParams;
  }

  private createBreadcrumbs(url: string): Breadcrumb[] {
    const breadcrumbs: Breadcrumb[] = [];
    const segments = url.split('/').filter(segment => segment);

    let accumulatedUrl = '';

    segments.forEach(segment => {
      accumulatedUrl += `${segment}/`;

      let label = this.formatLabel(segment);

      if(label.toUpperCase() =='DASHBOARD'){
        label = 'INICIO'
      }
      console.log(accumulatedUrl )

      breadcrumbs.push({ label, url: accumulatedUrl });
    });

    return breadcrumbs;
  }

  private formatLabel(segment: string): string {
    return segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }
}


