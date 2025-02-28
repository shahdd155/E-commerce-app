import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environmemts';
import { IproductDetails } from '../../../shared/interfaces/iproduct-details';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) {}


  getAllProducts():Observable<any>{
   return this.httpClient.get(`${environment.baseUrl}/api/v1/products`)
  }


  getSpecificProduct(id:string):Observable<IproductDetails>{
    return this.httpClient.get<IproductDetails>(`${environment.baseUrl}/api/v1/products/${id}`)
   }




   
}
