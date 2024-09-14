import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';



const base_url=environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  private _ocultarModal: boolean = true;
  public tipo!: string;
  public id!: string;
  public img: string='no-image';
  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img?: string
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = img && img.includes('https')
    ? img
    : `${base_url}/upload/${tipo}/${img ?? 'no-image'}`;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() {}
}
