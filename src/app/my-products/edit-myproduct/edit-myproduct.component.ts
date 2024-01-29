import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'edit-myproduct',
  templateUrl: './edit-myproduct.component.html',
  styleUrl: './edit-myproduct.component.css',
})
export class EditMyproductComponent {
  @Input() editProduct: Product;
}
