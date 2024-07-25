import { Component } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css'
})
export class RxjsComponent {

  constructor(){
    let i=-1;
    const obs$=new Observable(observer=>{


     const intervalo= setInterval(()=>{
        i++;
        observer.next(i);
        if(i===4){
          clearInterval(intervalo);
          observer.complete();



        }
       if(i===2){
        i=0;
          observer.error('i llego al valor de 2');

       }

      },1000)
    });

    obs$.pipe(
      retry(1)

    ).subscribe({


        next: value=>console.log(value),
        error: error=>console.error(error),
        complete: ()=>console.log('Terminado')



   } );

  }

}
