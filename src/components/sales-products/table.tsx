'use client'
import { useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from "@/src/store";
import columns from "./columns";
import TableOptions from "./options";
import {getSelledProducts } from '@/src/store/saleProductSlice'
import dynamic from "next/dynamic";
import CircularLoading from '@/src/components/navigation/circularLoading';
import useTable from '@/src/lib/useTable';

const MUIDataTable = dynamic(() => import("mui-datatables"), {
  ssr: false,
  loading: () => <CircularLoading/>
});

export default function Table() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const options = TableOptions();

  const { rows, query, currentPage, startDate, endDate } = useTable();

  useEffect(() => {
    dispatch(getSelledProducts({ query: query, currentPage: currentPage, rows: rows, start: startDate, end: endDate }))
  }, [dispatch, query, currentPage, rows, startDate, endDate])

  return (
    <>
      <MUIDataTable
        title={"Vendas"}
        data={products}
        // data={largeSelledProductsData}
        columns={columns}
        options={options}
      />
    </>
  )
  
}