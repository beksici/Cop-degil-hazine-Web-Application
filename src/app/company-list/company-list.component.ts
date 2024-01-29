import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AuthenticationService } from '../services/authentication.service';
import { ImageUploadService } from '../services/image-upload.service';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { City, District } from '../category-list/category-list.component';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css',
})
export class CompanyListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    public authService: AuthenticationService,
    private imageUploadService: ImageUploadService,
    private router: Router
  ) {}

  companies: Company[] = [];
  loading: boolean = true;
  cities: City[] = [];
  disricts: District[] = [];
  model: any = {
    adCityC: '0',
    adDistrictC: `0`,
  };
  ngOnInit(): void {
    this.showCompanyList();
    this.cities = this.getCities(this.cities);
  }

  showCompanyList() {
    this.productService.getCompanies().subscribe((data) => {
      console.log(data);
      this.companies = data;
      for (let company of this.companies) {
        this.getProductImage0(company.adNo);
      }

      this.loading = false;
    });
  }

  getProductImage0(adNo: string) {
    this.imageUploadService.getImages('images/' + adNo + '/0', adNo);
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
    this.loading = true;
    console.log('updateDistrict :' + citySelected.value);

    if (citySelected.value != '0') {
      console.log(citySelected.value);
      fetch('/assets/data.json')
        .then((response) => response.json())
        .then((data) => {
          var citySelectedObj = data.find(function (city: { name: any }) {
            return city.name === citySelected.value;
          });
          var option =
            '<option value="0" selected>Lütfen ilçe seçiniz</option>';
          document.getElementById('adDistrictC')!.innerHTML = option;
          if (citySelectedObj) {
            document.getElementById('adDistrictC')?.removeAttribute('disabled');
            citySelectedObj.towns.forEach(function (district: {
              name: string;
            }) {
              var option = document.createElement('option');
              option.text = district.name;
              option.value = district.name;
              // adDistrict.add(option);

              document.getElementById('adDistrictC')?.appendChild(option);
              console.log(document.getElementById('adDistrictC')?.lastChild);
            });

            this.productService
              .getCompanyFiltered(citySelected.value)
              .subscribe((data) => {
                this.companies = data;
                console.log(this.companies);

                for (let company of this.companies) {
                  this.getProductImage0(company.adNo);
                }

                this.loading = false;
              });
          }

          // İlk ilçe seçildiğinde mahalleleri yükle
          // var districtSelected = adDistrict.value;
          // updateQuarter(districtSelected);
        });
    } else {
      this.loading = false;
    }
  }

  updateQuarter(citySelected: any, districtSelected: any) {
    if (citySelected.value != '0' && districtSelected.value != '0') {
      console.log(districtSelected.value);

      this.loading = true;
      // var adQuarter = document.getElementById('adQuarterC');

      // adQuarter!.innerHTML = '';
      this.productService
        .getCompanyFilteredWithDistrict(
          citySelected.value,
          districtSelected.value
        )
        .subscribe((data) => {
          this.companies = data;

          for (let company of this.companies) {
            this.getProductImage0(company.adNo);
          }
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }
  clearNotActiveCompanies(): boolean {
    this.companies = this.companies.filter((c) => c.isActive == true);
    return true;
  }
  deleteCompany(company: Company) {
    this.loading = true;
    if (confirm('Bu şirketi kaldırmak istediğinizden emin misiniz?')) {
      this.productService.setCompanyIsActive(company);
      setTimeout(() => {
        this.showCompanyList();
      }, 1000);
    } else {
      this.showCompanyList();
    }
  }
}
