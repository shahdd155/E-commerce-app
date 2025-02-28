import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from './../../core/services/products/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';


@Component({
  selector: 'app-home',
  imports: [CarouselModule,CurrencyPipe,SearchPipe,FormsModule,RouterLink], //ay 7aga el pipe bt3mlha a2dr a3mlha be edy bss hya btshl bss anwa3 el builtin pipes ahom:
 // imports: [CarouselModule,UpperCasePipe, LowerCasePipe, TitleCasePipe, CurrencyPipe,DatePipe,JsonPipe], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
private readonly productsService= inject(ProductsService);
private readonly categoriesService= inject(CategoriesService);


myDate:any=new Date();
searchInput:string='';

customMainSlider: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  rtl: true,
  dots: false,
  autoplay:true,
  navSpeed: 700,
  navText: ['', ''],
 items:1, //keda shelt el goz2 bta3 el responsive l2n el slider da static
  nav: true
}
 products:Iproduct[]=[];
 categories:Icategory[]=[];


 customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  rtl: true,
  pullDrag: false,
  autoplay:true, //da m3nah en awl ma yft7 el slider auromatic yn2l lw7do mn 3'er ma almso
  autoplayTimeout:3000, //kol 3s hyn2l 3la slide tany lw7do mn 3'er ma adelo 7aga aw a7rko b2edy
  autoplayHoverPause:true, //en lw get w2ft 3leh el tn2ol hy2f yt3ml pause
  dots: true,
  navSpeed: 700,
  navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}

ngOnInit(): void {
 this.getAllProductsData();
  this.getAllCategoriesData();
  }

getAllProductsData():void{
  this.productsService.getAllProducts().subscribe({
    next:(res)=>{
    console.log(res);
    this.products= res.data;
    }
    
        })
}

getAllCategoriesData():void{

this.categoriesService.getAllCategories().subscribe({
next:(res)=>{
  console.log(res);
  this.categories=res.data

}

})
}

toastrService=inject(ToastrService)
showSuccess(message:string) {
  this.toastrService.success(message);
}

private readonly cartService= inject(CartService);

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
