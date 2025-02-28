import { Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { ProductsService } from '../../core/services/products/products.service';
import { IproductDetails } from '../../shared/interfaces/iproduct-details';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{

  activatedRoute= inject(ActivatedRoute)
  productsService= inject(ProductsService)
  title= inject(Title)

  currentProduct!:IproductDetails;

ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
 let id = res.get('specficProductId') as string
this.getProductID(id)
      },
      error:(err)=>{}

    })

    }

    getProductID(id:string):void{
this.productsService.getSpecificProduct(id).subscribe({
  next:(res)=>{
console.log(res);
this.currentProduct=res;
this.title.setTitle(res.data.title)
}
})
    }

}
