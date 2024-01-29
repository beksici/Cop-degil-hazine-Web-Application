import { Component, OnInit } from '@angular/core';
import { CategoryRepository } from '../models/category.repository';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { Router } from '@angular/router';
import { VisibilityService } from '../services/visibility.service';

@Component({
  selector: 'category-nav',
  templateUrl: './category-nav.component.html',
  styleUrl: './category-nav.component.css',
  providers: [CategoryService],
})
export class CategoryNavComponent implements OnInit {
  //Tip tanımlaması yapıyoruz
  allCategoriesRep: CategoryRepository | any;
  allCategoriesUpName: any;
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
  selectedCategory: Category | null;
  isVisible$ = this.visibilityService.visibilityNav$;
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
  unVisibleNav() {
    this.visibilityService.setVisibilityNav(false);
    this.visibilityService.setVisibilityCategoryList(false);
    this.visibilityService.setVisibilityFilter(true);
  }
  // getBreadcrum: { upname: string };
  ngOnInit(): void {
    // this.categoryService.getCategories().subscribe((data) => {
    //   this.categories = data;
    //   // console.log(this.categories);
    // });
  }

  // selectCategory(selectedCategory: Category) {
  //   if (this.selectedCategory) this.selectedCategory = null;
  //   else this.selectedCategory = selectedCategory;
  // }
  displayAll = true;
  selectCategory(category?: Category) {
    if (category) {
      if (document.querySelector('.active')?.classList.contains('active'))
        document.querySelector('.active')?.classList.remove('active');
      this.selectedCategory = category;

      this.displayAll = false;
    } else {
      this.selectedCategory = null;
      this.displayAll = true;
    }
  }

  selectCategoryUp(upName: string) {
    // this.getBreadcrum = { ...this.getBreadcrum, upname: upName };
    this.categoryService.getCategoriesUp(upName).subscribe((data) => {
      if (data.length != 0) {
        this.categories = data;
        console.log(JSON.stringify(this.categories[0].id));

        let routeCat = '';
        for (let i in this.categories) {
          routeCat +=
            JSON.stringify(this.categories[i].id).replaceAll('"', '') + '~';
        }
        this.router.navigate(['/products/categories/' + routeCat]);
      } else {
        this.router.navigate(['/products/categories/noProducts']);
      }
    });
  }

  // dnone() {
  //   document.getElementById('categoryList')?.classList.add('d-none');
  //   document.getElementById('categoryList')?.classList.remove('d-block');
  //   document.getElementById('filter')?.classList.add('d-block');
  //   document.getElementById('filter')?.classList.remove('d-none');

  //   document.getElementById('category-nav')?.classList.add('d-none');
  // }
}
