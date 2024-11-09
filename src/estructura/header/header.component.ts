import { Router } from '@angular/router';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { shareReplay } from 'rxjs';
import { AuthService } from 'src/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterViewInit {
  navScriptLoaded = false;
  @ViewChild('navElement', { static: false }) navElement!: ElementRef;

  user$ = this.authService.currentUser.pipe(shareReplay(1));

  constructor(private authService: AuthService, private router: Router) {
    (window as any).navegar = this.navegar.bind(this);
  }

  ngAfterViewInit(): void {
    const Scripts = (window as any).Scripts.instance;
    Scripts.navBase();
  }

  logout() {
    this.authService.logout();
  }

  navegar(route: string, element: HTMLElement) {
    this.router.navigate([route]);
    this.active(element);
  }

  active(element: HTMLElement) {
    document
      .querySelectorAll('a')
      .forEach((el) => el.classList.remove('active'));
    element.classList.add('active');
  }
}
