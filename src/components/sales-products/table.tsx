'use client'
import { useSearchParams } from 'next/navigation';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/store";
import columns from "./columns";
import TableOptions from "./options";
import {getSelledProducts } from '@/src/store/saleProductSlice'
import dynamic from "next/dynamic";
import CircularLoading from '../navigation/circularLoading';

const MUIDataTable = dynamic(() => import("mui-datatables"), {
  ssr: false,
  loading: () => <CircularLoading/>
});

export default function Table() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const options = TableOptions();

  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';
  const rows = Number(searchParams.get('rows')) || 5;
  const startDate = searchParams.get('start') || '';
  const endDate =  searchParams.get('end') || '';

  useEffect(() => {
    dispatch(getSelledProducts({ query: query, currentPage: currentPage, rows: rows, start: startDate, end: endDate }))
  }, [dispatch, searchParams])

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