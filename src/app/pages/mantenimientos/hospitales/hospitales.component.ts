import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrl: './hospitales.component.css'
})
export class HospitalesComponent implements OnInit {

  constructor(private hospitalService:HospitalService){}

  ngOnInit(){
    this.hospitalService.cargarHospitales().subscribe(
      hospitales=>{
        console.log(hospitales);

      }
    );
  }

}
