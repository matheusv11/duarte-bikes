'use client';

import { MUIDataTableColumnDef } from "mui-datatables";
import { FaPen, FaTrash } from "react-icons/fa";
import { IconButton } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/src/store";
import { setBikeToEdit, setBikeToDelete } from "@/src/store/bikeSlice";

const CustomEditBodyRender = ({val}: any) => { // Chamar de React.FC
  const dispatch = useAppDispatch();
  const { bikeToEdit } = useAppSelector((state) => state.bike);

  return (
    <IconButton
    color="inherit"
    aria-label="open drawer"
    onClick={() => dispatch(setBikeToEdit(bikeToEdit === val ? null : val as any))}
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
      onClick={() => dispatch(setBikeToDelete(val))}
      edge="start"
    >
    <FaTrash color="red"/>
  </IconButton>
  )
}

export default [
{
  name: "id",
  label: "ID",
  options: {
    display: false,
  }
},
{
  name: "name",
  label: "Bike",
},
{
  name: "description",
  label: "Descrição",
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