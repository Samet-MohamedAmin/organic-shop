import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from '../models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(
    private db : AngularFireDatabase
  ) { }

  create (){
    return this.db.list('/shopping-carts').push({
      dateCreated : new Date().getTime()
    });
  }
public getItem( cartId , productId) {
  return this.db.object('/shopping-carts/'+cartId+'/items/'+productId);
}
  public async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId= await this.getOrCreateCartID();
    return this.db.object('/shopping-carts/'+cartId)
    .map(cart => new ShoppingCart(cart.items));
  }

  async addToCart(product :Product){
    this.updateItem(product,1);
 }
 
  async removeFromCart (product :Product){
   this.updateItem(product,-1);
 }

 async clearCart(){
   let cartId =await this.getOrCreateCartID();
   this.db.list("/shopping-carts/"+ cartId +"/items").remove();
 }

  private async getOrCreateCartID() : Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if (cartId )    return cartId;

    let result = await this.create();
   localStorage.setItem('cartId',result.key);
   return result.$key ;     
    
  }

 
private async updateItem(product : Product, change :Number) {
  let cartId =await this.getOrCreateCartID();
  let item$ = await this.getItem(cartId,product.$key);
  item$.take(1).subscribe( item =>{
    let quantity =(item.quantity||0) + change;
    if (quantity == 0) item$.remove();
    else item$.update({
    title : product.title ,
    price : product.price ,
    imageUrl : product.imageUrl,
    quantity : quantity
 })
});
}

}
