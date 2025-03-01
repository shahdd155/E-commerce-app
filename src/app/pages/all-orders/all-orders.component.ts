import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { Iallorders } from '../../shared/interfaces/iallorders';
import { DatePipe } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-all-orders',
  imports: [DatePipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit {
  orders: Iallorders[] = []; // Array to store all orders
  private readonly ordersService = inject(OrdersService);
  userData: any;

  ngOnInit(): void {
    this.getUserData();
    if (this.userData && this.userData.id) { // Ensure the field is `id` or `userId` based on your token payload
      this.fetchAllOrders(this.userData.id); // Pass the correct user ID
    } else {
      console.error('User ID not found in token');
    }
  }

  getUserData(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.userData = jwtDecode(token);
      console.log('Decoded User Data:', this.userData); // Log the decoded token to verify its structure
    } else {
      console.error('Token not found in localStorage');
    }
  }

  fetchAllOrders(userId: string): void {
    this.ordersService.getallorders(userId).subscribe({
      next: (response: Iallorders[]) => {
        this.orders = response;
        console.log('Fetched Orders:', this.orders); // Log the fetched orders to verify the response
      },
      error: (err) => {
        console.error('Error fetching orders:', err); // Log any errors
      }
    });
  }
}