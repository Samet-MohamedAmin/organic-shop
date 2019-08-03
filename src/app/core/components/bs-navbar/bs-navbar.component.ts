import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
    appUser: AppUser;
    cart$ : Observable <ShoppingCart>;  
    products;
    searchedProducts:Product[]=[];
    constructor(private auth: AuthService, 
                private shoppingCartService: ShoppingCartService ,
                private productService :ProductService) { 
    }
  
    async ngOnInit() { 
      this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
      this.cart$ = await this.shoppingCartService.getCart();
      this.productService.getAll().subscribe(products=>{
        console.log(products);
        
      this.products=products     
});
    }
  
    logout() {
      this.auth.logout();
    }
  
searchProducts(searchWord){
  this.searchedProducts=this.products.filter((prod)=>{
  return prod.title.toLowerCase().includes(searchWord)
  })
}

}
