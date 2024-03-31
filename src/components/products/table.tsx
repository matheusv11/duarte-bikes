'use client'
import { LinearProgress } from "@mui/material";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { useEffect } from "react";
import { useSearchParams} from 'next/navigation';
import { getProducts } from "@/src/store/productSlice";
import CustomToolbar from "./custom-toolbar";
import columns from './columns';

import useTable from "@/src/lib/useTable";
import { useAppSelector, useAppDispatch } from "@/src/store";
import DeleteProductDialog from "./delete-product-dialog";

export default function Table() {
  const dispatch = useAppDispatch();
  const { errors, loading, products, editProduct, totalCount, openDrawer } = useAppSelector((state) => state.product);

  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';
  const rows = Number(searchParams.get('rows')) || 5;
 
  useEffect(() => {
    dispatch(getProducts({ query: query, currentPage: currentPage, rows: rows }))
  }, [dispatch, searchParams])

  const { closeSearch, changePage, handleSearch, changeRows } = useTable();

  const options: MUIDataTableOptions = { // Maybe memoized component
    // filterType: 'dropdown',
    filter: false,
    sort: false,
    selectableRows: 'none',
    rowsPerPage: rows,
    responsive: 'standard',
    // tableBodyHeight: '75vh',
    tableBodyMaxHeight: '75vh',
    rowsPerPageOptions: [5, 10, 20, 50, 100],
    onChangePage: changePage,
    onChangeRowsPerPage: changeRows,
    count: totalCount,
    page: currentPage - 1,
    serverSide: true,
    onSearchChange: handleSearch,
    onSearchClose: closeSearch,
    customToolbar: () =>  <CustomToolbar/>,
    textLabels: {
      body: {
        noMatch: loading ? <LinearProgress/> : 'Não há conteúdo para a busca'
      }
    }
  };

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