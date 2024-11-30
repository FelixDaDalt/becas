import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/core/auth.service';
import { RedService } from 'src/servicios/red.service';

@Component({
  selector: 'app-pestañas-menu',
  templateUrl: './pestañas.component.html',
  styleUrls: ['./pestañas.component.css']
})
export class PestañasRedComponent {

}
