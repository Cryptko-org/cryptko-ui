import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  FilterData,
  Filters,
  Pagination,
  Product,
  ProductResponse,
  ProductsResponse,
  Response,
  SortOption,
} from '../interfaces';
import { MEMORY_ID, PHONES_ID, PRODUCT_FILTERS, PRODUCTS_SORTS, STATUS_ID } from '../enums';
import { EnvironmentService } from './environment.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public activeProductPageData: Product;
  public products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public sort$: BehaviorSubject<SortOption[]> = new BehaviorSubject<SortOption[]>([]);

  public filters: Filters = {
    [PRODUCT_FILTERS.MODEL]: new BehaviorSubject<FilterData[]>([]),
    [PRODUCT_FILTERS.MEMORY]: new BehaviorSubject<FilterData[]>([]),
    [PRODUCT_FILTERS.STATUS]: new BehaviorSubject<FilterData[]>([]),
  };

  public pagination: Pagination;

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService,
    private router: Router
  ) {
    this.initFilters();
    this.initSorts();
    this.updateProducts();

    const ws = new WebSocket('ws://localhost:10001/', 'protocolOne');

    ws.onopen = (data) => {
      console.log('WebSocket opened successfully! Data:', data);
    };

    ws.onmessage = (event) => {
      if (JSON.parse(event.data) === 'UPDATE_PRODUCTS') {
        if (this.router.url.includes('product')) {
          this.getProductById(this.activeProductPageData.id).subscribe({
            next: (response: Response<ProductResponse>) => {
              this.activeProductPageData = response.data.product;
            },
          });
        } else {
          this.updateProducts();
        }
        console.log('UPDATE_PRODUCTS');
      }
    };
  }

  public setFilter(key: PRODUCT_FILTERS, filters: FilterData[]): Subscription {
    this.filters[key].next(filters);
    return this.updateProducts();
  }

  public set activeSortOptionByValue(newActiveSortOptionValue: string) {
    const sortOptions: SortOption[] = this.sort$.getValue();

    const updatedOptions: SortOption[] = sortOptions.map((option: SortOption) => {
      option.isSelected = newActiveSortOptionValue === option.value;
      return option;
    });

    this.sort$.next(updatedOptions);
    this.updateProducts();
  }

  public updateProducts(
    page: number = 1,
    count: number = 15,
    models: string[] = this.getActiveFilters(this.filters.model$.getValue()),
    memory: string[] = this.getActiveFilters(this.filters.memory$.getValue()),
    isUsed: string[] = this.getActiveFilters(this.filters.status$.getValue()),
    sortBy: string = this.activeSortOptionValue,
    isInStock: boolean | null = null
  ): Subscription {
    return this.getProducts(page, count, models, memory, isUsed, sortBy, isInStock).subscribe({
      next: (response: Response<ProductsResponse>) => {
        this.pagination = response.data.pagination;
        this.products$.next(response.data.products);
        console.log('Products updated!');
      },
    });
  }

  public getProductById(
    productId: string = this.activeProductPageData.id
  ): Observable<Response<ProductResponse>> {
    return this.http.get<Response<ProductResponse>>(
      `${this.environmentService.environment.apiUrl}/products/${productId}`
    );
  }

  private getActiveFilters(filters: FilterData[]): string[] {
    return filters
      .filter((filter: FilterData) => filter.isChecked)
      .map((filter: FilterData) => filter.value);
  }

  private get activeSortOptionValue() {
    const sortOptions: SortOption[] = this.sort$.getValue();
    return sortOptions.find((sortOption: SortOption) => sortOption.isSelected).value;
  }

  private getProducts(
    page: number = 1,
    count: number = 15,
    models: string[] = this.getActiveFilters(this.filters.model$.getValue()),
    memory: string[] = this.getActiveFilters(this.filters.memory$.getValue()),
    isUsed: string[] = this.getActiveFilters(this.filters.status$.getValue()),
    sortBy: string = this.activeSortOptionValue,
    isInStock: boolean | null = null
  ): Observable<Response<ProductsResponse>> {
    return this.http.get<Response<ProductsResponse>>(
      `${this.environmentService.environment.apiUrl}/products/get-products`,
      {
        params: {
          page,
          count,
          modelIds: models?.join(','),
          memoryIds: memory?.join(','),
          sortBy,
          isInStock,
          isUsed: isUsed?.join(','),
        },
      }
    );
  }

  private initFilters() {
    this.initFilterData(PRODUCT_FILTERS.MODEL, PHONES_ID);
    this.initFilterData(PRODUCT_FILTERS.MEMORY, MEMORY_ID);
    this.initFilterData(PRODUCT_FILTERS.STATUS, STATUS_ID);
  }

  private initFilterData(key: PRODUCT_FILTERS, valuesEnum: any) {
    const initedFilters: FilterData[] = Object.entries(valuesEnum).map(([value, name]: any) => ({
      name: name,
      value: value,
      isChecked: false,
    }));

    this.filters[key].next(initedFilters);
  }

  private initSorts() {
    this.initSortData(PRODUCTS_SORTS);
  }

  private initSortData(valuesEnum: any) {
    const initedSorts: SortOption[] = Object.entries(valuesEnum).map(([value, name]: any) => ({
      name: name,
      value: value,
      isSelected: false,
    }));

    initedSorts[0].isSelected = true;

    this.sort$.next(initedSorts);
  }
}
