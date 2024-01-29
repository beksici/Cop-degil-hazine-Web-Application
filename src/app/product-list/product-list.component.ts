import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductRepository } from '../models/product.repository';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { PlatformLocation } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { ImageUploadService } from '../services/image-upload.service';
import { environment } from '../../environments/environment.development';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { VisibilityService } from '../services/visibility.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductService], // bu servisi kullancağımız şiçin inject ediyoruz
})
export class ProductListComponent implements OnInit {
  // products: Product[] =;
  products: Product[] = []; // asenkron olarak geldiği için data firebaseden
  loading: boolean = false;
  categories: Category[];
  allCategoriesParam: string | any = '';

  // productRepository: ProductRepository;
  //  selectedProduct: Product | null; // burada tanımaladığımız propertyleri contructor içinde tanımlamamızı istiyor typescript fakat biz aşağıada fonskiyonda yaptık o yüzden tsconfig.ts dosyasına
  // "strictPropertyInitialization": false ekliceksin
  // constructor(private route: ActivatedRoute, private http: HttpClient) {
  //   this.productRepository = new ProductRepository();
  //   // this.products = this.productRepository.getProducts();
  // }
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    location: PlatformLocation,
    public authService: AuthenticationService,
    private imageUploadService: ImageUploadService,
    private categoryService: CategoryService,
    private visibilityService: VisibilityService,
    private router: Router
  ) {
    //this.productRepository = new ProductRepository();
    // this.products = this.productRepository.getProducts();
    location.onPopState(() => {
      this.visibilityService.setVisibilityFilter(false);
      this.visibilityService.setVisibilityAdField(false);
      this.visibilityService.setVisibilityCategoryList(true);
      this.visibilityService.setVisibilityNav(true);
      this.router.navigate(['home']);
      // alert(window.location);
      // this.dblock();
      // document.getElementById('allCategories')?.click();
      // document.getElementById('category-nav')?.classList.remove('d-none');
      // document.getElementById('ad-field')?.classList.add('d-none');
      // document.getElementById('categoryList')?.classList.remove('d-none');
    });
  }
  // selectProduct(product: Product) {
  //   //product interface tipinde bir değişken alıcak demiş oluyoruz
  //   this.selectedProduct = product;
  // }
  // unSelectProduct() {
  //   this.selectedProduct = null;
  // }
  // dblock() {
  //   document.getElementById('categoryList')?.classList.remove('d-none');
  //   document.getElementById('categoryList')?.classList.add('d-block');
  //   document.getElementById('filter')?.classList.remove('d-block');
  //   document.getElementById('filter')?.classList.add('d-none');

  //   document.getElementById('category-nav')?.classList.remove('d-none');
  //   document.querySelector('.active')?.classList.remove('active');
  // }
  // dnone() {
  //   document.getElementById('categoryList')?.classList.add('d-none');
  //   document.getElementById('categoryList')?.classList.remove('d-block');
  //   document.getElementById('filter')?.classList.remove('d-block');
  //   document.getElementById('filter')?.classList.add('d-none');

  //   document.getElementById('category-nav')?.classList.add('d-none');
  //   document.getElementById('ad-field')?.classList.remove('d-none');
  // }
  unVisibleAll() {
    this.visibilityService.setVisibilityNav(false);
    this.visibilityService.setVisibilityCategoryList(false);
    this.visibilityService.setVisibilityFilter(false);
    this.visibilityService.setVisibilityAdField(true);
  }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
    this.route.params.subscribe((params) => {
      this.loading = true;
      let city = params['city'];
      let district = params['district'];
      let quarter = params['quarter'];
      let pricefree = params['pricefree'];
      let pricesale = params['pricesale'];
      let firstnew = params['firstnew'];
      let firstold = params['firstold'];
      let category = params['categoryId'];

      localStorage.setItem('categoryId', category);
      console.log(category);
      console.log(
        'ücretsiz seçimi: ' + pricefree + 'ücretli seçimi: ' + pricesale
      );

      if (category == undefined) {
        //tüm kataori seçilmiş demek
        this.productService.getProducts(category).subscribe((data) => {
          this.products = this.sortProducts(data).reverse();
          this.clearNotActiveProducts();
          //tüm ürünler şuan burada
          // burada kaldın !!!!!!!!!
          // !!!!!!!!! burada tüm katagoriler seçildiği için ürün bazında filtreleme yapıp tekrar ürün içine atıcaz
          // this.categoryService.getCategories().subscribe((data) => {
          //   this.categories = data;
          //   for (let categoryy of this.categories) {
          //     this.allCategoriesParam += categoryy.id + '~';
          //   }
          //   environment.categoryId = this.allCategoriesParam;
          //   console.log(environment.categoryId);
          // });
          for (let product of this.products) {
            this.getProductImage0(product.adNo);
          }
          this.loading = false;
        });
      } else if (category == 'All') {
        this.productService
          .getProductsFilteredAll(
            city,
            district,
            quarter,
            pricefree,
            pricesale,
            firstnew,
            firstold
          )
          .subscribe((data) => {
            this.products = data;
            this.clearNotActiveProducts();

            for (let product of this.products) {
              this.getProductImage0(product.adNo);
            }

            this.loading = false;
          });

        // this.productService.getProductsAll().subscribe((data) => {
        //   this.products = data;
        //   for (let product of this.products) {
        //     this.getProductImage0(product.adNo);
        //   }
        //   this.loading = false;
        // });
      } else {
        // environment.categoryId = category;
        console.log('city:' + city);

        if (city == undefined) {
          // filtre yapılmamış ama kategori seçilmiş demek
          let param: [] = category.split('~');
          if (param.length >= 2) {
            param.pop();
            console.log('boş olmayan ' + param);
            let called = false;
            for (let i in param) {
              if (!called) this.products = [];
              this.productService.getProducts(param[i]).subscribe((data) => {
                this.products = this.products.concat(data);
                this.products = this.sortProducts(this.products).reverse();
                this.clearNotActiveProducts();
                called = true;
                for (let product of this.products) {
                  this.getProductImage0(product.adNo);
                }

                this.loading = false;
              });
            }
          } else {
            let param = category.split('~');
            this.productService.getProducts(param[0]).subscribe((data) => {
              this.products = data;
              this.clearNotActiveProducts();
              for (let product of this.products) {
                this.getProductImage0(product.adNo);
              }

              this.loading = false;
            });
          }
        } else {
          // filtre yapılmış ve kategori seçilmiş demek
          // tüm kataori de seçmiş olabilir
          ////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!
          let param: [] = category.split('~');
          if (param.length >= 2) {
            param.pop();
            console.log('boş olmayan ' + param);
            let called = false;
            for (let i in param) {
              if (!called) this.products = [];
              this.productService
                .getProductsFiltered(
                  param[i],
                  city,
                  district,
                  quarter,
                  pricefree,
                  pricesale,
                  firstnew,
                  firstold
                )
                .subscribe((data) => {
                  this.products = this.products.concat(data);
                  this.products = this.sortProducts(this.products);
                  if (firstold != 'true') {
                    this.products.reverse();
                  }

                  this.clearNotActiveProducts();
                  called = true;
                  for (let product of this.products) {
                    this.getProductImage0(product.adNo);
                  }

                  if (this.products.length != 0) this.loading = false;
                });
              setTimeout(() => {
                this.loading = false;
              }, 2500);
            }
          } else {
            let param = category.split('~');
            this.productService
              .getProductsFiltered(
                param[0],
                city,
                district,
                quarter,
                pricefree,
                pricesale,
                firstnew,
                firstold
              )
              .subscribe((data) => {
                this.products = data;
                this.clearNotActiveProducts();

                for (let product of this.products) {
                  this.getProductImage0(product.adNo);
                }

                this.loading = false;
              });
          }
        }
      }

      // if (params['categoryId']) {
      //   // this.products = this.productRepository.getProductsByCategoryId(
      //   //   params['categoryId']
      //   // );
      // } else {
      //   // this.products = this.productRepository.getProducts();
      //   //get<Product[]> product dizisi alıcam demek
      //   this.productService.getProducts().subscribe((result) => {
      //     // const data: Product[] = [];
      //     for (const key in result) {
      //       // console.log(key);
      //       // console.log(result[key]);

      //       this.products.push({ ...result[key], id: key });
      //     }
      //     // this.products = data;
      //   });
      // }
    });
  }

  getCurrentProductCategory(product: Product) {
    let categoryUpandDownName: string = '';
    for (const key in this.categories) {
      if (this.categories[key].id == product.categoryId) {
        categoryUpandDownName =
          this.categories[key].upName + ' / ' + this.categories[key].name;
      }
    }
    return categoryUpandDownName;
  }

  sortProducts(products: Product[]): Product[] {
    // eskiden yeniye yani 0 index 1. indexten daha eski
    let sortedProducts = products.sort((a, b) => {
      let dateA = new Date(a.adDate.split('.').reverse().join('-'));
      let dateB = new Date(b.adDate.split('.').reverse().join('-'));
      if (dateA.getTime() === dateB.getTime()) {
        // Tarihler eşitse, isimlere göre sırala
        return a.name.localeCompare(b.name);
      }
      return dateA.getTime() - dateB.getTime();
    });

    return sortedProducts;
  }
  getProductImage0(adNo: string) {
    this.imageUploadService.getImages('images/' + adNo + '/0', adNo);
  }

  deleteProduct(product: Product) {
    this.loading = true;
    if (confirm('Bu ilanı kaldırmak istediğinizden emin misiniz?')) {
      this.productService.setProductIsActive(product);
      setTimeout(() => {
        this.showProduclist();
      }, 1000);
    } else {
      this.showProduclist();
    }
  }
  showProduclist() {
    this.productService.getProductsAll().subscribe((data) => {
      console.log(data);

      this.products = data;
      this.clearNotActiveProducts();
      for (let product of this.products) {
        this.getProductImage0(product.adNo);
      }

      this.loading = false;
    });
  }
  clearNotActiveProducts(): boolean {
    this.products = this.products.filter((p) => p.isActive == true);
    return true;
  }
  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     if (params['categoryId']) {
  //       this.products = this.productRepository.getProductsByCategoryId(
  //         params['categoryId']
  //       );
  //     } else {
  //       // this.products = this.productRepository.getProducts();
  //       //get<Product[]> product dizisi alıcam demek
  //       this.http
  //         .get<Product[]>(
  //           `https://ng-shopapp-fc436-default-rtdb.firebaseio.com/products.json`
  //         )
  //         .subscribe((result) => {
  //           // const data: Product[] = [];
  //           for (const key in result) {
  //             // console.log(key);
  //             // console.log(result[key]);

  //             this.products.push({ ...result[key], id: key });
  //           }
  //           // this.products = data;
  //         });
  //     }
  //   });
  // }
  // product = {
  //   id: 1,
  //   name: 'Iphone 15',
  //   price: 20000,
  //   imageUrl: '1.jpeg',
  //   isActive: true,
  //   description: 'Iphone telefon description',
  // };
  // productList = ['Iphone 13', 'Iphone 14', 'Iphone 15'];
  // products: any = [
  //   {
  //     id: 1,
  //     name: 'Iphone 14',
  //     price: 20000,
  //     imageUrl: '1.jpeg',
  //     isActive: true,
  //     description: 'Iphone telefon description',
  //   },
  //   {
  //     id: 2,
  //     name: 'Iphone 15',
  //     price: 30000,
  //     imageUrl: '2.jpeg',
  //     isActive: true,
  //     description: 'Iphone telefon description',
  //   },
  //   {
  //     id: 3,
  //     name: 'Iphone 16',
  //     price: 40000,
  //     imageUrl: '3.jpeg',
  //     isActive: false,
  //     description: 'Iphone telefon description',
  //   },
  // ];
  // private products: any[] = [
  //   {
  //     id: 1,
  //     name: 'Iphone 14',
  //     price: 20000,
  //     imageUrl: '1.jpeg',
  //     isActive: true,
  //     description: 'Iphone telefon description',
  //   },
  //   {
  //     id: 2,
  //     name: 'Iphone 15',
  //     price: 30000,
  //     imageUrl: '2.jpeg',
  //     isActive: true,
  //     description: 'Iphone telefon description',
  //   },
  //   {
  //     id: 3,
  //     name: 'Iphone 16',
  //     price: 40000,
  //     imageUrl: '3.jpeg',
  //     isActive: false,
  //     description: 'Iphone telefon description',
  //   },
  // ];
  // getProducts() {
  //   return this.products.filter((p) => p.isActive);
  // }
  //Models
  // private products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Iphone 14',
  //     price: 20000,
  //     imageUrl: '1.jpeg',
  //     isActive: true,
  //     description: 'Iphone telefon description',
  //   },
  //   {
  //     id: 2,
  //     name: 'Iphone 15',
  //     price: 30000,
  //     imageUrl: '2.jpeg',
  //     isActive: true,
  //     description: 'Iphone telefon description',
  //   },
  //   {
  //     id: 3,
  //     name: 'Iphone 16',
  //     price: 40000,
  //     imageUrl: '3.jpeg',
  //     isActive: false,
  //     description: 'Iphone telefon description',
  //   },
  // ];
  // getProducts(): Product[] {
  //   //product dizisi döndürecek demiş oluyoruz
  //   return this.products.filter((p) => p.isActive);
  //   //filter bir dizi gönderir uyan arama sonucunu
  // }
  // getProductsById(id: number): Product | undefined {
  //   //product veya undefied döndürür
  //   return this.products.find((p) => p.id == id);
  //   // find ise product veya undefined gönderir
  // }

  //interface ve product repository clasından sonra
}
