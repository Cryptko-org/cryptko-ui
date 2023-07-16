import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetamaskService } from './metamask.service';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  constructor(private http: HttpClient, private metamaskService: MetamaskService) {}

  public buyProduct(productId: string, productPrice: number) {
    if (!this.metamaskService.walletData.isActiveChainIdCorrect) {
      console.log('Please, change chain to BSChain!');
      return;
    }

    this.metamaskService.sendTransaction(productPrice).then((txhash: string) => {
      if (!txhash) {
        console.log('Txhash is empty!');
        return;
      }

      this.buyProductRequest(productId, txhash).subscribe({
        next: (response) => {
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
    walletAddress: string = this.metamaskService.walletAddress
  ): Observable<any> {
    return this.http.post(`http://localhost:10000/api/user/${walletAddress}/buy`, {
      productId,
      txhash,
    });
  }
}
