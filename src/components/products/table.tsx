'use client'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress } from "@mui/material";
import MUIDataTable, { MUIDataTableOptions, MUIDataTableColumnDef } from "mui-datatables";
import { usePathname, useSearchParams, useRouter} from 'next/navigation';
import { useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import { FaPen, FaTrash } from "react-icons/fa";
import { setProductState } from "@/src/store/productSlice";
import { useAppDispatch, useAppSelector } from "@/src/store";
import { deleteProduct } from "@/src/lib/productActions";
import { Product } from "@/src/types/products";

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
  const searchParams = useSearchParams();
  const [deleProduct, setDeleProduct] = useState<any>(null);
  
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);

  const pathname = usePathname();
  const { replace } = useRouter();

  const createPageURL = (pageNumber: number) => {
    const number = pageNumber + 1;
    const params = new URLSearchParams(searchParams);

    params.set('page', number.toString());
    
    replace(`${pathname}?${params.toString()}`);
  };

  const changeRows = (rows: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');
    params.set('rows', rows.toString());
    
    replace(`${pathname}?${params.toString()}`);
  }
  
  const handleSearch = useDebouncedCallback((search) => {

    const params = new URLSearchParams(searchParams);

    params.set('page', '1');

    if (search) {
      params.set('query', search);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const closeSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('query');
    replace(`${pathname}?${params.toString()}`);
  }

  const delProduct = async () => {
    await deleteProduct(deleProduct.id);
    setDeleProduct(null);
    refetch();
  }
  const columns: MUIDataTableColumnDef[] = [ // Tipar // Alinhar coluna com oq retornar do banco
    // {
    //   name: "id",
    //   label: "ID",
    //   options: {
    //   filter: true,
    //   sort: true,
    //   }
    // },
    {
      name: "name",
      label: "Produto",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "description",
      label: "Descrição",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "buyed_value",
      label: "Valor comprado",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "sold_value",
      label: "Valor vendido",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "quantity",
      label: "Quantidade",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "createdAt",
      label: "Criado em",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "updatedAt",
      label: "Editado em",
      options: {
        filter: true,
        sort: true,
      }
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
    filterType: 'checkbox',
    selectableRows: 'none',
    rowsPerPage: rows,
    responsive: 'standard',
    rowsPerPageOptions: [5, 10, 20],
    onChangePage: createPageURL,
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
    // onTableChange: () => {
    //   console.log("Mudança")
    // },
    // customSearchRender: debounceSearchRender(500),
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