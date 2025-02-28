import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environmemts';
import { Isubcategory } from '../../../shared/interfaces/isubcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private httpClient:HttpClient) { }



  getSubcategory(id:string):Observable<Isubcategory>{
    return this.httpClient.get<Isubcategory>(`${environment.baseUrl}/api/v1/categories/${id}/subcategories`);
  }
}
