import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environmemts';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  private readonly router= inject(Router);

userData:any;

  sendSignupForm(formData:object):Observable<any>{
return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,formData)
  }


  sendLoginForm(formData:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,formData)
      }


//fuction to decode the token 
      getUserData():void{
this.userData= jwtDecode(localStorage.getItem('token')!)
console.log(this.userData)
      }




      logoutUser():void{
localStorage.removeItem('token')
this.userData=null
this.router.navigate(['/login'])
      }


      setEmailVerify(data:object):Observable<any>{
        return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
      }

      setCodeVerify(data:object):Observable<any>{
        return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
      }

      resetPassword(data:object):Observable<any>{
        return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
      }


}
