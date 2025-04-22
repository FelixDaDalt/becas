import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CurrentUser } from 'src/interfaces/currentUser';
import { usuarioService } from 'src/servicios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth_token';
  private expirationKey = 'token_expiration';
  private currentUserSubject: BehaviorSubject<CurrentUser | null>;
  public currentUser: Observable<CurrentUser | null>;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();


  constructor(
    private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('user');  // Corregir aquí: solo parseamos el usuario, no el token
    this.currentUserSubject = new BehaviorSubject<CurrentUser | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable().pipe(shareReplay(1));
  }

 private checkAuthentication(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    const expiration = localStorage.getItem(this.expirationKey);
    if (!token || !expiration) {
      return false;
    }

    const now = new Date().getTime();
    const isAuthenticated = now < parseInt(expiration, 10);

    return isAuthenticated;
  }




  login(login:any, isAdminLogin:boolean): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login/?tipo=${isAdminLogin?'administrador':'usuario'}`, login).pipe(
      map(response => {
        // Guardar token y datos en localStorage
        const token = response.data.token;
        const user = response.data.datos;
        if (token) {
          const expiration = 7200; // 2 horas en segundos
          this.setSession(token, expiration, user);
          this.isAuthenticatedSubject.next(true);
        }
        return user;
      })
    );
  }

  private setSession(token: string, expiration: number, user: any): void {
    const expirationDate = new Date().getTime() + expiration * 1000; // 2 horas
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.expirationKey, expirationDate.toString());
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout(): void {
    const rol = this.getUserRole()
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationKey);
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    if(rol>0){
      this.router.navigate(['login'])
    }else{
      this.router.navigate(['admin','login'])
    }

  }

  isAuthenticated(): boolean {
    const isAuth = this.checkAuthentication();
    this.isAuthenticatedSubject.next(isAuth);
    return isAuth;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); // Devuelve el token directamente como string
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}'); // Devuelve el usuario como objeto parseado
  }

  getUserRole(): number {
    const user = this.getUser();
    return user?.id_rol ;
  }

  userHasRole(rolesPermitidos: number[]): boolean {
    const rolUsuario = this.getUserRole();
    return rolesPermitidos.includes(rolUsuario);
  }

  getSuperAdmin(): number {
    const user = this.getUser();
    return user?.superAdmin ;
  }
}
