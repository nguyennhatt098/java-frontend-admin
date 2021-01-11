import { UserModule } from './users/user.module';
import { RoleModule } from './roles/role.module';
import { LoginModule } from './login-admin/login.module';
import { ChatModule } from './chat/chat.module';
import { NotifiesModule } from './notifies/notifies.module';
import { CategoryModule } from './categories/categories.module';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BUCKET } from "@angular/fire/storage";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { OrdersModule } from './orders/orders.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { IndexModule } from './index/index.module';
import { DeniedComponent } from './denied/denied.component';
import { NotfoundComponent } from './notfound/notfound.component';

const ListModule = [
  ProductModule,
  RoleModule,
  UserModule,
  OrdersModule,
  CategoryModule,
  NotifiesModule,
  ChatModule,
  LoginModule,
  IndexModule,
  
];

@NgModule({
  declarations: [
    AppComponent,
    DeniedComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  exports: [
    ListModule
  ],
  providers: [
    { provide: BUCKET, useValue: "oganic-shopping.appspot.com" },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
