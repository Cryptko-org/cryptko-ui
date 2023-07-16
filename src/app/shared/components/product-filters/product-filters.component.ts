import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FilterData } from '../../../core/interfaces';
import { ProductsService } from '../../../core/services/products.service';
import { PRODUCT_FILTERS } from '../../../core/enums';

@AutoUnsubscribe()
@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
})
export class ProductFiltersComponent implements OnDestroy {
  private debounceTimer: ReturnType<typeof setTimeout>;
  private DEBOUNCE_TIME: number = 1000 * 1.5; // debounce 1.5 seconds
  private setFilterSubscription: Subscription;

  constructor(public productsService: ProductsService) {}

  // for HTML template
  public get productFilters() {
    return PRODUCT_FILTERS;
  }

  public changeFilters(key: PRODUCT_FILTERS, filters: FilterData[]) {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.setFilterSubscription = this.productsService.setFilter(key, filters);
    }, this.DEBOUNCE_TIME);
  }

  ngOnDestroy() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }
}
