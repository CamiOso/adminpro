import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrl: './modal-imagen.component.css'
})
export class ModalImagenComponent {
  public imagenSubir!: File;
  public imgTemp: any=null;


constructor(public modalImagenService: ModalImagenService,
  public fileUploadService: FileUploadService
) {

}

cerrarModal(){
  this.imgTemp = null;
  this.modalImagenService.cerrarModal();
}

cambiarImagen(event: Event): void {

  const inputElement = event.target as HTMLInputElement;


  if (inputElement.files && inputElement.files.length > 0) {
    const file = inputElement.files[0];
    this.imagenSubir = file;


    if (!file) {
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgTemp = reader.result;
    };
  } else {

    this.imgTemp = null;
  }
}


subirImagen(){
const id=this.modalImagenService.id;
const tipo=this.modalImagenService.tipo;

  this.fileUploadService.actualizarFoto(this.imagenSubir,tipo,id)
  .then(img=>{

   Swal.fire('Guardado','Imagen de usuari actualizada','success');
   this.modalImagenService.nuevaImagen.emit(img);
   this.cerrarModal();

  }).catch (
     err=>{
      Swal.fire('Error','No se pudo subir la imagen','error');

     }

    )
}


}
