import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryRepository } from '../models/category.repository';
import { CategoryService } from '../services/category.service';
import { getLocaleMonthNames } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { VisibilityService } from '../services/visibility.service';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
  providers: [CategoryService],
})
export class CategoryListComponent implements OnInit {
  //Tip tanımlaması yapıyoruz
  allCategoriesRep: CategoryRepository | any;

  allCategoriesUpName: any;
  cities: City[] = [];
  disricts: District[] = [];
  model: any = {
    // name: 'Iphone 25',
    city: '0',
    district: `0`,
  };

  //   { cam: 'Cam' },
  //   { plastik: 'Plastik' },
  //   { elektronik: 'Elektronik' },
  //   { ahşap: 'Ahşap' },
  //   { pil: 'Pil' },
  //   { tekstil: 'Tekstil' },
  //   { organic: 'Organik Atık' },
  //   { Diger: 'Diğer' },
  //
  categories: Category[];
  // categoryRepository: CategoryRepository;
  selectedCategory: Category | null | undefined;
  isVisibleCatgoryList$ = this.visibilityService.visibilityCategoryList$;
  isVisibleFilter$ = this.visibilityService.visibilityFilter$;
  isVisibleAdField$ = this.visibilityService.visibilityAdField$;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private visibilityService: VisibilityService
  ) {
    this.allCategoriesRep = new CategoryRepository();
    this.allCategoriesUpName = this.allCategoriesRep.getallCategoriesUpName();
    // this.categoryRepository = new CategoryRepository();
    // this.categories = this.categoryRepository.getCategories();
  }
  unVisibleCategoryList() {
    this.visibilityService.setVisibilityCategoryList(false);
    this.visibilityService.setVisibilityNav(false);
    this.visibilityService.setVisibilityFilter(true);
  }
  unVisibleFilter() {
    this.visibilityService.setVisibilityFilter(false);
    this.visibilityService.setVisibilityCategoryList(true);
    this.visibilityService.setVisibilityNav(true);
  }

  // setBreadCrum(categoryUpBread: string, categoryUpDown: string) {
  //   this.breadcrumbService.setBread(categoryUpBread, categoryUpDown);
  // }
  // getBreadcrum() {
  //   this.breadcrumbService.getBread();
  // }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });

    this.cities = this.getCities(this.cities);

    // console.log('cities');

    // console.log(this.cities);

    //YENİ EKLENDİ OG
  }

  // selectCategory(selectedCategory: Category) {
  //   if (this.selectedCategory) this.selectedCategory = null;
  //   else this.selectedCategory = selectedCategory;
  // }
  displayAll = true;
  selectCategory(category?: Category) {
    if (category) {
      this.selectedCategory = category;
      console.log(this.selectedCategory);

      if (document.querySelector('.active')?.classList.contains('active'))
        document.querySelector('.active')?.classList.remove('active');
      this.displayAll = false;
    } else {
      this.selectedCategory = null;
      this.displayAll = true;
    }
  }
  // dnone() {
  //   document.getElementById('categoryList')?.classList.add('d-none');
  //   document.getElementById('categoryList')?.classList.remove('d-block');
  //   document.getElementById('filter')?.classList.add('d-block');
  //   document.getElementById('filter')?.classList.remove('d-none');
  //   document.getElementById('category-nav')?.classList.remove('d-block');
  //   document.getElementById('category-nav')?.classList.add('d-none');
  // }
  // dblock() {
  //   document.getElementById('categoryList')?.classList.remove('d-none');
  //   document.getElementById('categoryList')?.classList.add('d-block');
  //   document.getElementById('filter')?.classList.remove('d-block');
  //   document.getElementById('filter')?.classList.add('d-none');

  //   document.getElementById('category-nav')?.classList.remove('d-none');
  // }

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
    document.getElementById('adDistrict')?.setAttribute('disabled', '');
    document.getElementById('adQuarter')?.setAttribute('disabled', '');
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
          document.getElementById('adDistrict')!.innerHTML = option;
          if (citySelectedObj) {
            document.getElementById('adDistrict')?.removeAttribute('disabled');
            citySelectedObj.towns.forEach(function (district: {
              name: string;
            }) {
              var option = document.createElement('option');
              option.text = district.name;
              option.value = district.name;
              // adDistrict.add(option);

              document.getElementById('adDistrict')?.appendChild(option);
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
      var adQuarter = document.getElementById('adQuarter');

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
            document.getElementById('adQuarter')!.innerHTML = option;

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
    if (citySelected.value != '0' && districtSelected.value != '0') {
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
    let route;

    if (localStorage.getItem('categoryId') != 'undefined') {
      route =
        '/products/categories/' +
        localStorage.getItem('categoryId') +
        '/' +
        citySelected.value +
        '/' +
        districtSelected.value +
        '/' +
        quarterselected.value +
        '/' +
        pricefree.checked +
        '/' +
        pricesale.checked +
        '/' +
        firstnew.checked +
        '/' +
        firstold.checked;
    } else if (
      this.selectedCategory == null ||
      this.selectedCategory == undefined
    ) {
      route =
        '/products/categories/' +
        'All' +
        '/' +
        citySelected.value +
        '/' +
        districtSelected.value +
        '/' +
        quarterselected.value +
        '/' +
        pricefree.checked +
        '/' +
        pricesale.checked +
        '/' +
        firstnew.checked +
        '/' +
        firstold.checked;
    } else {
      route =
        '/products/categories/' +
        this.selectedCategory.id +
        '/' +
        citySelected.value +
        '/' +
        districtSelected.value +
        '/' +
        quarterselected.value +
        '/' +
        pricefree.checked +
        '/' +
        pricesale.checked +
        '/' +
        firstnew.checked +
        '/' +
        firstold.checked;
    }
    localStorage.removeItem('categoryId');
    this.delete(
      citySelected,
      districtSelected,
      quarterselected,
      pricefree,
      pricesale,
      firstnew,
      firstold
    );
    // console.log('environment: ' + environment.categoryId);
    // environment.categoryId = '';
    this.router.navigate([route]);
  }

  delete(
    citySelected: any,
    districtSelected: any,
    quarterselected: any,
    pricefree: any,
    pricesale: any,
    firstnew: any,
    firstold: any
  ) {
    citySelected.value = '0';
    districtSelected.value = '0';
    quarterselected.value = '0';
    pricefree.checked = false;
    pricesale.checked = false;
    firstnew.checked = false;
    firstold.checked = false;
    this.selectedCategory = null;
    document.getElementById('adDistrict')?.setAttribute('disabled', '');
    document.getElementById('adQuarter')?.setAttribute('disabled', '');
    this.unVisibleFilter();
    this.model.city = '0';
  }
}

export interface City {
  name: string;
  alpha_2_code: string;
}
export interface District {
  name: string;
}
