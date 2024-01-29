import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from '../../environments/environment.development';
import { VisibilityService } from '../services/visibility.service';

@Component({
  // selector: 'app-navbar',
  selector: `navbar`,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [ProductService],
})
export class NavbarComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    public authService: AuthenticationService,
    private visibilityService: VisibilityService
  ) {}
  products: Product[] = [];

  //isAdmin: boolean = this.authService.getisAdmin();
  ngOnInit(): void {
    //  this.isAdmin = this.authService.getisAdmin();
  }
  VisibleAllListFilterNav() {
    this.visibilityService.setVisibilityNav(true);
    this.visibilityService.setVisibilityCategoryList(true);
    this.visibilityService.setVisibilityFilter(true);
    this.visibilityService.setVisibilityAdField(false);
  }

  async clickedMyProducts() {
    await this.router.navigate(['myproducts']);
    // window.location.reload();
    location.reload();
  }

  getProductIdSearched(searched: any) {
    // console.log(searched.value);
    //   console.log(searched.value.toString().length);
    if (searched.value.toString().length != 0) {
      this.productService
        .getProductByNum(searched.value.toString().trim())
        .subscribe((data) => {
          this.products = data;
          //  console.log(this.products);

          if (this.products[0]) {
            this.router.navigate(['/products/' + this.products[0].id]);
            this.products = [];
          } else {
            this.router.navigate(['products/categories/noProducts']);
          }
        });
    }
  }
  display() {
    document.getElementById('categoryList')?.classList.remove('d-none');
    document.getElementById('categoryList')?.classList.add('d-block');
    document.getElementById('filter')?.classList.add('d-block');
    document.getElementById('filter')?.classList.remove('d-none');

    document.getElementById('category-nav')?.classList.remove('d-none');
  }

  dnone() {
    document.getElementById('categoryList')?.classList.remove('d-none');
    document.getElementById('categoryList')?.classList.add('d-block');
    document.getElementById('filter')?.classList.remove('d-block');
    document.getElementById('filter')?.classList.add('d-none');
    document.getElementById('category-nav')?.classList.remove('d-block');
    // document.getElementById('category-nav')?.classList.add('d-none');
  }
  // changelog() {
  //   document.getElementById('logout')?.classList.add('d-none');
  //   document.getElementById('login')?.classList.remove('d-none');
  // }
  logout() {
    this.authService.logout().subscribe(() => {
      //  document.getElementById('create-category')?.classList.add('d-none');
      localStorage.removeItem('user');
      this.router.navigate(['products']);
    });
  }
}
