import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

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
    terminos: [true, Validators.required]
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder) {}

  crearUsuario() {
    this.formSubmited = true;
    console.log(this.registerForm.value);

    if (this.registerForm.valid) {
      console.log('formulario valido');
    } else {
      console.log('formulario no valido');
    }
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
