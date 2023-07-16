import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ProductsService } from '../../../core/services/products.service';
import { MetamaskService } from '../../../core/services/metamask.service';
import { ButtonData, ProductResponse, Response } from '../../../core/interfaces';
import { BUTTON_SIZES, BUTTON_TYPES, MODAL_IDS } from '../../../core/enums';

@AutoUnsubscribe()
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnDestroy {
  private routerSubscription: Subscription;

  public buyButton: ButtonData = {
    text: 'Замовити доставку',
    size: BUTTON_SIZES.MEDIUM,
    type: BUTTON_TYPES.RED,
  };

  public connectWalletButton: ButtonData = {
    text: 'Підключити гаманець',
    size: BUTTON_SIZES.MEDIUM,
    type: BUTTON_TYPES.RED,
  };

  public switchChainButton: ButtonData = {
    text: 'Змінити чейн',
    size: BUTTON_SIZES.MEDIUM,
    type: BUTTON_TYPES.RED,
  };

  constructor(
    private router: ActivatedRoute,
    private ngxSmartModalService: NgxSmartModalService,
    public productsService: ProductsService,
    public metamaskService: MetamaskService
  ) {
    this.routerSubscription = this.router.params.subscribe({
      next: (params: Params) => {
        const productId = params['productId'];

        this.productsService.getProductById(productId).subscribe({
          next: (response: Response<ProductResponse>) => {
            this.productsService.activeProductPageData = response.data.product;
          },
        });
      },
    });
  }

  public buyProduct() {
    this.ngxSmartModalService.setModalData(
      {
        productId: this.productsService.activeProductPageData.id,
        productPriceBnb: this.productsService.activeProductPageData.priceBnb,
      },
      MODAL_IDS.BUY_PRODUCT
    );
    this.ngxSmartModalService.open(MODAL_IDS.BUY_PRODUCT);
  }

  public async connectWallet() {
    await this.metamaskService.connectWallet();
  }

  public async switchChain() {
    await this.metamaskService.switchChain();
  }

  ngOnDestroy() {
    this.productsService.activeProductPageData = null;
    // For AutoUnsubscribe decorator
  }
}
