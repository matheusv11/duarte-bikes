'use client'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress } from "@mui/material";
import MUIDataTable, { MUIDataTableOptions, MUIDataTableColumnDef } from "mui-datatables";
import { useState, useEffect, useCallback } from "react";
import { usePathname, useSearchParams, useRouter} from 'next/navigation';
import { FaPen, FaTrash } from "react-icons/fa";
import { setProductState, handleDrawer, getProducts } from "@/src/store/productSlice";
import { deleteProduct } from "@/src/lib/productActions";
// import { Product } from "@/src/types/products";
import CustomToolbar from "./custom-toolbar-product";

import useTable from "@/src/lib/useTable";
import { valueCurrencyMask } from "@/src/lib/utils";
import { useAppSelector, useAppDispatch } from "@/src/store";

export default function Table() {
  const dispatch = useAppDispatch();
  const { errors, loading, products,editProduct, totalCount, openDrawer} = useAppSelector((state) => state.product);

  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';
  const rows = Number(searchParams.get('rows')) || 5;
  
 
  useEffect(() => {
    dispatch(getProducts({ query: query, currentPage: currentPage, rows: rows }))
  }, [dispatch, searchParams])
  // searchParams

  const { closeSearch, changePage, handleSearch, changeRows } = useTable();
  const [deleProduct, setDeleProduct] = useState<any>(null);
  
  const delProduct = async () => {
    await deleteProduct(deleProduct.id);
    setDeleProduct(null);
    // refetch();
  }

  const columns: MUIDataTableColumnDef[] = [ // Tipar // Alinhar coluna com oq retornar do banco
    {
      name: "id",
      label: "ID",
      options: {
        display: false,
      }
    },
    {
      name: "name",
      label: "Produto",
    },
    {
      name: "description",
      label: "Descrição",
    },
    {
      name: "buyed_value",
      label: "Valor comprado",
      options: {
        customBodyRender: (val) => `${valueCurrencyMask(val.toString())}`
      }
    },
    {
      name: "sold_value",
      label: "Valor vendido",
      options: {
        customBodyRender: (val) => `${valueCurrencyMask(val.toString())}`
      }
    },
    {
      name: "quantity",
      label: "Quantidade",
    },
    {
      name: "createdAt",
      label: "Criado em",
    },
    {
      name: "updatedAt",
      label: "Editado em",
    },
    {
      name: "edit",
      label: "Editar",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ align: 'center' }),
        customBodyRender: (val, meta, updateValue) => (
          <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(setProductState(editProduct === val ? null : val as any))}
          edge="start"
          // sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <FaPen />
        </IconButton>
        )
      },
    },
    {
      name: "delete",
      label: "Excluir",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ align: 'center' }),
        customBodyRender: (val, meta, updateValue) => (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDeleProduct(val)}
            // edge="start"
          // sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <FaTrash />
          </IconButton>
        )
      },
    },
  ];

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

  const handleClose = () => setDeleProduct(null);

  return (
    <>
      <MUIDataTable
        title={"Produtos"}
        data={products}
        columns={columns}
        options={options}
      />

    <Dialog
        open={!!deleProduct}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Tem certeza que deseja deletar ${deleProduct?.name}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            A ação seguinte não será reversível
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Button color="error" onClick={delProduct} autoFocus>
            Apagar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
  
}