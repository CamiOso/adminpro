import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios:Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {

  }


  ngOnInit(): void {
    this.usuarioService.cargarUsuarios(0).
      subscribe(({total,usuarios}) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;




      });

  }

}
