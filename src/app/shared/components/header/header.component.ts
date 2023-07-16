import { Component } from '@angular/core';
import { MetamaskService } from '../../../core/services/metamask.service';
import { ButtonData } from '../../../core/interfaces';
import { BUTTON_SIZES, BUTTON_TYPES } from '../../../core/enums';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public connectWalletButton: ButtonData = {
    text: 'Підключити гаманець',
    size: BUTTON_SIZES.SMALL,
    type: BUTTON_TYPES.BLACK_BORDER_TRANSPARENT,
  };

  public switchChainButton: ButtonData = {
    text: 'Змінити чейн',
    size: BUTTON_SIZES.SMALL,
    type: BUTTON_TYPES.BLACK_BORDER_TRANSPARENT,
  };

  constructor(public metamaskService: MetamaskService, public cartService: CartService) {}

  public async connectWallet() {
    await this.metamaskService.connectWallet();
  }

  public async switchChain() {
    await this.metamaskService.switchChain();
  }
}
