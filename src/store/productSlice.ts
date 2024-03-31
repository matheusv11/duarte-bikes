import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/src/types/products"; // Mudar nome
import { fetchProducts } from '@/src/lib/data';

interface IProductState {
  products: Product[] | null;
  editProduct: Product | null
  openDrawer: boolean;
  loading: boolean;
  totalCount: number;
  errors: any; // Tipar
}

interface IFetchProducts{ 
  query: string;
  currentPage: number;
  rows: number;
}

const initialState: IProductState = {
  products: [],
  loading: false,
  editProduct: null,
  openDrawer: false,
  totalCount: 0,
  errors: null
};


export const getProducts = createAsyncThunk(
  'products/fetch',
  async (params, {rejectWithValue}) => {
    const { query, currentPage, rows }= params as unknown as IFetchProducts;
    
    try{
      const res = await fetchProducts({ query: query, page: currentPage, perPage: rows });
      return res;
    }
    catch(e) {
      console.log("Num deu", e)
      rejectWithValue(e) // Pegar mensagem
    }
    
  },
)

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    handleDrawer: (state, action: PayloadAction<boolean>) => {
      state.openDrawer = action.payload
    },
    setProductState: (state, action: PayloadAction<Product>) => {
      state.editProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.products = [];
      state.loading = true
    }),
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload?.products as any // Tipar direito
      state.totalCount = action.payload?.count as any
    }),
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false
      state.errors = action.error.message
    })
  }

});

export const { setProductState, handleDrawer } = productSlice.actions;
export const productReducer = productSlice.reducer;
