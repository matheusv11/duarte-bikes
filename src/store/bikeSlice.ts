import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product, TGetProducts, IProductState } from "@/src/types/products"; // Mudar nome
import { fetchBikes } from '@/src/lib/data';
import { IBikeState } from "../types/bikes";

const initialState: IBikeState = {
  bikes: [],
  bikeToDelete: null,
  loading: false,
  bikeToEdit: null,
  openDrawer: false,
  totalCount: 0,
  errors: null
};

export const getBikes = createAsyncThunk(
  'bikes/fetch',
  async (params: TGetProducts = {}, {rejectWithValue}) => {
    const { query, currentPage, rows }= params;
    
    try{
      const res = await fetchBikes({ query: query, page: currentPage, perPage: rows });
      return res;
    }
    catch(e) {
      console.log("Num deu", e)
      rejectWithValue(e) // Pegar mensagem
    }
    
  },
)

export const bikeSlice = createSlice({
  name: "bike",
  initialState,
  reducers: {
    handleDrawer: (state, action: PayloadAction<boolean>) => {
      state.openDrawer = action.payload
    },
    setBikeToEdit: (state, action: PayloadAction<Product>) => {
      state.bikeToEdit = action.payload;
    },
    setBikeToDelete: (state, action: PayloadAction<IProductState['productToDelete']>) => {
      state.bikeToDelete = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBikes.pending, (state) => {
      state.bikes = [];
      state.loading = true
    }),
    builder.addCase(getBikes.fulfilled, (state, action) => {
      state.loading = false;
      state.bikes = action.payload?.bikes as any // Tipar direito
      state.totalCount = action.payload?.count as any
    }),
    builder.addCase(getBikes.rejected, (state, action) => {
      state.loading = false
      state.errors = action.error.message
    })
  }

});

export const { setBikeToEdit, handleDrawer, setBikeToDelete } = bikeSlice.actions;
export const bikeReducer = bikeSlice.reducer;
