import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { City } from './models/city';
import { AuthenticationService } from './services/authentication.service';
import { ObjectDetectionService } from './services/object-detection.service';

@Component({
  selector: 'app-root',
  // selector: `.app`,  artık bu componenti class olarak çağırırsın index.html de
  // selector: `#app`,  artık bu componenti id olarak çağırırsın index.html de
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // styleUrls: ['./app.component.css',`./app.component2.css`]  -- > birden fazla css eklenebilir bu şekilde
  providers: [ProductService],
})
export class AppComponent implements OnInit {
  private _title = 'Home Page'; // bu title bilgisini app.component.html içinde ulaşabiliyoruz
  //public info: any;
  //public info1: City[];
  // //http injection
  // constructor(private http: HttpClient) {}

  constructor(
    private productService: ProductService,
    private http: HttpClient,
    public authService: AuthenticationService,
    private objectDetectionService: ObjectDetectionService
  ) {}
  async ngOnInit(): Promise<void> {
    //data almaya çalışıyorum map
    // const url = `/assets/data.json`;
    // this.http.get(url).subscribe((response) => {
    //   this.info = response;
    //   this.info1 = Array.from(this.info) as City[];
    //   console.log(this.info1);
    // });
    // this.authService.autoLogin();

    await this.objectDetectionService.loadModel();
  }
  scrollTo() {
    const element = document.getElementById('top-navbar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  get title() {
    return this._title;
  }
  // createProduct() {
  //   const product = {
  //     id: 1,
  //     name: 'Iphone 23',
  //     price: 40000,
  //     imageUrl: '3.jpeg',
  //     isActive: true,
  //     description: 'Iphone telefon description',
  //     categoryId: 1,
  //   };
  //   this.http
  //     .post(
  //       `https://ng-shopapp-fc436-default-rtdb.firebaseio.com/products.json`,
  //       product
  //     )
  //     .subscribe((data) => console.log(data));
  // }

  // createProduct() {
  //   const product = {
  //     id: 1,
  //     name: 'Iphone 24',
  //     price: 40000,
  //     imageUrl: '1.jpeg',
  //     isActive: true,
  //     description: 'Iphone telefon description',
  //     categoryId: 3,
  //   };
  //   this.productService
  //     .createProduct(product)
  //     .subscribe((data) => console.log(data));
  // }
}

// selector --> component çağırılırken hangi etiketi kullanacağız
// templateUrl --> componentin html kodu nerede
// styleUrl --> componentin style dosyaları nerede yazılacak
