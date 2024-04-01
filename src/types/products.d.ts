export interface FetchProducts {
  page?: number;
  perPage?: number;
  query?: string;
  startDate?: string;
  endDate?: string;
}

export type TSelectedProduct = {
  id: string;
  label: string;
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

export interface IProductState {
  products: Product[] | [];
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

export interface ISaleProductState {
  products: Product[] | [];
  totalValue: string;
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