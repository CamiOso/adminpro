import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public  usuario:Usuario;

  constructor(private UsuarioService: UsuarioService,

  ){

    this.usuario = UsuarioService.usuario;
  }

  logout(){
    this.UsuarioService.logout();
  }

}
