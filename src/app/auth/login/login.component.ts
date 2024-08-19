import { Component,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!:ElementRef;
  public formSubmited = false;

  public loginForm = this.fb.group({

    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}


  ngAfterViewInit(){
    this.googleInit();

  }


  googleInit(){
    google.accounts.id.initialize({
      client_id: "472843392562-551dkp4h54cc8g0fmo0t5fn5sqropqdo.apps.googleusercontent.com",
      callback: this.handleCredentialResponse
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );

  }


  handleCredentialResponse(response:any){
    console.log("Encoded JWT ID token: " + response.credential);

  }


  login() {
    this.formSubmited = true;

    if (this.loginForm.invalid) {
      return;
    }

    const formValue = {

      email: this.loginForm.get('email')!.value||localStorage.getItem('email')|| '',
      password: this.loginForm.get('password')!.value || '',
      remember: this.loginForm.get('remember')!.value || false,
    };

    this.usuarioService.login(formValue)
      .subscribe({
        next: (resp) => {
          if (formValue.remember) {
            localStorage.setItem('email', formValue.email);
          } else {
            localStorage.removeItem('email');
          }

          this.router.navigateByUrl('/');

        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      });
  }
}
