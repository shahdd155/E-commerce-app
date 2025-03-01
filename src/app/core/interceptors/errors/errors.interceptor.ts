import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      // Check if the user is logged out (no token in localStorage)
      const token = localStorage.getItem('token');
      if (!token) {
        // If the user is logged out, skip showing the error message
        return throwError(() => err);
      }

      // Log the error to the console for debugging
      console.log('Interceptor Error:', err.error?.message || err.message);

      // Show the error message using Toastr
      if (err.error?.message) {
        toastrService.error(err.error.message, 'Something went wrong');
      } else {
        toastrService.error('An unexpected error occurred', 'Error');
      }

      // Optionally, redirect to the login page if the error is due to unauthorized access
      if (err.status === 401) {
        localStorage.removeItem('token'); // Clear the token
        router.navigate(['/login']); // Redirect to the login page
      }

      // Return the error using throwError
      return throwError(() => err);
    })
  );
};