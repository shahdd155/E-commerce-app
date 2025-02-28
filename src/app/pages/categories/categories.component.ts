import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';


@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  categoriesService=inject(CategoriesService)
allcategories!:Icategory;
  ngOnInit(): void {
      this.getAllCat()
  }

  getAllCat():void{
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
console.log(res)
this.allcategories=res
      }


    })
  }
}
