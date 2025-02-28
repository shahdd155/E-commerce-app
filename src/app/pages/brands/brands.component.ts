import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { Ibrand } from '../../shared/interfaces/ibrand';
import { BrandsService } from '../../core/services/brands.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
  brands: Ibrand[] = [];
  private readonly brandsService = inject(BrandsService);
  private readonly router = inject(Router);


  ngOnInit(): void {
    this.fetchBrands();
  }

  fetchBrands(): void {
    this.brandsService.getAllBrands().subscribe(response => {
      this.brands = response.data;
    });
  }


  
showBrandDetails(brand: Ibrand): void {
  Swal.fire({
    title: `<span style="color: green; font-size: 24px; font-weight: bold;">${brand.name}</span>`,
    html: `<p style="font-size: 16px; color: gray;">${brand.slug}</p>`,
    imageUrl: `assets/${brand.image}-logo.png`, 
    imageWidth: 200,
    imageAlt: brand.name,
    confirmButtonText: "Close",
    confirmButtonColor: "#3085d6",
  });

}


}

