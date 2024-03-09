import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/app/types/products"; // Mudar nome

export interface IProductState {
  product: Product | null
}

const initialState: IProductState = {
  product: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductState: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
  },
});

export const { setProductState } = productSlice.actions;
export const productReducer = productSlice.reducer;
