import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { BannerComponent } from './shared/components/banner/banner.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { ProductFiltersComponent } from './shared/components/product-filters/product-filters.component';
import { FilterComponent } from './shared/components/product-filters/filter/filter.component';
import { ProductSortsComponent } from './shared/components/product-sorts/product-sorts.component';
import { SortComponent } from './shared/components/product-sorts/sort/sort.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { ProductPageComponent } from './shared/pages/product-page/product-page.component';
import { BuyProductModalComponent } from './shared/modals/buy-product-modal/buy-product-modal.component';
import { ClickOutsideDirective } from './core/directives/click-outside.directive';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TOAST_CONFIG, ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    BannerComponent,
    HomePageComponent,
    FooterComponent,
    ButtonComponent,
    ProductFiltersComponent,
    FilterComponent,
    ProductSortsComponent,
    SortComponent,
    ClickOutsideDirective,
    ProductPageComponent,
    BuyProductModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgxSmartModalModule.forRoot(),
    NgSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
