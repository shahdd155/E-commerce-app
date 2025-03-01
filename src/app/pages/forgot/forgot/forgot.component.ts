import { ToastToken } from './../../../../../node_modules/ngx-toastr/toastr/toastr-config.d';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent {

  private readonly router = inject(Router);
  step: number = 1;

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{5,}$/)])
  });

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7}$/)])
  });

  private readonly authService = inject(AuthService);

  verifyEmailSubmit(): void {
    let emailValue = this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(emailValue);
    this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        if (res.statusMsg === "success") {
          this.step = 2;
        }
      }
    });
  }

  verifyCodeSubmit(): void {
    this.authService.setCodeVerify(this.verifyCode.value).subscribe({
      next: (res) => {
        if (res.status === "Success") {
          this.step = 3;
        }
      }
    });
  }

  verifyPasswordSubmit(): void {
    this.authService.resetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
          localStorage.setItem('token', res.token);
          this.authService.getUserData();
          this.router.navigate(['/home']);
        
      }
    });
  }
}
