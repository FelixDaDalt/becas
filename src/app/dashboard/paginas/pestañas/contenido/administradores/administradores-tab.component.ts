import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { AdminService } from 'src/servicios/admin.service';


@Component({
  selector: 'app-administradores-tab',
  templateUrl: './administradores-tab.component.html',
  styleUrls: ['./administradores-tab.component.css']
})
export class AdministradoresTabComponent implements OnInit{

  administradores$=this.adminService.administradores$
  administradoresCache = false

  constructor(private adminService:AdminService,private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    if(!this.administradoresCache){
      this.adminService.obtenerAdministradores()
      this.administradoresCache= true
    }
  }

  reiniciarPassword(id:number){
    this.adminService.reiniciarPassword('admin',id)
  }

  alta(){
    this.router.navigate(['../alta-administrador'], {relativeTo: this.route })
  }
}
