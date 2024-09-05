import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios:Usuario[] = [];
  public usuariosTemp:Usuario[] = [];
  public desde:number=0;
  public cargando:boolean=true;

  constructor(private usuarioService: UsuarioService,
    private busquedasService: BusquedasService
  ) {

  }


  ngOnInit(): void {
  this.cargarUsuario();

  }


  cargarUsuario(){
    this.cargando=true;
    this.usuarioService.cargarUsuarios(this.desde).
    subscribe(({total,usuarios}) => {
      this.totalUsuarios = total;

        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando=false;






    });

  }

  cambiarPagina(valor:number){
    this.desde+=valor;

    if(this.desde<0){
      this.desde=0;

    }else if(this.desde>=this.totalUsuarios){
      this.desde-=valor;
    }

    this.cargarUsuario();
  }

  buscar(termino:string){

    if(termino.length===0){
      return this.usuarios=this.usuariosTemp;

    }
    this.busquedasService.buscar('usuarios',termino)
    .subscribe(resultados=>
      this.usuarios=resultados

    );
    return true;

  }


  eliminarUsuario( usuario: Usuario ): void {

    if ( usuario.uid === this.usuarioService.uid ) {
      Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
      return;
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.usuarioService.eliminarUsuario( usuario )
          .subscribe( resp => {

            this.cargarUsuario();
            Swal.fire(
              'Usuario borrado',
              `${ usuario.nombre } fue eliminado correctamente`,
              'success'
            );

          });

      }
    });

    return;
  }



}
