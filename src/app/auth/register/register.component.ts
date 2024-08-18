import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public formSubmited=false;

  public registerForm=this.fb.group({
    nombre:['',[Validators.required,Validators.minLength(3)]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
    password2:['',[Validators.required,Validators.minLength(6)]],
    terminos:[false,Validators.required]
  });

  constructor(private fb:FormBuilder) {


  }

  crearUsuario(){
    this.formSubmited=true;
    console.log(this.registerForm.value);

    if(this.registerForm.valid){
      console.log('formulario valido');

    }else{
      console.log('formulario no valido');
    }

  }

  campoNoValido(campo:string):boolean{

    if(this.registerForm.get(campo)?.invalid && this.formSubmited){
      return true;

    }else{
      return false;
    }
 

  }


  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmited;
  }



}
