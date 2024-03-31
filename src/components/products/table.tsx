'use client'
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { useEffect } from "react";
import { useSearchParams} from 'next/navigation';
import { getProducts } from "@/src/store/productSlice";
import columns from './columns';
import TableOptions from './options';

import { useAppSelector, useAppDispatch } from "@/src/store";
import DeleteProductDialog from "./delete-product-dialog";

export default function Table() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const options = TableOptions();

  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';
  const rows = Number(searchParams.get('rows')) || 5;
 
  useEffect(() => {
    dispatch(getProducts({ query: query, currentPage: currentPage, rows: rows }))
  }, [dispatch, searchParams])

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