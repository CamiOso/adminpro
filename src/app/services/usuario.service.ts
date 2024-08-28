import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environment/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;
declare const google: any;
declare const gapi: any;


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  public auth2: any;
  public usuario!: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }


  get uid(): string {
    return this.usuario.uid || '';
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');

    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
      google.accounts.id.revoke('cristian.601210725@ucaldas.edu.co', () => {
        this.router.navigateByUrl('/login');
      });
    } else {
      console.error('Google API no está cargada o google.accounts.id es undefined');
    }
  }

  googleInit(): Promise<void> {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '412714738437-qv0827bfroeji7qsbinf8tm0jo9f5dqg.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token':this.token,
      },
    }).pipe(
      map((resp: any) => {
        const { email, google, nombre, role, uid, img='' } = resp.usuario;
        this.usuario =new Usuario(
          nombre,
          email,
          '',
          img,
          google,
          role,
          uid

        );

        localStorage.setItem('token', resp.token || '');
        return true;
      }),

      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token || '');
      })
    );
  }


  actualizarPerfil(data:{email:string,nombre:string,role:string}) {

    data={
      ...data,
      role:this.usuario.role??'',
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token,
      },
    } )


  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token || '');
        })
      );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token || '');
        })
      );
  }


  get headers(){
    return {
      headers: {
        'x-token': this.token,
      },
    };

  }
 cargarUsuarios(desde:number=0){
  const url=`${base_url}/usuarios?desde=${desde}`;
  return this.http.get<CargarUsuario>(url, this.headers);


 }

}
