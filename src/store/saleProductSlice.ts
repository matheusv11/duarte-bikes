import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TGetSaleProducts, ISaleProductState } from "@/src/types/products";
import { fetchSelledProducts } from '@/src/lib/data';

const initialState: ISaleProductState = {
  products: [],
  totalValue: "0",
  productToDelete: null,
  loading: false,
  productToEdit: null,
  openDrawer: false,
  totalCount: 0,
  errors: null
};

export const getSelledProducts = createAsyncThunk(
  'sale-products/fetch',
  async (params: TGetSaleProducts = {}, {rejectWithValue}) => {
    const { query, currentPage, rows, start, end }= params;
    
    try{
      const res = await fetchSelledProducts({ query: query, page: currentPage, perPage: rows, startDate: start, endDate: end });
      return res;
    }
    catch(e) {
      console.log("Num deu", e)
      rejectWithValue(e) // Pegar mensagem
    }
    
  },
)

export const saleProductSlice = createSlice({
  name: "saleProduct",
  initialState,
  reducers: {
    handleDrawer: (state, action: PayloadAction<boolean>) => {
      state.openDrawer = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSelledProducts.pending, (state) => {
      state.products = [];
      state.loading = true
    }),
    builder.addCase(getSelledProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload?.products as any // Tipar direito
      state.totalCount = action.payload?.count as any
      state.totalValue = action.payload?.totalValue as any
    }),
    builder.addCase(getSelledProducts.rejected, (state, action) => {
      state.loading = false
      state.errors = action.error.message
    })
  }

});

export const { handleDrawer } = saleProductSlice.actions;
export const saleProductReducer = saleProductSlice.reducer;
