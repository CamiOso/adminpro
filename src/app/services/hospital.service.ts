import { HttpClient, HttpHeaders } from '@angular/common/http';  // Importa HttpHeaders
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { map } from 'rxjs';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    // Usa HttpHeaders para crear los encabezados correctamente
    return new HttpHeaders({
      'x-token': this.token
    });
  }

  cargarHospitales() {
    const url = `${base_url}/hospitales`;

    return this.http.get<{ ok: boolean; hospitales: Hospital[] }>(url, { headers: this.headers })
      .pipe(
        map(resp => resp.hospitales)
      );
  }

}
