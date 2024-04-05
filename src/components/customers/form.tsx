'use client'

import { Button, TextField, Drawer, Typography, IconButton, Box, } from '@mui/material';
import { createCustomer, updateProduct } from '@/src/lib/userActions';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from "@/src/store";
import { setUserToEdit,  handleDrawer, getCustomers } from "@/src/store/userSlice";
import CloseIcon from '@mui/icons-material/Close';
import { cellphoneMask, cpfMask } from '@/src/lib/utils';
import { FormProductError } from '@/src/types/products';
import useTable from '@/src/lib/useTable';

const initialForm = {
  name: "",
  address: "",
  cellphone: "",
  cpfCnpj: "",
}

export default function UserForm() {
  const dispatch = useAppDispatch();
  const { openDrawer, userToEdit } = useAppSelector((state) => state.user);
  const { rows, query, currentPage } = useTable();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormProductError>({});

  const handleForm = (field: keyof typeof form, val: any) => setForm((state) => ({...state, [field]: val}));

  const handleOpen = useMemo(() => (openDrawer || !!userToEdit), [openDrawer, userToEdit]);

  const toggleDrawer = () => {
    if(userToEdit) {
      dispatch(setUserToEdit(null as any));
    }else {
      dispatch(handleDrawer(false));
    }
  }

  const handleCreate = async() => {
    setLoading(true);

    const response = await createCustomer(form);

    if(response?.errors)  {
      console.log("Response", response);
      setLoading(false);
      setErrors(response.errors);
      // Apenas setar o error de form ao ter conteúdo de form
      // Caso for coisa de db, retornar numa caixa de mensagem
      return // Alerta de erro e nas mensagens
    }
    setLoading(false);
    setErrors({});
    setForm(initialForm);
    toggleDrawer();
    dispatch(getCustomers({}))
  }

  const handleUpdate = async() => {
    setLoading(true);

    const response = await updateProduct(form);
    if(response?.errors)  {
      console.log("Response", response);
      setLoading(false);
      setErrors(response.errors);
      // Apenas setar o error de form ao ter conteúdo de form
      // Caso for coisa de db, retornar numa caixa de mensagem
      return // Alerta de erro e nas mensagens
    }
    setLoading(false);
    setErrors({});
    setForm(initialForm);
    dispatch(setUserToEdit(null as any));
    dispatch(getCustomers({ currentPage, query, rows }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(userToEdit) {
      handleUpdate();
    } else {
      handleCreate();
    }
  }

  useEffect(() => {
    if(userToEdit) {
      console.log("PRODUTO", userToEdit)
      setForm(userToEdit as any)
    }else {
      setForm(initialForm)
    }
    setErrors({});
  }, [userToEdit]);

  return (
    <Drawer
      anchor='right'
      open={handleOpen}
      onClose={toggleDrawer}
      PaperProps={{
        sx: { width: '100%', maxWidth: 450, p: 2 },
      }}
    >
      <Box display="flex" flexDirection="column" gap={2} component="form" onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              Cadastrar Cliente
            </Typography>
            <IconButton
            size="small"
            onClick={toggleDrawer}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <TextField
            id="name"
            name="name"
            label="Nome"
            placeholder="Nome"
            fullWidth
            required
            value={form.name}
            onChange={(e) => handleForm("name", e.target.value)}
            error={!!errors.name}
            helperText={errors.name && errors.name.map(e => e)}
          />
          <TextField
            id="address"
            name="address"
            required
            label="Endereço"
            placeholder="Endereço"
            fullWidth
            value={form.address}
            onChange={(e) => handleForm("address", e.target.value)}
            error={!!errors.description}
            helperText={errors.description && errors.description.map(e => e)}
          />
          <TextField
            id="cpf_cnpj"
            name="cpf_cnpj"
            type="text"
            label="CPF"
            placeholder="CPF"
            fullWidth
            required
            value={cpfMask(form.cpfCnpj)}
            inputProps={{ maxLength: 14 }}
            onChange={(e) => handleForm("cpfCnpj", cpfMask(e.target.value))}
            // value={valueCurrencyMask(form.buyedValue.toString())}
            // onChange={(e) => handleForm("buyedValue", valueCurrencyMask(e.target.value))}
            error={!!errors.buyedValue}
            helperText={errors.buyedValue && errors.buyedValue.map(e => e)}
          />
          <TextField
            type="text"
            id="cellphone"
            name="cellphone"
            label="Celular"
            placeholder="Celular"
            fullWidth
            required
            value={cellphoneMask(form.cellphone)}
            onChange={(e) => handleForm("cellphone", cellphoneMask(e.target.value))}
            inputProps={{ maxLength: 15 }}
            error={!!errors.quantity}
            helperText={errors.quantity && errors.quantity.map(e => e)}
          />
          <Box display="flex" gap={2} justifyContent="center"> 
            <Button type="submit" variant="contained" disabled={loading}>{userToEdit ? "Editar" : "Criar"}</Button>
            <Button type="button" color='error' variant="contained" disabled={loading} onClick={toggleDrawer}>cancelar</Button>
          </Box>

      </Box>
    </Drawer>
  )
}