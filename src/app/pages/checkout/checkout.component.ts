import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'path';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
private readonly formBuilder= inject(FormBuilder);
private readonly activatedRoute= inject(ActivatedRoute); //lw 3yza a5od 7aga mn el url el fo2 ast3mlo bh3mlha inject msln el cart id
private readonly ordersService= inject(OrdersService); 
private readonly router= inject(Router); 
  checkOutForm!:FormGroup;
cartId:string=''
  intiateForm():void{
    this.checkOutForm= this.formBuilder.group({
      details:[null, [Validators.required]],
      phone:[null, [Validators.required,Validators.pattern(/^01[012][0-9]{8}$/)]],
      city:[null, [Validators.required]]

    })
  }

  ngOnInit(): void {
 this.intiateForm();
 this.getCartId();
  }


  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(param)=>{
    this.cartId=param.get('id') ! //de ay t3'yeer hy7sl fel url hysm3 feha
    // this.activatedRoute.snapshot.paramMap.get('id') de btkon zy screenshot fa msh bysm3 el t3'yeer feha
      }
    })
  }

  submitPaymentForm():void{
this.ordersService.checkoutPayment(this.cartId,this.checkOutForm.value).subscribe({
  next:(res)=>{
    console.log(res)
   if(res.status){
    open(res.session.url, '_self')
   }
  },
  error:(err)=>{
    console.log(err)
  }

})
  }

  submitPaymentFormCash():void{
    this.ordersService.checkoutPaymentCash(this.cartId,this.checkOutForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.router.navigate(['/allorders']);
      },
      error:(err)=>{
        console.log(err)
      }
    
    })
      }
    


  
  
}
