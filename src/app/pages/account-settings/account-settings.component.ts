import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent implements OnInit{
   public linkTheme= document.querySelector('#theme');
   public links?: NodeListOf<Element>;
  constructor() { }

  ngOnInit(): void {

    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }


  changeTheme(theme: string) {

   const url = `assets/css/colors/${theme}.css`;
   this.linkTheme?.setAttribute('href', url);
   localStorage.setItem('theme', url);
   this.checkCurrentTheme();

  }

  checkCurrentTheme(){

    this.links?.forEach((elem:any)=>{
      elem.classList.remove('working');
      const btnTheme=elem.getAttribute('data-theme');
      const btnThemeUrl=`assets/css/colors/${btnTheme}.css`;
      const currentTheme=this.linkTheme?.getAttribute('href');

      if(btnThemeUrl===currentTheme){
        elem.classList.add('working');
      }


    })


  }

}
