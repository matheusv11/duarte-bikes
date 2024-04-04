'use client';

import { MUIDataTableColumnDef } from "mui-datatables";
import { valueCurrencyMask } from "@/src/lib/utils";
import { FaPen, FaTrash } from "react-icons/fa";
import { IconButton } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/src/store";
import { setProductToEdit, setProductToDelete } from "@/src/store/productSlice";

const CustomEditBodyRender = ({val}: any) => { // Chamar de React.FC
  const dispatch = useAppDispatch();
  const { productToEdit } = useAppSelector((state) => state.product);

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

export default [ // Tipar // Alinhar coluna com oq retornar do banco
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
  name: "buyedValue",
  label: "Valor comprado",
  options: {
    customBodyRender: (val) => val ? `${valueCurrencyMask(val.toString())}` : val
  }
},
{
  name: "soldValue",
  label: "Valor vendido",
  options: {
    customBodyRender: (val) => val ? `${valueCurrencyMask(val.toString())}` : val
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
},
] satisfies MUIDataTableColumnDef[];