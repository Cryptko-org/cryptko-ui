import { Component } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-product-sorts',
  templateUrl: './product-sorts.component.html',
  styleUrls: ['./product-sorts.component.scss'],
})
export class ProductSortsComponent {
  constructor(public productsService: ProductsService) {}

  public onOptionChange(optionValue: string) {
    this.productsService.activeSortOptionByValue = optionValue;
  }
}
