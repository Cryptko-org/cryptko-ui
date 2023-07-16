import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { CityInfo, Department, NovaPoshtaResponse, Settlements } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class NovaPoshtaService {
  private readonly COUNT_DELIVERY_ADDRESSES: number = 50;
  private readonly NOVA_POSHTA_API_KEY: string = '2344a6f87ed19f2b6b7e2cb0a8ed1245';

  public deliveryAddresses$: BehaviorSubject<CityInfo[]> = new BehaviorSubject<CityInfo[]>([]);
  public deliveryDepartments$: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>(
    []
  );
  public deliveryCityRef: string = '';

  constructor(private http: HttpClient, private environmentService: EnvironmentService) {}

  public getDeliveryAddresses(cityName: string): void {
    this.getDeliveryAddressesRequest(cityName).subscribe({
      next: (response: NovaPoshtaResponse<CityInfo[]>) => {
        this.deliveryAddresses$.next(response.data);
      },
    });
  }

  /**
   *   Flow: we get first DeliveryCity from "getDeliveryCityIdRequest" and after that
   *   we get all departments from "getDeliveryDepartmentsRequest" by "DeliveryCity"
   *   write it to "deliveryDepartments$" observable. This is 1 way to get all
   *   departments in "NOVA POSHTA" API.
   */
  public getDeliveryDepartments(ZIPCode: string): void {
    this.getDeliveryCityIdRequest(ZIPCode).subscribe({
      next: (response: NovaPoshtaResponse<Settlements[]>) => {
        this.deliveryCityRef = response.data[0].Addresses[0].DeliveryCity;

        this.getDeliveryDepartmentsRequest(this.deliveryCityRef).subscribe({
          next: (response: NovaPoshtaResponse<Department[]>) => {
            this.deliveryDepartments$.next(response.data);
          },
        });
      },
    });
  }

  private getDeliveryAddressesRequest(
    cityName: string = ''
  ): Observable<NovaPoshtaResponse<CityInfo[]>> {
    return this.http.post<NovaPoshtaResponse<CityInfo[]>>(
      this.environmentService.environment.novaposhtaUrl,
      {
        apiKey: this.NOVA_POSHTA_API_KEY,
        modelName: 'Address',
        calledMethod: 'getSettlements',
        methodProperties: {
          FindByString: cityName,
          Page: '1',
          Limit: this.COUNT_DELIVERY_ADDRESSES,
        },
      }
    );
  }

  private getDeliveryDepartmentsRequest(
    cityRef: string
  ): Observable<NovaPoshtaResponse<Department[]>> {
    return this.http.post<NovaPoshtaResponse<Department[]>>(
      this.environmentService.environment.novaposhtaUrl,
      {
        apiKey: this.NOVA_POSHTA_API_KEY,
        modelName: 'Address',
        calledMethod: 'getWarehouses',
        methodProperties: {
          CityRef: cityRef,
        },
      }
    );
  }

  private getDeliveryCityIdRequest(ZIPCode: string): Observable<NovaPoshtaResponse<Settlements[]>> {
    return this.http.post<NovaPoshtaResponse<Settlements[]>>(
      this.environmentService.environment.novaposhtaUrl,
      {
        apiKey: this.NOVA_POSHTA_API_KEY,
        modelName: 'Address',
        calledMethod: 'searchSettlements',
        methodProperties: {
          CityName: ZIPCode,
          Limit: '1',
          Page: '1',
        },
      }
    );
  }
}
