import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent  {
order$
orderId:string;
  constructor(private orderService :OrderService,
  private route :ActivatedRoute) {
     this.route.params.subscribe( params=> this.orderId=params['id']);
    this.order$=this.orderService.getOrder(this.orderId);
  }

  

}
