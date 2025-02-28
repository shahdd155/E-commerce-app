import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environmemts';
import { IaddWishlist } from '../../../shared/interfaces/iadd-wishlist';
import { Iwishlist } from '../../../shared/interfaces/iwishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  
  userToken=localStorage.getItem('token') as string
  wishlistItemCount: BehaviorSubject<number>=new BehaviorSubject(0)
  constructor(private httpClient:HttpClient) { }


  addProductWhishlist(id:string):Observable<IaddWishlist>{
    return this.httpClient.post<IaddWishlist>(`${environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
      }
    );
    

  }



  getwishlistProduct(): Observable<Iwishlist> {
    return this.httpClient.get<Iwishlist>(`${environment.baseUrl}/api/v1/wishlist`);
  }
  

  removeProductFromwishlist(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`);
  }
  

}
