import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-4-data-table';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ng2-validation';
import { ProductCartComponent } from 'shared/components/product-cart/product-cart.component';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { CategoryService } from 'shared/services/category.service';
import { OrderService } from 'shared/services/order.service';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { UserService } from 'shared/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    DataTableModule,
    CustomFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  declarations: [
    ProductCartComponent,
    ProductQuantityComponent
  ],
  exports:[
    ProductCartComponent,
    ProductQuantityComponent,
    CommonModule,
    FormsModule,
    DataTableModule,
    CustomFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers:[
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
