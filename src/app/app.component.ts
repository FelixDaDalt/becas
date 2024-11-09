import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  constructor(){}

  ngAfterViewInit(): void {
    const Scripts = (window as any).Scripts;
    // Crear una nueva instancia
    const scriptsInstance = new Scripts();
  }
}
