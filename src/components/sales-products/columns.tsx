'use client';

import { MUIDataTableColumnDef } from "mui-datatables";
import { valueCurrencyMask } from "@/src/lib/utils";
import { FaPen, FaTrash } from "react-icons/fa";
import { IconButton } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/src/store";
import { setProductToEdit, setProductToDelete } from "@/src/store/saleProductSlice";

const CustomEditBodyRender = ({val}: any) => { // Chamar de React.FC
  const dispatch = useAppDispatch();
  const { productToEdit } = useAppSelector((state) => state.saleProduct);

  return (
    <IconButton
    color="inherit"
    aria-label="open drawer"
    onClick={() => dispatch(setProductToEdit(productToEdit === val ? null : val as any))}
    edge="start"
  >
    <FaPen color="orange"/>
  </IconButton>
  )
}

const CustomDeleteBodyRender = ({val} : any) => {
  const dispatch = useAppDispatch();

  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={() => dispatch(setProductToDelete(val))}
      edge="start"
    >
    <FaTrash color="red"/>
  </IconButton>
  )
}

export default [
    {
      name: "productName",
      label: "Produto",
    },
    {
      name: 'liquidValue',
      label: 'Ganho líquido',
      options: {
        customBodyRender: (val) => val ? valueCurrencyMask(val.toString()) : val
      }
    },
    {
      name: "soldValue",
      label: "Ganho venda",
      options: {
        customBodyRender: (val) => val ? valueCurrencyMask(val.toString()) : val
      }
    },
    {
      name: "quantity",
      label: "Quantidade",
    },
    {
      name: "productBuyedValue",
      label: "Valor comprado",
      options: {
        customBodyRender: (val) => val ? valueCurrencyMask(val.toString()) : val
      }
    },
    {
      name: "productSoldValue",
      label: "Valor de venda",
      options: {
        customBodyRender: (val) => val ? valueCurrencyMask(val.toString()) : val
      }
    },
    {
      name: "createdAt",
      label: "Vendido em",
    },
    {
      name: "edit",
      label: "Editar",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ align: 'center' }),
        customBodyRender: (val, meta, updateValue) => <CustomEditBodyRender val={val}/>
      },
    },
    {
      name: "delete",
      label: "Excluir",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ align: 'center' }),
        customBodyRender: (val, meta, updateValue) => <CustomDeleteBodyRender val={val}/>
      },
    }
] satisfies MUIDataTableColumnDef[];