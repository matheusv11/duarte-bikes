'use client'
import { useEffect } from "react";
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
import { getBikes } from "@/src/store/bikeSlice";

export default function Table() {
  const dispatch = useAppDispatch();
  const { currentPage, query, rows } = useTable();
  const { bikes } = useAppSelector((state) => state.bike);
  const options = TableOptions();

  useEffect(() => {
    dispatch(getBikes({ query: query, currentPage: currentPage, rows: rows }))
  }, [dispatch, currentPage, query, rows ])

  return (
    <>
      <MUIDataTable
        title={"Bikes"}
        data={bikes}
        columns={columns}
        options={options}
      />

      <DeleteProductDialog/>
  </>
  )
  
}