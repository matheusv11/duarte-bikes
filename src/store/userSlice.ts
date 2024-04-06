import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "@/src/types/user"; // Mudar nome
import { fetchCustomers } from '@/src/lib/data';
import { TGetProducts, Product, IProductState } from "../types/products";

const initialState: IUserState = {
  customers: [],
  userToDelete: null,
  loading: false,
  userToEdit: null,
  openDrawer: false,
  totalCount: 0,
  errors: null
};

export const getCustomers = createAsyncThunk(
  'users/fetch',
  async (params: TGetProducts = {}, {rejectWithValue}) => {
    const { query, currentPage, rows }= params;
    
    try{
      const res = await fetchCustomers({ query: query, page: currentPage, perPage: rows });
      return res;
    }
    catch(e) {
      console.log("Num deu", e)
      rejectWithValue(e) // Pegar mensagem
    }
    
  },
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleDrawer: (state, action: PayloadAction<boolean>) => {
      state.openDrawer = action.payload
    },
    setUserToEdit: (state, action: PayloadAction<Product>) => {
      state.userToEdit = action.payload;
    },
    setUserToDelete: (state, action: PayloadAction<IProductState['productToDelete']>) => {
      state.userToDelete = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCustomers.pending, (state) => {
      state.customers = [];
      state.loading = true
    }),
    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.customers = action.payload?.customers as any // Tipar direito
      state.totalCount = action.payload?.count as any
    }),
    builder.addCase(getCustomers.rejected, (state, action) => {
      state.loading = false
      state.errors = action.error.message
    })
  }

});

export const { setUserToDelete, handleDrawer, setUserToEdit } = userSlice.actions;
export const userReducer = userSlice.reducer;
