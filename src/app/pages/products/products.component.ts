import { Iproduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from './../../core/services/products/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [CarouselModule,FormsModule,RouterLink,CurrencyPipe,SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  searchInput:string='';
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);


  products:Iproduct[]=[];

showSuccess(message:string) {
  this.toastrService.success(message);
}


ngOnInit(): void {
  this.getAllProductsData();
 
  }

getAllProductsData():void{
  this.productsService.getAllProducts().subscribe({
    next:(res)=>{
    console.log(res);
    this.products= res.data;
   
    }
    
        })
}

addToCart(id: string, btn:HTMLButtonElement, spinner:HTMLSpanElement): void {
  btn.disabled= true
  spinner.classList.add('hidden')
  this.cartService.addProductToCart(id).subscribe({
    next: (res) => {
      btn.disabled= false
      this.showSuccess(res.message)
      spinner.classList.remove('hidden')
      console.log('Product added successfully:', res);
      this.cartService.cartItemCount.next(res.numOfCartItems)
    },
    error: (err) => {
      console.log('Error adding product:', err);
    }
  });
}


private readonly wishlistService = inject(WishlistService);


addTowishlist(id: string, btnwhishlist: HTMLButtonElement): void {
  btnwhishlist.disabled = true; // Disable button while processing

  this.wishlistService.addProductWhishlist(id).subscribe({
    next: (res) => {
      this.showSuccess(res.message);
      console.log('Product added successfully:', res);

      // Change heart icon color
      btnwhishlist.classList.add('text-red-500');
      btnwhishlist.disabled = false;

      // Update wishlist count
      this.wishlistService.getwishlistProduct().subscribe({
        next: (wishlist) => {
          this.wishlistService.wishlistItemCount.next(wishlist.data.length); 
        }
      });
    },
    error: (err) => {
      console.error('Error adding product:', err);
      btnwhishlist.disabled = false;
    }
  });
}


}

