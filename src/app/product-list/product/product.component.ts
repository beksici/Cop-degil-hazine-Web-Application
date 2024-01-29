import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Signal,
} from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
// import { ProductRepository } from '../../models/product.repository';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { PlatformLocation } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { ImageUploadService } from '../../services/image-upload.service';
import { VisibilityService } from '../../services/visibility.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [ProductService, CategoryService],
})
export class ProductComponent implements OnInit {
  // @Input() prd: Product; // Bu parametre dışarıdan gelecek demek
  // @Output() unSelectEvent = new EventEmitter<void>();

  // unSelectProduct() {
  //   this.unSelectEvent.emit();
  // }
  showFullAddress: boolean = true;
  truncatedAddress: string = ''; // Burada kırpılmış adresi saklayabilirsiniz

  product: Product | undefined;
  loading: boolean = false;
  productPriceCheck: boolean = false;
  categories: Category[];
  UpnameCat: string;
  downNameCat: string;
  imageCount: number;
  fakeArray: Array<Number>;
  // productRepository: ProductRepository;
  // constructor(private route: ActivatedRoute) {
  //   this.productRepository = new ProductRepository();
  // }
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    location: PlatformLocation,
    private authService: AuthenticationService,
    private imageUploadService: ImageUploadService,
    private visibilityService: VisibilityService
  ) {
    location.onPopState(() => {
      // alert(window.location);
      this.visibilityService.setVisibilityFilter(true);
      this.visibilityService.setVisibilityAdField(false);
      this.visibilityService.setVisibilityCategoryList(false);
      this.visibilityService.setVisibilityNav(false);
      // this.dblock();
      // document.getElementById('allCategories')?.click();
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

  //   document.querySelector('.active')?.classList.remove('active');
  // }
  toggleFullAddress() {
    this.showFullAddress = !this.showFullAddress;

    // Kırpılmış adresi hesapla (örneğin, ilk 50 karakter)
    if (this.product?.fullAddress != undefined) {
      this.truncatedAddress = this.showFullAddress
        ? this.product.fullAddress
        : this.truncateAddress(this.product.fullAddress, 5);
    }
  }

  truncateAddress(address: string, maxLength: number): string {
    console.log(address);

    if (address.length <= maxLength) {
      return address;
    } else {
      return address.substring(0, maxLength) + '...';
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.loading = true;
      const id = params['productId'];
      // this.product = this.productRepository.getProductsById(id);
      this.productService.getProductById(id).subscribe((result) => {
        this.categoryService.getCategories().subscribe((data) => {
          this.categories = data;
          for (const key in this.categories) {
            if (this.categories[key].id == result.categoryId) {
              this.UpnameCat = this.categories[key].upName;
              this.downNameCat = this.categories[key].name;
            }
          }
        });

        this.product = { ...result, id: id };
        if (this.product.priceFree == 'true') {
          this.productPriceCheck = true;
        }
        this.imageCount = parseInt(this.product.adImages);
        this.fakeArray = new Array(this.imageCount);
        console.log(this.fakeArray.length + ' ve içi ' + this.fakeArray);

        for (let i = 0; i < this.imageCount; i++) {
          this.imageUploadService.getImagesProduct(
            'images/' + this.product.adNo + '/' + i,
            'image' + i
          );
        }

        this.loading = false;
      });
    });
  }
}
