import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css',
  providers: [CategoryService],
})
export class CategoryCreateComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  saveCategory(name: any | HTMLElement, upName: any | HTMLElement) {
    this.categoryService
      .createCategory({ id: 0, name: name.value, upName: upName.value })
      .subscribe((data) => {
        this.router.navigate(['/products']);
      });
  }
}
