'use client';

import { MUIDataTableColumnDef } from "mui-datatables";
import { valueCurrencyMask } from "@/src/lib/utils";
import { FaPen, FaTrash } from "react-icons/fa";
import { IconButton } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/src/store";
import { setRentToDelete, setRentToEdit } from "@/src/store/rentSlice";

const CustomEditBodyRender = ({val}: any) => { // Chamar de React.FC
  const dispatch = useAppDispatch();
  const { rentToEdit } = useAppSelector((state) => state.rent);

  return (
    <IconButton
    color="inherit"
    aria-label="open drawer"
    onClick={() => dispatch(setRentToEdit(rentToEdit === val ? null : val as any))}
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
      onClick={() => dispatch(setRentToDelete(val))}
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
  name: "bikeName",
  label: "Bike",
},
{
  name: "value",
  label: "Valor",
  options: {
    customBodyRender: (val) => val ? `${valueCurrencyMask(val.toString())}` : val
  }
},
{
  name: "userName",
  label: "Cliente",
},
{
  name: "scheduleStart",
  label: "Horário alugado de",
},
{
  name: "scheduleEnd",
  label: "Horário alugado até",
},
{
  name: "createdAt",
  label: "Criado em",
  options: {
    display: false,
  }
},
{
  name: "updatedAt",
  label: "Editado em",
  options: {
    display: false,
  }
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