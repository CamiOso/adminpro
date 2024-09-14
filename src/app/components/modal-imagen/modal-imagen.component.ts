import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrl: './modal-imagen.component.css'
})
export class ModalImagenComponent {
  public imagenSubir!: File;
  public imgTemp: any=null;


constructor(public modalImagenService: ModalImagenService) {

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


}
