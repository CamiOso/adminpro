import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {


  public perfilForm!:FormGroup;
  public usuario:Usuario;
  public imagenSubir!:File;
  public imgTemp:any='';


  constructor(private fb:FormBuilder,
    private usuarioService:UsuarioService,
    private fileUploadService:FileUploadService

  ){
    this.usuario=usuarioService.usuario;
  }


  ngOnInit(): void {

    this.perfilForm=this.fb.group({
      nombre:[this.usuario.nombre,Validators.required],
      email:[this.usuario.email,[Validators.required,Validators.email]],
    });



  }


  actualizarPerfil(){
    
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe(resp=>{
      const {nombre,email}=this.perfilForm.value;
  this.usuario.nombre=nombre;
  this.usuario.email=email;

  Swal.fire('Guardado','Cambios guardados con éxito','success');
    }, (err)=>{
      Swal.fire('Error',err.error.msg,'error');
    }
  )

  }
cambiarImagen(file: File): void {
  this.imagenSubir = file;

  if (!file) {
    this.imgTemp = null;
    return; 
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    this.imgTemp = reader.result?.toString();
  };
}


  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid!)
    .then(img=>{
     this.usuario.img=img;
     Swal.fire('Guardado','Imagen de usuari actualizada','success');
    }).catch (
       err=>{
        Swal.fire('Error','No se pudo subir la imagen','error');

       }
      
      )
  }

}
