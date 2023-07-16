import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { NovaPoshtaService } from '../../../core/services/nova-poshta.service';
import { MarketService } from '../../../core/services/market.service';
import { ButtonData, CityInfo, Department } from '../../../core/interfaces';
import { BUTTON_SIZES, BUTTON_TYPES, MODAL_IDS } from '../../../core/enums';
import { MetamaskService } from '../../../core/services/metamask.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-buy-product-modal',
  templateUrl: './buy-product-modal.component.html',
  styleUrls: ['./buy-product-modal.component.scss'],
})
export class BuyProductModalComponent implements OnDestroy {
  private deliveryAddressesSubscription: Subscription;
  private deliveryDepartmentsSubscription: Subscription;
  private valueChangesSubscription: Subscription;

  public deliveryAddresses: CityInfo[];
  public deliveryDepartments: Department[];

  public buyForm: FormGroup;

  public buttonData: ButtonData = {
    text: 'Купити',
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
    private marketService: MarketService,
    private novaPoshtaService: NovaPoshtaService,
    private ngxSmartModalService: NgxSmartModalService,
    public metamaskService: MetamaskService
  ) {
    this.buyForm = new FormGroup<any>({
      fullName: new FormControl('', [Validators.required, Validators.min(2)]),
      phoneNumber: new FormControl('', [Validators.required]),
      deliveryZIP: new FormControl('', [Validators.required]),
      deliveryWarehouseId: new FormControl('', [Validators.required]),
    });

    this.detectDeliveryZIPChanges();

    this.deliveryAddressesSubscription = this.novaPoshtaService.deliveryAddresses$.subscribe({
      next: (deliveryAddresses: CityInfo[]) => {
        this.deliveryAddresses = deliveryAddresses;
      },
    });

    this.deliveryDepartmentsSubscription = this.novaPoshtaService.deliveryDepartments$.subscribe({
      next: (deliveryDepartments: Department[]) => {
        this.deliveryDepartments = deliveryDepartments;
      },
    });

    this.novaPoshtaService.getDeliveryAddresses('');
  }
  public async connectWallet() {
    await this.metamaskService.connectWallet();
  }

  public async switchChain() {
    await this.metamaskService.switchChain();
  }

  public buyProduct() {
    if (this.buyForm.invalid) {
      console.log('Buy form invalid!');
      return;
    }
    const { productId, productPriceBnb } = this.ngxSmartModalService.getModalData(
      MODAL_IDS.BUY_PRODUCT
    );
    this.marketService.buyProduct(productId, productPriceBnb);
  }

  /**
   *   Flow: "getDeliveryAddresses" calls when list was close and any item not selected
   *   event returns "undefined". If event is "close" and "deliveryAddress" not selected
   *   return all addresses
   */
  public getDeliveryAddresses(event: { term: string; items: any[] } | undefined) {
    if (event == null && this.buyForm.get('deliveryZIP')?.value == null) {
      this.novaPoshtaService.getDeliveryAddresses('');
    }

    if (event?.term) {
      this.novaPoshtaService.getDeliveryAddresses(event?.term);
    }
  }

  private detectDeliveryZIPChanges() {
    this.valueChangesSubscription = this.buyForm.controls['deliveryZIP'].valueChanges.subscribe({
      next: (deliveryAddress) => {
        this.novaPoshtaService.deliveryDepartments$.next([]);

        if (deliveryAddress) {
          this.novaPoshtaService.getDeliveryDepartments(deliveryAddress);
        } else {
          this.novaPoshtaService.getDeliveryAddresses('');
        }

        this.buyForm.get('deliveryWarehouseId')?.reset();
      },
    });
  }

  ngOnDestroy() {
    // For AutoUnsubscribe decorator
  }
}
