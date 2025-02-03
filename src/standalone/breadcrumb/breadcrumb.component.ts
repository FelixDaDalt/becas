import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Params, RouterModule } from '@angular/router';
import { BreadcrumbService } from 'src/servicios/breadcrumb.service';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports:[CommonModule,RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class breadcrumb {
  breadcrumbs: Breadcrumb[] = [];
  queryParams: Params = {};

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });

    this.queryParams = this.breadcrumbService.queryParams; // Obtener los queryParams del servicio
  }
}
