import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product-list/product/product.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductCreateComponent } from './product-create/product-create.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CategoryNavComponent } from './category-nav/category-nav.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { LocationComponent } from './product-list/product/location/location.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment.development';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { HotToastModule, provideHotToastConfig } from '@ngneat/hot-toast';
import { ToastrModule } from 'ngx-toastr';
import { MyProductsComponent } from './my-products/my-products.component';
import { EditMyproductComponent } from './my-products/edit-myproduct/edit-myproduct.component';
import { TreasuresComponent } from './treasures/treasures.component';
import { CompanyCreateComponent } from './company-create/company-create.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,
    ProductComponent,
    CategoryListComponent,
    HomeComponent,
    ProductCreateComponent,
    CategoryCreateComponent,
    CategoryNavComponent,
    BreadcrumbComponent,
    LocationComponent,
    LandingComponent,
    LoginComponent,
    SingUpComponent,
    MyProductsComponent,
    EditMyproductComponent,
    TreasuresComponent,
    CompanyCreateComponent,
    CompanyListComponent,
    ContactUsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CKEditorModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatMenuModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),

    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    // https://medium.com/swlh/angular-google-map-component-basics-and-tips-7ff679e383ff
    // <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAJ0UiyZ42ojmfHCvTltXjy3tT8j9H9Zkw"></script> eklendi index.html
  ],
  providers: [provideHotToastConfig({ position: 'top-center' })],
  bootstrap: [AppComponent],
})
export class AppModule {}
