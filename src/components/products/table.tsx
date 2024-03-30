'use client'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress } from "@mui/material";
import MUIDataTable, { MUIDataTableOptions, MUIDataTableColumnDef } from "mui-datatables";
import { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { setProductState } from "@/src/store/productSlice";
import { useAppDispatch, useAppSelector } from "@/src/store";
import { deleteProduct } from "@/src/lib/productActions";
import { Product } from "@/src/types/products";
import useTable from "@/src/lib/useTable";
import { valueCurrencyMask } from "@/src/lib/utils";

interface ITable {
  products: Product[]
  loading: boolean;
  currentPage: number;
  totalCount: number;
  rows: number;
  refetch: () => void;
  toggleDrawer: (open: boolean) => void;
}

const CustomToolbar = ({dispatch, toggleDrawer}: any) => {
  const openDrawer = () => {
    dispatch(setProductState(null as any));
    toggleDrawer(true);
  }
  return(
     <>
      <Button sx={{ml: 2}} variant="contained" onClick={openDrawer}>
        Criar
      </Button>
     </>
   );
  }

export default function Table({loading, products, currentPage, totalCount, rows, refetch, toggleDrawer }: ITable) {
  const { closeSearch, changePage, handleSearch, changeRows } = useTable();
  const [deleProduct, setDeleProduct] = useState<any>(null);
  
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);

  const delProduct = async () => {
    await deleteProduct(deleProduct.id);
    setDeleProduct(null);
    refetch();
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
          onClick={() => dispatch(setProductState(product === val ? null : val as any))}
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
    customToolbar: () =>  CustomToolbar({dispatch, toggleDrawer }),
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