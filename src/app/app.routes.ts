import { DetailsComponent } from './pages/details/details.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/logged/logged.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    {
        path: '',
        component: AuthLayoutComponent,
       canActivate:[loggedGuard],
        children: [
            {
                path: 'login',
                title: 'Login',
                loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: 'register',
                title: 'Register',
                loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
            },
            {
                path: 'forgot',
                title: 'forget password',
                loadComponent: () => import('./pages/forgot/forgot/forgot.component').then(m => m.ForgotComponent)
            },
        ]
    },

    {
        path: '',
        component: BlankLayoutComponent,
        canActivate:[authGuard],
        children: [
            {
                path: 'home',
                title: 'Home',
                loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), 
            },
            {
                path: 'cart',
                title: 'Cart',
                loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)
            },
            {
                path: 'products',
                title: 'Products',
                loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent)
            },
            {
                path: 'brands',
                title: 'Brands',
                loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent)
            },
            {
                path: 'brands/:specficbrandtid',
                title: 'Brands',
                loadComponent: () => import('./pages/specific-brand/specific-brand.component').then(m => m.SpecificBrandComponent)
            },
            {
                path: 'categories',
                title: 'Categories',
                loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent)
            },
            {
                path: 'wishlist',
                title: 'wishlist',
                loadComponent: () => import('./pages/wishlist/wishlist/wishlist.component').then(m => m.WishlistComponent)
            },
            {
                path: 'checkout/:id',
                title: 'Checkout',
                loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent)
            }, 
            {
                path: 'details/:specficProductId',
                title: 'details',
                loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent)
            },
            {
                path: 'allorders',
                title: 'allorders',
                loadComponent: () => import('./pages/all-orders/all-orders.component').then(m => m.AllOrdersComponent)
            }
        ]
    },

    { path: '**', component: NotfoundComponent, title: 'Not Found' }
];
