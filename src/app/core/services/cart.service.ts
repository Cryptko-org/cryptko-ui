import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MetamaskService } from './metamask.service';
import { Order, OrdersResponse, Response } from '../interfaces';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  orders$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

  constructor(
    private http: HttpClient,
    private metamaskService: MetamaskService,
    private environmentService: EnvironmentService
  ) {
    this.metamaskService.walletData.address$.subscribe({
      next: (address: string) => {
        console.log(address);
        if (!address) {
          this.orders$.next([]);
          return;
        }

        this.updateOrders(address);
      },
    });
  }

  private updateOrders(address: string = this.metamaskService.walletAddress): Subscription {
    return this.getOrdersByWalletAddress(address).subscribe({
      next: (response: Response<OrdersResponse>) => {
        this.orders$.next(response.data.orders);
      },
    });
  }

  private getOrdersByWalletAddress(
    walletAddress: string = this.metamaskService.walletAddress
  ): Observable<Response<OrdersResponse>> {
    return this.http.get<Response<OrdersResponse>>(
      `${this.environmentService.environment.apiUrl}/user/${walletAddress}/orders`
    );
  }
}
