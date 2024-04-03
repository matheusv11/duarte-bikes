'use client'
import { useEffect } from "react";
import { useSearchParams} from 'next/navigation';
import { getProducts } from "@/src/store/productSlice";
import columns from './columns';
import TableOptions from './options';

import dynamic from "next/dynamic";

const MUIDataTable = dynamic(() => import("mui-datatables"), {
  ssr: false,
  loading: () => <CircularLoading/>
});

import { useAppSelector, useAppDispatch } from "@/src/store";
import DeleteProductDialog from "./delete-product-dialog";
import CircularLoading from "../navigation/circularLoading";
import useTable from "@/src/lib/useTable";

export default function Table() {
  const dispatch = useAppDispatch();
  const { currentPage, query, rows } = useTable();
  const { products } = useAppSelector((state) => state.product);
  const options = TableOptions();

  useEffect(() => {
    dispatch(getProducts({ query: query, currentPage: currentPage, rows: rows }))
  }, [dispatch, currentPage, query, rows ])

  return (
    <>
      <MUIDataTable
        title={"Produtos"}
        data={products}
        columns={columns}
        options={options}
      />

      <DeleteProductDialog/>
  </>
  )
  
}