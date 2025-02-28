
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { CurrencyPipe} from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
interface clearResponse{
  
    message: string;

}

@Component({
  selector: 'app-cart',
  imports: [RouterLink,RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  private readonly cartService = inject(CartService);
  allcartdata!:Icart

  ngOnInit(): void {
      this.getCartData()
  }

  getCartData():void{
    this.cartService.getCartProduct().subscribe({
      next:(res)=>{
  this.allcartdata=res
      }
    })
  }


  clearCart():void{
this.cartService.clearProductCart().subscribe({
  next:(res:clearResponse)=>{
this.allcartdata.data=[] as any
  }
})
  }

  updateCart(id: string, count: number): void {
    if (count < 0) return; // Prevent negative quantity
  
    // Optimistically update the UI
    this.allcartdata.data.products = this.allcartdata.data.products.map(cartProd => {
      if (cartProd.product.id === id) {
        return { ...cartProd, count };
      }
      return cartProd;
    });
  
    this.cartService. UpdateProductCart(id, count).subscribe({
      next: (res) => {
        this.allcartdata = res;
      },
      error: () => {
        this.getCartData(); // Revert if error occurs
      }
    });
  }
  
  
  removeFromCart(id: string): void {
    this.cartService.removeProductFromCart(id).subscribe({
      next: () => {
        // Remove the item from the UI after successful API call
        this.allcartdata.data.products = this.allcartdata.data.products.filter(cartProd => cartProd.product.id !== id);
      },
      error: (err) => {
        console.error('Failed to remove item:', err);
      }
    });
  }
  

}


