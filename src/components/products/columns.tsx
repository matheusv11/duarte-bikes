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
    <FaPen />
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
    <FaTrash />
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