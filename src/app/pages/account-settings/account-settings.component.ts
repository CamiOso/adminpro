import { Component } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent {
   public linkTheme= document.querySelector('#theme');
  constructor() { }

  
  changeTheme(theme: string) {

   const url = `assets/css/colors/${theme}.css`;
   this.linkTheme?.setAttribute('href', url);
   localStorage.setItem('theme', url);

  }

}
