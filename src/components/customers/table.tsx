'use client'
import { useEffect } from "react";
import { getCustomers } from "@/src/store/userSlice";
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
  const { customers } = useAppSelector((state) => state.user);
  const options = TableOptions();

  useEffect(() => {
    dispatch(getCustomers({ query: query, currentPage: currentPage, rows: rows }))
  }, [dispatch, currentPage, query, rows ])

  return (
    <>
      <MUIDataTable
        title={"Usuários"}
        data={customers}
        columns={columns}
        options={options}
      />

      <DeleteProductDialog/>
  </>
  )
  
}