import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,TranslatePipe,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

private readonly authService = inject(AuthService);
  private readonly router = inject(Router); //lazm at2kd enha  mn angular/core
  isLoading:boolean=false;
errorMessage:string='';
isSuccess:string=''
// step 1 is to do the form group object containing the form controls
 loginForm: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7}$/) ])
   
  });




  //step 4 create the submit function to submit the form
  submitForm():void{
if(this.loginForm.valid){
  this.isLoading=true;
  this.authService.sendLoginForm(this.loginForm.value).subscribe({
    next:(res)=>{
  if(res.message=== 'success'){ // lazm at2kd en klmt success de mktoba s7 zy el backend

   setTimeout(() => {

    //1- save token
    localStorage.setItem("token",res.token)

    //2-hnfok el token da decode lel token
    this.authService.getUserData()

    //3-hyro7 lel home
    this.router.navigate(['/home']);
   }, 500);

   this.isSuccess = res.message;
  }
  
  this.isLoading=false;
    },
    error:(err:HttpErrorResponse)=>{
      this.errorMessage=err.error.message
      this.isLoading=false;
    }
  
  })
}
  }


}
