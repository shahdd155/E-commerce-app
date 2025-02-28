import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive, AsyncPipe,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
 private readonly authService = inject(AuthService)
 private readonly myTranslateService = inject(MyTranslateService)
 private readonly translateService= inject(TranslateService)
cartService = inject(CartService)
isLogin= input<boolean>(true);


ngOnInit(): void {
    this.cartService.getCartProduct().subscribe({
      next:(res)=>{
this.cartService.cartItemCount.next(res.numOfCartItems)
}
    })
}



logOut():void{
  this.authService.logoutUser();
}

change(lang: string): void {
  this.myTranslateService.changeLangTranslate(lang);
}

currentlang(lang:string):boolean{
return this.translateService.currentLang=== lang
}

}
