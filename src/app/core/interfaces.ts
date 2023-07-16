import {
  BUTTON_SIZES,
  BUTTON_TYPES,
  METAMASK_LISTENERS,
  METAMASK_METHODS,
  ORDER_STATUSES,
  PRODUCT_FILTERS,
} from './enums';
import { BehaviorSubject } from 'rxjs';

export interface Response<T> {
  data: T;
  success: boolean;
}

export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}

export interface ProductResponse {
  product: Product;
}

export interface OrdersResponse {
  orders: Order[];
}

/** METAMASK */
interface MetamaskRequestParams {
  method: METAMASK_METHODS;
  params?: any;
}

export interface Metamask {
  request: (params: MetamaskRequestParams) => Promise<any>;
  isConnected: () => Promise<boolean>;
  on: (handler: METAMASK_LISTENERS, callback: Function) => void;
}

export interface MetamaskError {
  code: number;
  message: string;
  stack: string;
}

export interface WalletData {
  address$: BehaviorSubject<string>;
  balance: number;
  activeChainId$: BehaviorSubject<string>;
  isHaveRequiredChain: boolean;
  isMetamask: boolean;
  isWalletConnected: boolean;
  isActiveChainIdCorrect: boolean;
}

/** NOVA POSHTA */
export interface NovaPoshtaResponse<T> {
  success: boolean;
  data: T;
  errors: any[];
  warnings: any[];
  info: Info | [];
  messageCodes: any[];
  errorCodes: any[];
  warningCodes: any[];
  infoCodes: any[];
}

export interface CityInfo {
  Ref: string;
  SettlementType: string;
  Latitude: string;
  Longitude: string;
  Description: string;
  DescriptionRu: string;
  DescriptionTranslit: string;
  SettlementTypeDescription: string;
  SettlementTypeDescriptionRu: string;
  SettlementTypeDescriptionTranslit: string;
  Region: string;
  RegionsDescription: string;
  RegionsDescriptionRu: string;
  RegionsDescriptionTranslit: string;
  Area: string;
  AreaDescription: string;
  AreaDescriptionRu: string;
  AreaDescriptionTranslit: string;
  Index1: string;
  Index2: string;
  IndexCOATSU1: string;
  Delivery1: string;
  Delivery2: string;
  Delivery3: string;
  Delivery4: string;
  Delivery5: string;
  Delivery6: string;
  Delivery7: string;
  SpecialCashCheck: number;
  Warehouse: string;
}

export interface Department {
  SiteKey: string;
  Description: string;
  DescriptionRu: string;
  ShortAddress: string;
  ShortAddressRu: string;
  Phone: string;
  TypeOfWarehouse: string;
  Ref: string;
  Number: string;
  CityRef: string;
  CityDescription: string;
  CityDescriptionRu: string;
  SettlementRef: string;
  SettlementDescription: string;
  SettlementAreaDescription: string;
  SettlementRegionsDescription: string;
  SettlementTypeDescription: string;
  SettlementTypeDescriptionRu: string;
  Longitude: string;
  Latitude: string;
  PostFinance: string;
  BicycleParking: string;
  PaymentAccess: string;
  POSTerminal: string;
  InternationalShipping: string;
  SelfServiceWorkplacesCount: string;
  TotalMaxWeightAllowed: string;
  PlaceMaxWeightAllowed: string;
  SendingLimitationsOnDimensions: SendingLimitationsOnDimensions;
  ReceivingLimitationsOnDimensions: ReceivingLimitationsOnDimensions;
  Reception: Reception;
  Delivery: Delivery;
  Schedule: Schedule;
  DistrictCode: string;
  WarehouseStatus: string;
  WarehouseStatusDate: string;
  CategoryOfWarehouse: string;
  Direct: string;
  RegionCity: string;
  WarehouseForAgent: string;
  GeneratorEnabled: string;
  MaxDeclaredCost: string;
  WorkInMobileAwis: string;
  DenyToSelect: string;
  CanGetMoneyTransfer: string;
  OnlyReceivingParcel: string;
  PostMachineType: string;
  PostalCodeUA: string;
  WarehouseIndex: string;
}

export interface Info {
  totalCount?: number;
}

export interface SendingLimitationsOnDimensions {
  Width: number;
  Height: number;
  Length: number;
}

export interface ReceivingLimitationsOnDimensions {
  Width: number;
  Height: number;
  Length: number;
}

export interface Reception {
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  Sunday: string;
}

export interface Delivery {
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  Sunday: string;
}

export interface Schedule {
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  Sunday: string;
}

export interface Settlements {
  TotalCount: number;
  Addresses: Address[];
}

export interface Address {
  Present: string;
  Warehouses: number;
  MainDescription: string;
  Area: string;
  Region: string;
  SettlementTypeCode: string;
  Ref: string;
  DeliveryCity: string;
  AddressDeliveryAllowed: boolean;
  StreetsAvailability: boolean;
  ParentRegionTypes: string;
  ParentRegionCode: string;
  RegionTypes: string;
  RegionTypesCode: string;
}

/** ENVIRONMENT **/

export interface AddChainData {
  chainId: string;
  chainName: string;
  rpcUrls: string[];
  iconUrls: string[];
  nativeCurrency: NativeCurrencyData;
  blockExplorerUrls: string[];
}

export interface Environment extends AddChainData {
  production: boolean;
  apiUrl: string;
  novaposhtaUrl: string;
  sendToWalletAddress: string;
  requiredChainId: string;
}

/** INTERFACES **/

export interface Order {
  id: string;
  txhash: string;
  productId: string;
  status: ORDER_STATUSES;
  description: string;
  orderTime: number;
  updateStatusTime: number;
}

export interface NativeCurrencyData {
  name: string;
  symbol: string;
  decimals: number;
}

export interface Pagination {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
}

export interface Product {
  id: string;
  type: string;
  modelId: string;
  smallImageLink: string;
  largeImageLink: string;
  title: string;
  priceUah: number;
  priceBnb: number;
  countStars: number;
  maxStars: number;
  countViews: number;
  link: string;
  isInStock: boolean;
  isUsed: boolean;
}

export interface ButtonData {
  text?: string;
  size?: BUTTON_SIZES;
  type?: BUTTON_TYPES;
}

export interface FilterData {
  name: string;
  value: string;
  isChecked?: boolean;
}

export type Filters = {
  [key in PRODUCT_FILTERS]: BehaviorSubject<FilterData[]>;
};

export interface SortOption {
  name: string;
  value: string;
  isSelected: boolean;
}

export interface CustomerInfo {
  fullName: string;
  phoneNumber: string;
  deliveryCityRef: string;
  deliveryWarehouse: string;
}
