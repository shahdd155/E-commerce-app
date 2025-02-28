import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router); //lazm at2kd enha  mn angular/core
  isLoading:boolean=false;
errorMessage:string='';
isSuccess:string=''
// step 1 is to do the form group object containing the form controls
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
     //lazm esm el formcontrol el hwa email aw name aw keda ykon nfs el esm el fel backend 3shan my3mlsh error fa a5do copy mn postman
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7}$/) ]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required,Validators.pattern(/^01[0125]\d{8}$/)])
  }, 
{validators:this.confirmPassword}
);




  //step 4 create the submit function to submit the form
  submitForm():void{
if(this.registerForm.valid){
  this.isLoading=true;
  this.authService.sendSignupForm(this.registerForm.value).subscribe({
    next:(res)=>{
  if(res.message=== 'success'){ // lazm at2kd en klmt success de mktoba s7 zy el backend

   setTimeout(() => {
    this.isSuccess = res.message;
    this.router.navigate(['/login']);
   }, 500);
  }
  this.isLoading=false;
    },
    error:(err:HttpErrorResponse)=>{
      this.errorMessage=err.error.message
      this.isLoading=false;
    }
  
  })
}

else{
  this.registerForm.markAllAsTouched(); //3shan lw dost signup w mkotsh md5la 7aga ygbly error message required mn 3'er ma ad3't 3la el input
}
  }


//mynf3sh a3ml enha btreturn void htgebly error
confirmPassword(group:AbstractControl){ //group variable asmeh ay esm br7ty da hyb2a shayl el form kolaha el hya msmyaha registerForm
const password= group.get('password')?.value; //to get the value of the password
const rePassword= group.get('rePassword')?.value; //to get the value of the repassword

 return password===rePassword?null:{mismatch:true}; //bkarn el etnen lw msh zy b3d hyrg3ly mismatch
}



}
