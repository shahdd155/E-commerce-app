import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environmemts';
import { Ispecificbrand } from '../../shared/interfaces/ispecificbrand';


@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpClient:HttpClient) { }
  getAllBrands(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands`);
  }

  getBrandById(id: string): Observable<Ispecificbrand> {
    return this.httpClient.get<Ispecificbrand>(`${environment.baseUrl}/api/v1/brands/${id}`);
  }
}
