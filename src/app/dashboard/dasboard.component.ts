import { Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/core/auth.service';


@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent{

  constructor(private authService:AuthService,
    private route:Router,
    private activeRoute:ActivatedRoute){
    const rol = this.authService.getUserRole()
    const ruta = this.route.url
    if(rol == 0 && !ruta.includes('dashboard/')){
      this.route.navigate(['colegios'],{ relativeTo: this.activeRoute })
    }else if(!ruta.includes('dashboard/')){
      this.route.navigate(['colegio'],{ relativeTo: this.activeRoute })
    }
  }


}
