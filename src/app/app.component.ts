import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { NgxSpinnerService, NgxSpinnerModule, NgxSpinnerComponent } from "ngx-spinner";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  constructor(private flowbiteService: FlowbiteService) {}

  ngxSpinnerService=inject(NgxSpinnerService)
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });

    // this.ngxSpinnerService.show()
  }

  // ngAfterViewInit(): void {
 
  //   setTimeout(() => {
  //     this.ngxSpinnerService.hide();
  //   }, 1000);} // Optional delay to ensure smooth transition
  


 
  
}
