import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { PlatformLocation } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { ImageUploadService } from '../services/image-upload.service';
import { CategoryService } from '../services/category.service';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { environment } from '../../environments/environment.development';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { City, District } from '../category-list/category-list.component';
import { GeolocationService } from '../services/geolocation.service';
import { NgForm } from '@angular/forms';
import { User } from 'firebase/auth';

@Component({
  selector: 'my-products',
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css',
})
export class MyProductsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    location: PlatformLocation,
    private authService: AuthenticationService,
    private imageUploadService: ImageUploadService,
    private categoryService: CategoryService,
    private geolocationService: GeolocationService,
    private router: Router
  ) {}

  user$ = this.authService.currentUser$;
  products: Product[] = []; // asenkron olarak geldiği için data firebaseden
  loading: boolean = true;
  categories: Category[];
  allCategoriesParam: string | any = '';
  clickedEdit: boolean = false;
  locationNotAllowedBoolean: boolean = false;
  editProduct: Product;
  Editor = ClassicEditor;
  //  imagesString: string[] = [];
  lat: number;
  lng: number;
  fileList: FileList;
  error: string = '';
  cities: City[] = [];
  disricts: District[] = [];
  locationNotAllowed: number = 0;
  phoneFormatted: string = '';
  model: any = {
    // name: 'Iphone 25',
    categoryId: '0',
    adCityP: '0',
    adDistrictP: `0`,
  };

  ngOnInit(): void {
    this.clickedEdit = false;
    this.showProduclist();
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
    this.cities = this.getCities(this.cities);
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

  clearNotActiveProducts(): boolean {
    this.products = this.products.filter((p) => p.isActive == true);
    return true;
  }
  showProduclist() {
    this.user$.pipe().subscribe((user) => {
      let currentUid = user?.uid as string;
      console.log(typeof currentUid);
      this.productService.getMyProducts(currentUid).subscribe((data) => {
        console.log(data);

        this.products = data;
        for (let product of this.products) {
          this.getProductImage0(product.adNo);
        }

        this.loading = false;
      });
    });
  }
  setClikedEdit(b: boolean) {
    this.clickedEdit = b;
  }

  setEditProduct(product: Product) {
    this.getLocation();

    // let adress = product.quarter + ' ' + product.district + ' ' + product.city;
    // this.geolocationService.getCoordinates(adress);

    this.editProduct = product;
    console.log(this.editProduct);
    this.model.name = product.name;
    // // adImages: this.fileList.length.toString(),
    // let option = document.createElement('option');
    // option.value = product.city;
    // this.updateDistrict(option);
    // this.updateQuarter(product.city, product.district);
    this.model.description = product.adDescription;
    this.model.fullAddress = product.fullAddress;
    this.model.categoryId = product.categoryId;
    this.model.priceFree = product.priceFree;
    this.lat = parseFloat(product.latitude);
    this.lng = parseFloat(product.longitude);
    this.model.phoneNo = product.phoneNo.replace(/[)(\/\-\s]/g, '');
    this.phoneNumberFormatter(this.model.phoneNo);
  }
  getEditProduct(): Product {
    return this.editProduct;
  }

  getLocation() {
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position) => {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      },
      error: (error) => {
        this.error = 'Lütfen Konum Erişimine İzin Verin';
        this.locationNotAllowed++;
        if (this.locationNotAllowed == 2) {
          this.locationNotAllowedBoolean = true;
          return;
        } else {
          this.getLocation();
          return;
        }
      },
    });
  }

  getCities(optionCities: City[]) {
    fetch('/assets/data.json')
      .then((response) => response.json())
      .then(function (data) {
        data.forEach(function (city: { name: string; alpha_2_code: string }) {
          // let option = document.createElement('option');
          // option.text = city.name;
          // option.value = city.alpha_2_code;

          let citylog = { name: city.name, alpha_2_code: city.alpha_2_code };

          optionCities.push(citylog);
        });
      });
    document.getElementById('adDistrictP')?.setAttribute('disabled', '');
    document.getElementById('adQuarterP')?.setAttribute('disabled', '');
    return optionCities;
  }

  updateDistrict(citySelected: any) {
    if (citySelected.value != '0') {
      fetch('/assets/data.json')
        .then((response) => response.json())
        .then(function (data) {
          var citySelectedObj = data.find(function (city: { name: any }) {
            return city.name === citySelected.value;
          });
          var option =
            '<option value="0" selected>Lütfen ilçe seçiniz</option>';
          document.getElementById('adDistrictP')!.innerHTML = option;
          if (citySelectedObj) {
            document.getElementById('adDistrictP')?.removeAttribute('disabled');
            citySelectedObj.towns.forEach(function (district: {
              name: string;
            }) {
              var option = document.createElement('option');
              option.text = district.name;
              option.value = district.name;
              // adDistrict.add(option);

              document.getElementById('adDistrictP')?.appendChild(option);
            });
          }

          // İlk ilçe seçildiğinde mahalleleri yükle
          // var districtSelected = adDistrict.value;
          // updateQuarter(districtSelected);
        });
    } else {
    }
  }

  updateQuarter(citySelected: any, districtSelected: any) {
    if (citySelected.value != '0' && districtSelected.value != '0') {
      var adQuarter = document.getElementById('adQuarterP');

      adQuarter!.innerHTML = '';

      fetch('/assets/data.json')
        .then((response) => response.json())
        .then(function (data) {
          var citySelectedObj = data.find(function (city: { name: any }) {
            return city.name === citySelected.value;
          });

          if (citySelectedObj) {
            var districtSelectedObj = citySelectedObj.towns.find(
              function (district: { name: any }) {
                return district.name === districtSelected.value;
              }
            );
            var option =
              '<option value="0" selected>Lütfen mahalle seçiniz</option>';
            document.getElementById('adQuarterP')!.innerHTML = option;

            if (districtSelectedObj) {
              adQuarter?.removeAttribute('disabled');
              districtSelectedObj.districts.forEach(function (mahalle: {
                quarters: any[];
              }) {
                mahalle.quarters.forEach(function (quarter: { name: string }) {
                  var option = document.createElement('option');
                  option.text = quarter.name;
                  option.value = quarter.name;
                  adQuarter?.appendChild(option);
                });
              });
            }
          }
        });
    }
  }

  setFilterLocation(
    citySelected: any,
    districtSelected: any,
    quarterselected: any
  ) {
    if (
      citySelected.value != '0' &&
      districtSelected.value != '0' &&
      quarterselected.value != '0'
    ) {
      console.log(
        citySelected.value +
          ' ' +
          districtSelected.value +
          ' ' +
          quarterselected.value
      );
    }
  }
  setFilterLocationAll(
    citySelected: any,
    districtSelected: any,
    quarterselected: any,
    pricefree: any,
    pricesale: any,
    firstnew: any,
    firstold: any
  ) {
    console.log(
      citySelected.value +
        ' ' +
        districtSelected.value +
        ' ' +
        quarterselected.value +
        ' - ' +
        pricefree.checked +
        ' - ' +
        pricesale.checked +
        ' - ' +
        firstnew.checked +
        ' - ' +
        firstold.checked
    );
  }
  formatPhoneNumber(value: any) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }

  phoneNumberFormatter(phoneNo: any) {
    const formattedInputValue = this.formatPhoneNumber(phoneNo);
    console.log(formattedInputValue);

    this.phoneFormatted = formattedInputValue;
  }
  setFileList(event: any) {
    this.fileList = event.target.files;
  }
  generateRandomNumber(digits: number) {
    // 0'dan 9'a kadar olan rakamları içeren bir dizi oluştur
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let randomNumber = '';
    // Basamak sayısı kadar döngü oluştur
    for (let i = 0; i < digits; i++) {
      // Dizinin uzunluğuna göre rastgele bir indeks seç
      let index = Math.floor(Math.random() * numbers.length);

      randomNumber += numbers[index];

      numbers.splice(index, 1);
    }
    // Random sayıyı döndür
    return randomNumber;
  }

  async saveProduct(form: NgForm, user: User) {
    this.setClikedEdit(false);
    if (this.model.categoryId == '0') {
      this.error = 'Categori seçmelisiniz';
      return;
    }

    if (
      this.model.adCityP == '0' ||
      this.model.adDistrictP == '0' ||
      this.model.adQuarterP == '0' ||
      this.model.adCityP == undefined ||
      this.model.adDistrictP == undefined ||
      this.model.adQuarterP == undefined
    ) {
      this.error = 'Lütfen İl İlçe Mahalle seçiniz!';
      return;
    } else {
      let adress =
        this.model.adQuarterP +
        ' ' +
        this.model.adDistrictP +
        ' ' +
        this.model.adCityP;
      let location = this.geolocationService.getCoordinates(adress);
      location
        .then((result: any[]) => {
          if (result.length != 0) {
            if (
              this.lat == undefined ||
              this.lat == null ||
              this.lat == 0 ||
              this.lng == undefined ||
              this.lng == null ||
              this.lng == 0
            ) {
              if (!this.locationNotAllowedBoolean) {
                this.error = 'Lütfen Konuma izin veriniz';
                this.getLocation();
                form.invalid;
                return;
              } else {
                this.lat = result[0];
                this.lng = result[1];
                this.locationNotAllowed = 0;
              }
            }
          }
        })
        .catch((error) => {
          this.error = 'Konum erişiminde bir problem yaşandı';
        });
    }

    // rastgele numara üretiyoruz id için

    // let randomNumber = Math.floor(Math.random() * Math.pow(10, 10));

    setTimeout(async () => {
      if (
        this.lat == undefined ||
        this.lat == null ||
        this.lat == 0 ||
        this.lng == undefined ||
        this.lng == null ||
        this.lng == 0
      ) {
        if (!this.locationNotAllowedBoolean) {
          this.error = 'Lütfen Konuma izin veriniz';
          this.getLocation();
          form.invalid;
          return;
        }
      }

      let randomNumber = this.editProduct.adNo;

      // // tarih alıyoruz
      // let today = new Date();
      // let date =
      //   today.getDate() +
      //   '.' +
      //   (today.getMonth() + 1) +
      //   '.' +
      //   today.getFullYear();

      //
      //resimleri yüklüyoruz

      const product = {
        id: this.editProduct.id,
        name: this.model.name,
        adImages: this.editProduct.adImages,
        adDescription: this.model.description,
        fullAddress: this.model.fullAddress,
        isActive: true,
        categoryId: this.model.categoryId,
        adDate: this.editProduct.adDate,
        adNo: randomNumber.toString(),
        userId: user.uid,
        priceFree: this.model.priceFree,
        latitude: this.lat.toString(),
        longitude: this.lng.toString(),
        phoneNo: this.phoneFormatted,
        city: this.model.adCityP,
        district: this.model.adDistrictP,
        quarter: this.model.adQuarterP,
      };
      if (form.valid) {
        this.loading = true;
        console.log(' form valid' + product);
        await this.productService.setEditProduct(product);

        this.router.navigate([`/myproducts`]);
        setTimeout(() => {
          window.location.reload();
          this.loading = false;
        }, 2000);

        // kayıt eklenince products a yönlendirecek beni
      } else {
        this.error = 'Formu kontrol ediniz!';
      }
    }, 1000);
  }
}
