'use client'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress, TableFooter, TableCell, TableRow } from "@mui/material";
import MUIDataTable, { MUIDataTableOptions, MUIDataTableColumnDef } from "mui-datatables";
import { usePathname, useSearchParams, useRouter} from 'next/navigation';
import { useEffect, useMemo, useState, useRef } from "react";
import { useDebouncedCallback } from 'use-debounce';
import { FaPen, FaTrash } from "react-icons/fa";
import { setProductState } from "@/src/store/productSlice";
import { useAppDispatch, useAppSelector } from "@/src/store";
// import { deleteProduct } from "@/src/lib/selledProductActions";
import { Product } from "@/src/types/products";
import CustomToolbar from "@/src/components/products/custom-toolbar";
import { largeSelledProductsData } from '@/src/lib/mock'
import page from "@/src/app/page";

const style = {
  footerCell: {
    backgroundColor: "grey",
    borderBottom: "none",
    color: "white",
    fontSize: 14,
    fontWeight: "bolder",
    position: 'sticky',
    bottom: 0,
    zIndex: 100,
  },
 
}

const style2= {
    position: "sticky",
    left: 0,
    background: "white",
    zIndex: 101
}
interface ITable {
  products: Product[]
  loading: boolean;
  totalValue: number;
  currentPage: number;
  totalCount: number;
  rows: number;
  refetch: () => void;
  toggleDrawer: (open: boolean) => void;
}

export default function Table({loading, products, currentPage, totalValue, totalCount, rows, refetch, toggleDrawer }: ITable) {
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
    // await deleteProduct(deleProduct.id);
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
      name: "product_name",
      label: "Produto",
      options: {
        filter: true,
        // setCellProps: () => ({
        //   style: {
        //     whiteSpace: "nowrap",
        //     position: "sticky",
        //     left: "0",
        //     background: "white",
        //     zIndex: 100
        //   }
        // }),
        // setCellHeaderProps: () => ({
        //   style: {
        //     whiteSpace: "nowrap",
        //     position: "sticky",
        //     left: 0,
        //     background: "white",
        //     zIndex: 101
        //   }
        // })
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
      name: "product_value",
      label: "Valor produto",
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
    // {
    //   name: "edit",
    //   label: "Editar",
    //   options: {
    //     filter: true,
    //     sort: true,
    //     setCellProps: () => ({ align: 'center' }),
    //     customBodyRender: (val, meta, updateValue) => (
    //       <IconButton
    //       color="inherit"
    //       aria-label="open drawer"
    //       onClick={() => dispatch(setProductState(product === val ? null : val as any))}
    //       edge="start"
    //       // sx={{ mr: 2, ...(open && { display: 'none' }) }}
    //     >
    //       <FaPen />
    //     </IconButton>
    //     )
    //   },
    // },
    // {
    //   name: "delete",
    //   label: "Excluir",
    //   options: {
    //     filter: true,
    //     sort: true,
    //     setCellProps: () => ({ align: 'center' }),
    //     customBodyRender: (val, meta, updateValue) => (
    //       <IconButton
    //         color="inherit"
    //         aria-label="open drawer"
    //         onClick={() => setDeleProduct(val)}
    //         // edge="start"
    //       // sx={{ mr: 2, ...(open && { display: 'none' }) }}
    //       >
    //         <FaTrash />
    //       </IconButton>
    //     )
    //   },
    // },
  ];

  const options: MUIDataTableOptions = { // Maybe memoized component
    filterType: 'checkbox',
    selectableRows: 'none',
    rowsPerPage: rows,
    responsive: 'vertical',
    rowsPerPageOptions: [5, 10, 20],
    onChangePage: createPageURL,
    onChangeRowsPerPage: changeRows,
    count: totalCount,
    page: currentPage - 1,
    serverSide: true,
    onSearchChange: handleSearch,
    onSearchClose: closeSearch,
    tableBodyHeight:  '75vh', // Mudar
    customToolbar: () =>  <CustomToolbar  toggleDrawer={ toggleDrawer }/>,
    customTableBodyFooterRender: (opts) => {
      
      // console.log("OPTS", opts);
      // const startIndex = page * rowsPerPage;
      // const endIndex = (page + 1) * rowsPerPage;
      // let sumEnglish = opts.data
      //   .slice(startIndex, endIndex)
      //   .reduce((accu, item) => {
      //     return accu + item.data[1];
      //   }, 0);
      // let sumMaths = opts.data
      //   ?.slice(startIndex, endIndex)
      //   ?.reduce((accu, item) => {
      //     return accu + item.data[2];
      //   }, 0);
      // let sumScience = opts.data
      //   .slice(startIndex, endIndex)
      //   .reduce((accu, item) => {
      //     return accu + item.data[3];
      //   }, 0);
      return (
        <>
          <TableFooter  sx={style.footerCell}>
            <TableRow>
              {opts.columns.map((col, index) => {
                if (col.display === "true") {
                  if (col.name === "product_name") {
                    return (
                      <TableCell sx={style.footerCell} key={index} >
                        Total
                      </TableCell>
                    );
                  } else if (col.name === "sold_value") {
                    return (
                      <TableCell sx={style.footerCell} key={index} >
                        {totalValue}
                      </TableCell>
                    );
                  } else {
                    return  <TableCell key={index} sx={style.footerCell}  />;
                  }
                }
              })}
            </TableRow>
          </TableFooter>
        </>
      );
    },
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
        title={"Vendas"}
        data={products}
        // data={largeSelledProductsData}
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