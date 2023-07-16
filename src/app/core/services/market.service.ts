import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MetamaskService } from './metamask.service';
import { EnvironmentService } from './environment.service';
import { CustomerInfo } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  constructor(
    private http: HttpClient,
    private metamaskService: MetamaskService,
    private toastrService: ToastrService,
    private environmentService: EnvironmentService
  ) {}

  public buyProduct(productId: string, productPrice: number, customerInfo: CustomerInfo) {
    if (!this.metamaskService.walletData.isActiveChainIdCorrect) {
      console.log('Please, change chain to BSChain!');
      return;
    }

    this.metamaskService.sendTransaction(productPrice).then((txhash: string) => {
      if (!txhash) {
        this.toastrService.error('Щось пішло не так під час покупки товару =(');
        console.log('Txhash is empty!');
        return;
      }

      this.buyProductRequest(productId, txhash, customerInfo).subscribe({
        next: (response) => {
          this.toastrService.success('Заказ отримано! Очікуйте на його підтвердження!');
          console.log(
            'Order success! Wait when we confirm your transaction! Response data:',
            response
          );
        },
      });
    });
  }

  private buyProductRequest(
    productId: string,
    txhash: string,
    customerInfo: any,
    walletAddress: string = this.metamaskService.walletAddress
  ): Observable<any> {
    return this.http.post(
      `${this.environmentService.environment.apiUrl}/user/${walletAddress}/buy`,
      {
        productId,
        txhash,
        customerInfo,
      }
    );
  }
}
