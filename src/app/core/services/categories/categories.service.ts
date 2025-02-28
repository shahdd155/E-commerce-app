import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environmemts';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient:HttpClient) { }

getAllCategories():Observable<any>{
 return this.httpClient.get(`${environment.baseUrl}/api/v1/categories`);
}



getSepecificCategory(id:string):Observable<any>{
  return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`);
 }
 

}
