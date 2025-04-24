import { AfterViewInit, Component } from '@angular/core';
import { RedService } from 'src/core/red.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  isOnline = true;
  volvioConectividad = false;

  constructor(private redService: RedService) {
    this.redService.isOnline$.subscribe(status => {
      if (!this.isOnline && status === true) {
        this.volvioConectividad = true;
        setTimeout(() => this.volvioConectividad = false, 3000); // 3 segundos
      }

      this.isOnline = status;
    });

  }


  ngAfterViewInit(): void {
    const Scripts = (window as any).Scripts;
    // Crear una nueva instancia
    const scriptsInstance = new Scripts();
  }
}
