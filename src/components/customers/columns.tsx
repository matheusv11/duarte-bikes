'use client';

import { MUIDataTableColumnDef } from "mui-datatables";
import { cellphoneMask, cpfMask, valueCurrencyMask } from "@/src/lib/utils";
import { FaPen, FaTrash } from "react-icons/fa";
import { IconButton } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/src/store";
import { setUserToEdit, setUserToDelete } from "@/src/store/userSlice";

const CustomEditBodyRender = ({val}: any) => { // Chamar de React.FC
  const dispatch = useAppDispatch();
  const { userToEdit } = useAppSelector((state) => state.user);

  return (
    <IconButton
    color="inherit"
    aria-label="open drawer"
    onClick={() => dispatch(setUserToEdit(userToEdit === val ? null : val as any))}
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
      onClick={() => dispatch(setUserToDelete(val))}
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
  label: "Nome",
},
{
  name: "address",
  label: "Endereço",
},
{
  name: "cellphone",
  label: "Celular",
    options: {
    customBodyRender: (val) => cellphoneMask(val)
  }
},

{
  name: "cpfCnpj",
  label: "CPF",
  options: {
    customBodyRender: (val) => cpfMask(val)
  }
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