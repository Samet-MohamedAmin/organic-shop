import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap'
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products: Product[]= [];
filtredProducts:Product[]=[];
category :string ;
categories$;
cart$ : Observable <ShoppingCart> ;
  constructor(
    private productService :ProductService,
    private route :ActivatedRoute,
    private cartService :ShoppingCartService 
  ) { }

 async ngOnInit(){
  this.cart$=(await this.cartService.getCart());
  this.populateProducts();
  }

  private populateProducts () {
    this.productService.getAll().switchMap(products =>
      {
       this.products=products ;
       return  this.route.queryParamMap;
      })
      .subscribe(params => 
      {
      this.category=params.get('category');
      this.filterProducts();
      });
  }

  private filterProducts(){
  this.filtredProducts= this.category? this.products.filter(product=>
   product.category==this.category) :
   this.products;
  }

  

 
}
