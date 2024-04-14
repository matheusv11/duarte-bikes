import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import { productReducer } from "@/src/store/productSlice";
import { saleProductReducer } from "@/src/store/saleProductSlice";
import { bikeReducer } from "@/src/store/bikeSlice";
import { rentReducer } from "@/src/store/rentSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { userReducer } from "./userSlice";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

// const storage =
//   typeof window !== "undefined"
//     ? createWebStorage("local")
//     : createNoopStorage();

// const authPersistConfig = {
//   key: "product",
//   storage: storage,
//   whitelist: ["productState"],
// };

// const persistedReducer = persistReducer(authPersistConfig, productReducer);
// const persistedSaleReducer = persistReducer(authPersistConfig, saleProductReducer);

const rootReducer = combineReducers({ // Don't need to persist reduce now
  product: productReducer,
  saleProduct: saleProductReducer,
  user: userReducer,
  bike: bikeReducer,
  rent: rentReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;