import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environmemts';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient:HttpClient) { }
  userToken=localStorage.getItem('token') as string


  checkoutPayment(id:string,data:object):Observable<any>{
return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
  {
    "shippingAddress": data
}
)

  }


  
}