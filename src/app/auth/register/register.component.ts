import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public formSubmited = false;

  public registerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
    terminos: [true, Validators.requiredTrue]
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  crearUsuario() {
    this.formSubmited = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    this.usuarioService.crearUsuario(this.registerForm.value).subscribe({
      next: (resp) => {
        console.log('Usuario creado');
        console.log(resp);
      },
      error: (err) => console.warn(err.error.msg)

    });
  }


  campoNoValido(campo: string): boolean {
    return !!(this.registerForm.get(campo)?.invalid && this.formSubmited);
  }

  contrasenasNoValidas(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    return pass1 !== pass2 && this.formSubmited;
  }

  aceptaTerminos(): boolean {
    return !this.registerForm.get('terminos')?.value && this.formSubmited;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: AbstractControl) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    };
  }
}
