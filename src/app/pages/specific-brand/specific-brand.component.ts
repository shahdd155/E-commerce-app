import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandsService } from '../../core/services/brands.service';
import { Ispecificbrand } from '../../shared/interfaces/ispecificbrand';

@Component({
  selector: 'app-specific-brand',
  imports: [],
  templateUrl: './specific-brand.component.html',
  styleUrl: './specific-brand.component.scss'
})
export class SpecificBrandComponent implements OnInit {

  private readonly brandsService = inject(BrandsService);
  private readonly router = inject(Router);
  brand!: Ispecificbrand;
  ngOnInit(): void {
      
  }
}
