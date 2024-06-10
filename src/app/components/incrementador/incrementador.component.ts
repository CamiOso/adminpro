import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrl: './incrementador.component.css'
})
export class IncrementadorComponent  implements OnInit{

  ngOnInit(){
    this.btnClass=`btn ${this.btnClass}`;
  }




 @Input('valor') progreso:number=5;
 @Input() btnClass:string='btn btn-primary';

 @Output('valor') valorSalida:EventEmitter<number>=new EventEmitter();



  cambiarValor(valor:number){

    if(this.progreso>=100 &&valor>=0){
      this.valorSalida.emit(100);
      this.progreso= 100;
      return;

    }
    if(this.progreso<=0 &&valor<=0){
      this.valorSalida.emit(0);
      this.progreso=0;
      return;
    }
    this.progreso+=valor;
    this.valorSalida.emit(this.progreso);

}



}
