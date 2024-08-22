import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {


  public perfilForm!:FormGroup;

  constructor(private fb:FormBuilder,
    private usuarioService:UsuarioService
  ){}


  ngOnInit(): void {

    this.perfilForm=this.fb.group({
      nombre:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
    });



  }


  actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe(resp=>{
      console.log(resp);
    })

  }

}
