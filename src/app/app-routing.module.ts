import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product-list/product/product.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard'; //login olmadan ulaşamayacağı için
import { CategoryListComponent } from './category-list/category-list.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { AdminGuard } from './admin.guard';
import { TreasuresComponent } from './treasures/treasures.component';
import { CompanyCreateComponent } from './company-create/company-create.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home']);
const routes: Routes = [
  //bu sıralama önemli
  { path: ``, component: HomeComponent },
  {
    path: `products/create`,
    component: ProductCreateComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: `treasures`,
    component: TreasuresComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: `categories/create`,
    component: CategoryCreateComponent,
    canActivate: [AdminGuard],
  },
  {
    path: `company-create`,
    component: CompanyCreateComponent,
    canActivate: [AdminGuard],
  },
  {
    path: `companies`,
    component: CompanyListComponent,
  },
  { path: `products`, component: ProductListComponent },
  { path: `products/:productId`, component: ProductComponent },
  { path: `products/categories/:categoryId`, component: ProductListComponent },

  {
    path: `products/categories/:categoryId/:city/:district/:quarter/:pricefree/:pricesale/:firstnew/:firstold`,
    component: ProductListComponent,
  },
  {
    path: `contactus`,
    component: ContactUsComponent,
  },
  {
    path: `myproducts`,
    component: MyProductsComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToHome),
  },
  {
    path: 'sign-up',
    component: SingUpComponent,
    ...canActivate(redirectToHome),
  },
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(redirectToLogin),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
