import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Iwishlist } from '../../../shared/interfaces/iwishlist';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent  implements OnInit{
  private readonly wishlistService = inject(WishlistService);
allWishlistData!:Iwishlist;



ngOnInit(): void {
    this.getWishlistData()
}



getWishlistData(): void {
  this.wishlistService.getwishlistProduct().subscribe({
    next: (res) => {
      console.log('Wishlist response:', res); // Debugging
      this.allWishlistData = res;
    }
  })
}


removeFromWishlist(productId: string): void {
  this.wishlistService.removeProductFromwishlist(productId).subscribe({
    next: () => {
      // Remove the item from the UI
      this.allWishlistData.data = this.allWishlistData.data.filter(item => item.id !== productId);
    },
    error: (err) => {
      console.error('Error removing product from wishlist:', err);
    }
  });
}




}
