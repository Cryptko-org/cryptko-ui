import { Component } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { MetamaskService } from './core/services/metamask.service';
import { CartService } from './core/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public loadingService: LoadingService,
    /** Do not delete this, just for init metamask service */
    private metamaskService: MetamaskService,
    private cartService: CartService
  ) {}
}
