import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public usuario:Usuario;

 public menuItems: any[ ];

  constructor(private siderService: SidebarService,
    private UsuarioService: UsuarioService
  ){
    this.menuItems =this.siderService.menu;
    this.usuario = UsuarioService.usuario;
  }

}
