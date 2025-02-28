import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environmemts';
import { Icart } from '../../../shared/interfaces/icart';
import { IaddProdToCart } from '../../../shared/interfaces/iadd-prod-to-cart';


@Injectable({
  providedIn: 'root'
})
export class CartService{

  constructor(private httpClient:HttpClient) { }

  
userToken=localStorage.getItem('token') as string
cartItemCount: BehaviorSubject<number>=new BehaviorSubject(0)

addProductToCart(id:string):Observable<IaddProdToCart>{
return this.httpClient.post<IaddProdToCart>(`${environment.baseUrl}/api/v1/cart`,
  {
    "productId": id
}
)

}

getCartProduct():Observable<Icart>{
  return this.httpClient.get<Icart>(`${environment.baseUrl}/api/v1/cart`,
  
  )
}


UpdateProductCart(id:string, count:number):Observable<Icart>{
  return this.httpClient.put<Icart>(`${environment.baseUrl}/api/v1/cart/${id}`, 
  {
    count: count
  });
}


removeProductFromCart(id: string): Observable<any> {
  return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`);
}


  clearProductCart():Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`
    )
    
    }
}
