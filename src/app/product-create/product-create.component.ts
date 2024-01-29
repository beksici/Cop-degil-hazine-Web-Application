import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { NgForm } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GeolocationService } from '../services/geolocation.service';
import { City, District } from '../category-list/category-list.component';
import { AuthenticationService } from '../services/authentication.service';
import { ImageUploadService } from '../services/image-upload.service';
import { User } from '@angular/fire/auth';
import { ObjectDetectionService } from '../services/object-detection.service';
import { ObjectDetectionRepository } from '../models/object-detection-repository';
import Tesseract from 'tesseract.js';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
  providers: [CategoryService],
})
export class ProductCreateComponent implements OnInit {
  user$ = this.authService.currentUser$;
  Editor = ClassicEditor;
  imagesString: string[] = [];
  lat: number;
  lng: number;

  fileList: FileList;
  categories: Category[] = [];
  error: string = '';
  cities: City[] = [];
  disricts: District[] = [];
  selectedImage: HTMLImageElement;
  disabled: boolean = true;
  continue: boolean = false;
  adressLocation: any[];
  guess: string | null = '';
  allItemsObjectRep: ObjectDetectionRepository;
  recognizedText: string | null = null;
  locationNotAllowed: number = 0;
  locationNotAllowedBoolean: boolean = false;
  phoneFormatted: string = '';
  model: any = {
    // name: 'Iphone 25',
    categoryId: '0',
    adCityP: '0',
    adDistrictP: `0`,
  }; // template driven forms
  //two way bindin yani ben form içinde direk değişiklik yaptığımda model modelde değişiklik yaptığımda form etkilenicek
  //ngModel = > control
  //ngForm => form  kontrolleri kapsayan kontrol
  //valid -invalid form içerisinde tüm istenilenleri sağladıysa valid olur sağlamdıysa invalid tek tek kontroller içinde geçerli bu durum bir tane elemanı formun invalid ise form da invalid olur
  //pristine-dirty formdaki herhangi bir elemana dokunup bir şey değiştirdiysem dirty olur değiştirmediysem pristine
  //touched-untouched forma dokunulduğunda touched olur dokunulmazsa untouched başta untocuheddir
  //styles.css de bu classlar kullanılıyor bak
  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private geolocationService: GeolocationService,
    private authService: AuthenticationService,
    private imageUploadService: ImageUploadService,
    private objectDetectionService: ObjectDetectionService
  ) {
    this.allItemsObjectRep = new ObjectDetectionRepository();
  }
  ngOnInit(): void {
    // this.objectDetectionService.loadModel();
    this.locationNotAllowed = 0;
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
    this.cities = this.getCities(this.cities);
    this.getLocation();
    console.log(this.locationNotAllowed);
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
        console.log('engelledi');

        this.error = 'Lütfen Konum Erişimine İzin Verin';
        this.locationNotAllowed++;
        console.log(this.locationNotAllowed);

        if (this.locationNotAllowed == 2) {
          this.locationNotAllowedBoolean = true;
          return;
        } else {
          this.getLocation();
          return;
        }

        // console.error('Error getting geolocation:', error);
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

  // saveProduct(
  //   name: any,
  //   price: any,
  //   imageUrl: any,
  //   description: any,
  //   isActive: any,
  //   categoryId: any
  // ) {
  //   //console.log(name.value);
  //   if (name.value == '' || name.value.lenght < 5) {
  //     this.error = 'Ürün ismi en az 5 karakter olmalıdır';

  //     return;
  //   }
  //   if (price.value == '') {
  //     this.error = 'Ürün fiyatını giriniz';
  //     return;
  //   }
  //   if (imageUrl.value == '') {
  //     this.error = 'Resim ismi giriniz';
  //     return;
  //   }
  //   const extensions = ['jpeg', 'jpg', 'png'];
  //   const extension = imageUrl.value.split('.').pop(); //sonuncu parça alınır 1.jpg [1] [jpg]
  //   if (extensions.indexOf(extension) == -1) {
  //     this.error = 'Resim uzantısı sadece jpeg , jpg , png olmalıdır';
  //     return;
  //   }
  //   if (categoryId.value == '0') {
  //     this.error = 'Categori seçmelisiniz';
  //     return;
  //   }

  //   const product = {
  //     id: 1,
  //     name: name.value,
  //     price: price.value,
  //     imageUrl: imageUrl.value,
  //     description: description.value,
  //     isActive: isActive.checked,
  //     categoryId: categoryId.value,
  //   };
  //   this.productService.createProduct(product).subscribe((data) => {
  //     this.router.navigate([`/products`]);
  //   });
  //   // kayıt eklenince products a yönlendirecek beni
  // }

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

  private readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  private async extractTextFromImage(imageUrl: string): Promise<string> {
    try {
      const { data } = await Tesseract.recognize(imageUrl, 'tur+eng', {
        logger: (info) => {
          // OCR işlemi tamamlandığında elde edilen toplu metin
          //  console.log(info);
          // console.log(info.progress);
        },
      });
      //  console.log(data);
      let counter = 0;
      data.text = '';
      for (let word of data.words) {
        //   console.log(word.confidence);
        if (word.confidence > 93) {
          data.text += word.text + ' ';
          counter++;
          if (counter == 6) {
            counter = 0;
            data.text += '\n';
          }
        }
      }
      console.log(data.text);
      const regex = /[<>~|[\]{}&^$]/g;
      data.text = data.text.replace(regex, '');
      //  console.log(data.text.length);

      if (data && data.text) {
        return data.text;
      } else {
        console.error('No text found.');
        return '';
      }
    } catch (error: any) {
      console.error('Error extracting text:', error.message);
      return '';
    }
  }

  async setFileList(event: any) {
    this.fileList = event.target.files;
    const file = this.fileList[0];
    console.log(file);
    if (file) {
      this.continue = true;
      const imageUrl = URL.createObjectURL(file);
      const imageUrlRecognize = await this.readFileAsDataURL(file);
      this.selectedImage = new Image();
      this.selectedImage.src = imageUrl;
      console.log(this.selectedImage.src);
      setTimeout(async () => {
        await this.objectDetectionService.loadModel().then(async () => {
          let predictions = await this.objectDetectionService.detectObjects();
          console.log(predictions);
          if (predictions[0] != undefined) {
            let result = predictions[0].className;

            if (result.includes(',')) {
              var partsOfResult = result
                .split(',')
                .map(function (item: string) {
                  return item.trim();
                });
              for (let i = 0; i < partsOfResult.length; i++) {
                if (this.checkWordInAllCategories(partsOfResult[i])) {
                  console.log(localStorage.getItem('categorythis.guessed'));
                  break;
                }
                if (i + 1 == partsOfResult.length) {
                  console.log('Category::Other');
                }
              }
            } else {
              this.checkWordInAllCategories(result);
              console.log(
                'Category::' + localStorage.getItem('categorythis.guessed')
              );
            }
            this.guess = localStorage.getItem('categorythis.guessed');

            if (this.guess == 'iron') {
              this.guess = 'Demir';
            } else if (this.guess == 'steel') {
              this.guess = 'Çelik';
            } else if (this.guess == 'copper') {
              this.guess = 'Bakır';
            } else if (this.guess == 'aluminum') {
              this.guess = 'Alüminyum';
            } else if (this.guess == 'tin') {
              this.guess = 'Kalay';
            } else if (this.guess == 'tin_can') {
              this.guess = 'Teneke & Konserve';
            } else if (this.guess == 'cable') {
              this.guess = 'Kablo';
            } else if (this.guess == 'zink') {
              this.guess = 'Çinko';
            } else if (this.guess == 'lead') {
              this.guess = 'Kurşun';
            } else if (this.guess == 'chrome') {
              this.guess = 'Krom';
            } else if (this.guess == 'book_magazine_newspaper') {
              this.guess = 'Kitap & Dergi & Gazete';
            } else if (this.guess == 'pasteBoard') {
              this.guess = 'Karton';
            } else if (this.guess == 'drink') {
              this.guess = 'İçecek';
            } else if (this.guess == 'mirror_window') {
              this.guess = 'Ayna & Pencere';
            } else if (this.guess == 'pet_carboy') {
              this.guess = 'Pet Şişe & Damacana';
            } else if (this.guess == 'nylon') {
              this.guess = 'Naylon';
            } else if (this.guess == 'car_tire') {
              this.guess = 'Araç Lastik';
            } else if (this.guess == 'toy') {
              this.guess = 'Oyuncak';
            } else if (this.guess == 'organicWasteItems') {
              this.guess = 'Bitkisel Yağ';
            } else if (this.guess == 'woodenHomeItems') {
              this.guess = 'Mobilya';
            } else if (this.guess == 'wardrobeAndDresserItems') {
              this.guess = 'Dolap';
            } else if (this.guess == 'woodDust') {
              this.guess = 'Talaş';
            } else if (this.guess == 'palette') {
              this.guess = 'Palet & Kasa';
            } else if (this.guess == 'powerSources') {
              this.guess = 'Akü';
            } else if (this.guess == 'compositeProducts') {
              this.guess = 'Ambalaj';
            } else if (this.guess == 'whiteGoodsCategory') {
              this.guess = 'Beyaz Eşya';
            } else if (this.guess == 'machineEquipment') {
              this.guess = 'Makine & Ekipman';
            } else if (this.guess == 'chromeNickelElectronic') {
              this.guess = 'Elektronik Kart';
            } else if (this.guess == 'computerTabletPhone') {
              this.guess = 'Tv & Bilgisayar & Tablet & Telefon';
            } else if (this.guess == 'smallHomeAppliances') {
              this.guess = 'Elektronik ev eşyası';
            } else if (this.guess == 'otherElectronicAppliances') {
              this.guess = 'Diğer Elektronik Aletler';
            } else if (this.guess == 'clothes') {
              this.guess = 'Kıyafet';
            } else if (this.guess == 'houseware') {
              this.guess = 'Tekstil Ev Eşyası(Halı Perde Nevresim)';
            } else {
              this.guess = 'Diğer';
            }

            for (let category of this.categories) {
              if (category.name.trim() == this.guess) {
                this.model.categoryId = category.id;
                break;
              }
            }

            this.disabled = false;
            this.continue = false;
          }
          console.log(predictions);
        });
      }, 2000);

      this.recognizedText = await this.extractTextFromImage(imageUrlRecognize);
      this.model.description = this.recognizedText;
      // await this.objectDetectionService.loadModel();
      // const predictions = await this.objectDetectionService.detectObjects(
      //   this.selectedImage
      // );

      // console.log(predictions);
    }
  }

  checkWordInAllCategories(wordToCheck: any) {
    for (var categoryName in this.allItemsObjectRep.allItems) {
      var categoryArray = this.allItemsObjectRep.allItems[categoryName];
      if (categoryArray && categoryArray.includes(wordToCheck)) {
        console.log(
          `"${wordToCheck}" kelimesi "${categoryName}" kategorisinde bulunuyor.`
        );
        localStorage.setItem('categorythis.guessed', categoryName);
        return true;
      }
    }
    localStorage.setItem('categorythis.guessed', 'Diğer');
    return false;
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
    console.log(this.model.name);
    console.log(this.model.imageUrl);

    const extensions = ['jpeg', 'jpg', 'png'];
    const extension = this.model.imageUrl.split('.').pop(); //sonuncu parça alınır 1.jpg [1] [jpg]
    if (extensions.indexOf(extension) == -1) {
      this.error = 'Resim uzantısı sadece jpeg , jpg , png olmalıdır';
      return;
    }

    if (this.model.categoryId == '0') {
      this.error = 'Categori seçmelisiniz';
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
    } else {
      let adress =
        this.model.adQuarterP +
        ' ' +
        this.model.adDistrictP +
        ' ' +
        this.model.adCityP;
      console.log(adress);

      let location = this.geolocationService.getCoordinates(adress);
      console.log('loc:' + location);

      location
        .then((result: any[]) => {
          console.log('result: ' + result);
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
          this.locationNotAllowed = 0;
        });
    }

    setTimeout(() => {
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

      // rastgele numara üretiyoruz id için

      // let randomNumber = Math.floor(Math.random() * Math.pow(10, 10));
      let randomNumber = this.generateRandomNumber(10);

      // tarih alıyoruz
      let today = new Date();
      let date =
        today.getDate() +
        '.' +
        (today.getMonth() + 1) +
        '.' +
        today.getFullYear();

      //
      //resimleri yüklüyoruz
      this.imageUploadService.uploadImages(
        this.fileList,
        'images/' + randomNumber + '/'
      );

      const product = {
        id: 1,
        name: this.model.name,
        price: this.model.price,
        adImages: this.fileList.length.toString(),
        adDescription: this.model.description,
        fullAddress: this.model.fullAddress,
        isActive: true,
        categoryId: this.model.categoryId,
        adDate: date,
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
        console.log(' form valid' + product);

        this.productService.createProduct(product).subscribe((data) => {
          this.router.navigate([`/products`]);
        });
        // kayıt eklenince products a yönlendirecek beni
      } else {
        this.error = 'Formu kontrol ediniz!';
      }
    }, 1000);
  }
}
