import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../../../shared/models/order';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input() cart :ShoppingCart;
  shipping = {}; 
  userId : string ;
  subscription : Subscription ;
  constructor(
    private orderService : OrderService,
    private AuthService :AuthService ,
    private router :Router){
    }
    ngOnInit() {
      this.subscription=this.AuthService.user$.subscribe(user => this.userId =user.uid);
    }
    ngOnDestroy(){
      this.subscription.unsubscribe();
    }

  async placeOrder() {
    let order = new Order(this.userId , this.shipping , this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
      }    
  

}
