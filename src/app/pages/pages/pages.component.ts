import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent implements OnInit{

  public linkTheme= document.querySelector('#theme');

  ngOnInit(){
 
   const url= localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';


   this.linkTheme?.setAttribute('href', url);



  }
}
