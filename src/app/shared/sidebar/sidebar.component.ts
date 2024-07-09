import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

 menuItems: any[ ];
  constructor(private siderService: SidebarService){
    this.menuItems =this.siderService.menu;
    console.log(this.menuItems);

  }

}
