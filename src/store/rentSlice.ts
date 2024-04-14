import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product, TGetProducts, IRentState } from "@/src/types/rents"; // Mudar nome
import { fetchRents } from '@/src/lib/data';

const initialState: IRentState = {
  rents: [],
  rentToDelete: null,
  loading: false,
  rentToEdit: null,
  openDrawer: false,
  totalCount: 0,
  errors: null
};

export const getRents = createAsyncThunk(
  'products/fetch',
  async (params: TGetProducts = {}, {rejectWithValue}) => {
    const { query, currentPage, rows, start, end }= params;
    
    try{
      const res = await fetchRents({ query: query, page: currentPage, perPage: rows, startDate: start, endDate: end });
      return res;
    }
    catch(e) {
      console.log("Num deu", e)
      rejectWithValue(e) // Pegar mensagem
    }
    
  },
)

export const rentSlice = createSlice({
  name: "rent",
  initialState,
  reducers: {
    handleDrawer: (state, action: PayloadAction<boolean>) => {
      state.openDrawer = action.payload
    },
    setRentToEdit: (state, action: PayloadAction<any>) => {
      state.rentToEdit = action.payload;
    },
    setRentToDelete: (state, action: PayloadAction<any>) => {
      state.rentToDelete = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRents.pending, (state) => {
      state.rents = [];
      state.loading = true
    }),
    builder.addCase(getRents.fulfilled, (state, action) => {
      state.loading = false;
      state.rents = action.payload?.rents as any // Tipar direito
      state.totalCount = action.payload?.count as any
    }),
    builder.addCase(getRents.rejected, (state, action) => {
      state.loading = false
      state.errors = action.error.message
    })
  }

});

export const { setRentToEdit, handleDrawer, setRentToDelete } = rentSlice.actions;
export const rentReducer = rentSlice.reducer;
