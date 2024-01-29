import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AuthenticationService } from '../services/authentication.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { City, District } from '../category-list/category-list.component';
import { ObjectDetectionRepository } from '../models/object-detection-repository';
import { NgForm } from '@angular/forms';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { ImageUploadService } from '../services/image-upload.service';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrl: './company-create.component.css',
})
export class CompanyCreateComponent implements OnInit {
  user$ = this.authService.currentUser$;
  Editor = ClassicEditor;
  fileList: FileList;
  error: string = '';
  cities: City[] = [];
  disricts: District[] = [];
  selectedImage: HTMLImageElement;
  disabled: boolean = true;
  continue: boolean = false;
  guess: string | null = '';
  allItemsObjectRep: ObjectDetectionRepository;
  recognizedText: string | null = null;
  locationNotAllowed: number = 0;
  phoneFormatted: string = '';
  model: any = {
    // name: 'Iphone 25',
    categoryId: '0',
    adCityP: '0',
    adDistrictP: `0`,
  }; // template driven forms
  constructor(
    private productService: ProductService,
    private authService: AuthenticationService,
    private router: Router,
    private imageUploadService: ImageUploadService
  ) {}
  ngOnInit(): void {
    this.cities = this.getCities(this.cities);
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
    const formattedInputValue = this.formatPhoneNumber(phoneNo?.value);
    console.log(formattedInputValue);

    this.phoneFormatted = formattedInputValue;
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

  async setFileList(event: any) {
    this.fileList = event.target.files;
  }

  async saveProduct(form: NgForm, user: User) {
    const extensions = ['jpeg', 'jpg', 'png'];
    const extension = this.model.imageUrl.split('.').pop(); //sonuncu parça alınır 1.jpg [1] [jpg]
    if (extensions.indexOf(extension) == -1) {
      this.error = 'Resim uzantısı sadece jpeg , jpg , png olmalıdır';
      return;
    }

    console.log(
      this.model.adCityP + this.model.adDistrictP + this.model.adQuarterP
    );

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
    }

    setTimeout(() => {
      // rastgele numara üretiyoruz id için

      // let randomNumber = Math.floor(Math.random() * Math.pow(10, 10));
      let randomNumber = this.generateRandomNumber(10);

      //
      //resimleri yüklüyoruz
      this.imageUploadService.uploadImages(
        this.fileList,
        'images/' + randomNumber + '/'
      );

      const company = {
        id: 1,
        name: this.model.name,
        adImages: this.fileList.length.toString(),
        adDescription: this.model.description,
        fullAddress: this.model.fullAddress,
        isActive: true,
        adNo: randomNumber.toString(),
        userId: user.uid,
        phoneNo: this.phoneFormatted,
        city: this.model.adCityP,
        district: this.model.adDistrictP,
        quarter: this.model.adQuarterP,
      };
      if (form.valid) {
        console.log(' form valid' + company);

        this.productService.createCompany(company).subscribe((data) => {
          this.router.navigate([`/products`]); //şimdilik buraya
        });
      } else {
        this.error = 'Formu kontrol ediniz!';
      }
    }, 1000);
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
}
