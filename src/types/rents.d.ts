export interface FetchProducts {
  page?: number;
  perPage?: number;
  query?: string;
  startDate?: string;
  endDate?: string;
}

export type FormProductError = {
  name?: string[] | undefined;
  description?: string[] | undefined;
  buyedValue?: string[] | undefined;
  soldValue?: string[] | undefined;
  quantity?: string[] | undefined;
}

export type TSelectedProduct = {
  id: string;
  name: string;
  soldValue: number;
}

export type Product = {
  id: string;
  description: string | null;
  name: string;
  buyed_value: number;
  sold_value: number;
  quantity: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type TGetProducts = {
  query?: string;
  currentPage?: number;
  rows?: number
}

export type TGetSaleProducts = {
  query?: string;
  currentPage?: number;
  rows?: number
  start?: string;
  end?: string
}

export interface IRentState {
  rents: Product[] | [];
  rentToEdit: Product | null;
  rentToDelete: {
    id: string;
    name: string;
  } | null;
  openDrawer: boolean;
  loading: boolean;
  totalCount: number;
  errors: any; // Tipar
}

export interface ISaleProductState {
  products: Product[] | [];
  totalValue: string;
  liquidValue: string;
  productToEdit: Product | null;
  productToDelete: {
    id: string;
    name: string;
  } | null;
  openDrawer: boolean;
  loading: boolean;
  totalCount: number;
  errors: any; // Tipar
}