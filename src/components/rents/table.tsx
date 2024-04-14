'use client'
import { useEffect } from "react";
import { getRents } from "@/src/store/rentSlice";
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
  const { currentPage, query, rows, startDate, endDate } = useTable();
  const { rents } = useAppSelector((state) => state.rent);
  const options = TableOptions();

  useEffect(() => {
    dispatch(getRents({ query: query, currentPage: currentPage, rows: rows, start: startDate, end: endDate }))
  }, [dispatch, currentPage, query, rows, startDate, endDate ])

  return (
    <>
      <MUIDataTable
        title={"Aluguéis"}
        data={rents}
        columns={columns}
        options={options}
      />

      <DeleteProductDialog/>
  </>
  )
  
}