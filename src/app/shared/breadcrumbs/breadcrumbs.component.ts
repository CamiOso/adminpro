import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent implements OnDestroy {

  public title!: string;
  public tituloSubs$:Subscription;

  constructor(private router:Router,private route:ActivatedRoute) {


   this.tituloSubs$= this.getArgumentosRuta().
   subscribe( { next:
    (data: ActivationEnd) =>
      this.title = data.snapshot.data['titulo'] }

  );


   }

   ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();

   }



   getArgumentosRuta(){

    return this.router.events
    .pipe(
       filter( (event: any) =>
          event instanceof ActivationEnd &&
          event.snapshot.firstChild === null &&
          event.snapshot.data != null) )

   }

}
