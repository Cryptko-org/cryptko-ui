import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ProductsService } from '../../../core/services/products.service';
import { ButtonData } from '../../../core/interfaces';
import { BUTTON_SIZES, BUTTON_TYPES } from '../../../core/enums';

@AutoUnsubscribe()
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnDestroy {
  private updateProductsSubscription: Subscription;

  public reviewButton: ButtonData = {
    text: 'Переглянути',
    type: BUTTON_TYPES.GRAY,
    size: BUTTON_SIZES.WIDE,
  };

  constructor(public productsService: ProductsService) {}

  public onPageChange(page) {
    this.scrollToMarketTop();
    this.updateProductsSubscription = this.productsService.updateProducts(page);
  }

  private scrollToMarketTop() {
    document.getElementById('market').scrollIntoView();
  }

  ngOnDestroy() {
    // For AutoUnsubscribe decorator
  }
}
