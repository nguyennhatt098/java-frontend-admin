import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Framework4CModule } from 'ngx-fw4c';
import { ProductListComponent } from './product-list/product-list.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductImageComponent } from './product-image/product-image.component';

const declarations = [
  ProductListComponent,
  EditProductComponent,
  ProductImageComponent
];
@NgModule({
  declarations: declarations,
  exports: declarations,
	entryComponents: declarations,
  imports: [
    CommonModule,
    FormsModule,
    Framework4CModule.forRoot(),
    BrowserModule
  ],

})


export class ProductModule { }
