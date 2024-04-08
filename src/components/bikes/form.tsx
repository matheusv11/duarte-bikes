'use client'

import { Button, TextField, Drawer, Typography, IconButton, Box, } from '@mui/material';
import { createBike, updateBike } from '@/src/lib/bikeActions';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from "@/src/store";
import { setBikeToEdit, handleDrawer, getBikes } from "@/src/store/bikeSlice";
import CloseIcon from '@mui/icons-material/Close';
import {valueOnlyDigits, valueCurrencyMask } from '@/src/lib/utils';
import { FormProductError } from '@/src/types/products';
import useTable from '@/src/lib/useTable';

// Melhorar esses forms, componetizar pra reutilizar
const initialForm = { // Tipar
  name: "",
  description: "",
  quantity: "",
}

// Componentizar esses TextField e form de forma mais inteligente
export default function ProductForm() {
  const dispatch = useAppDispatch();
  const { openDrawer, bikeToEdit } = useAppSelector((state) => state.bike);
  const { rows, query, currentPage } = useTable();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormProductError>({});

  const handleForm = (field: keyof typeof form, val: any) => setForm((state) => ({...state, [field]: val}));

  const handleOpen = useMemo(() => (openDrawer || !!bikeToEdit), [openDrawer, bikeToEdit]);

  const toggleDrawer = () => {
    if(bikeToEdit) {
      dispatch(setBikeToEdit(null as any));
    }else {
      dispatch(handleDrawer(false));
    }
  }

  const handleCreate = async() => {
    setLoading(true);

    const response = await createBike(form);

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
    dispatch(getBikes({}))
  }

  const handleUpdate = async() => {
    setLoading(true);

    const response = await updateBike(form);
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
    dispatch(setBikeToEdit(null as any));
    dispatch(getBikes({ currentPage, query, rows }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(bikeToEdit) {
      handleUpdate();
    } else {
      handleCreate();
    }
  }

  useEffect(() => {
    if(bikeToEdit) {
      console.log("PRODUTO", bikeToEdit)
      setForm(bikeToEdit as any)
    }else {
      setForm(initialForm)
    }
    setErrors({});
  }, [bikeToEdit]);

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
              {bikeToEdit ? 'Editar': 'Criar'} Bike
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
            id="description"
            name="description"
            label="Descrição"
            placeholder="Descrição"
            fullWidth
            value={form.description}
            onChange={(e) => handleForm("description", e.target.value)}
            error={!!errors.description}
            helperText={errors.description && errors.description.map(e => e)}
          />
          <TextField
            type="text"
            id="quantity"
            name="quantity"
            label="Quantidade"
            placeholder="Quantidade"
            fullWidth
            required
            value={form.quantity}
            onChange={(e) => handleForm("quantity", valueOnlyDigits(e.target.value))}
            error={!!errors.quantity}
            helperText={errors.quantity && errors.quantity.map(e => e)}
          />
          <Box display="flex" gap={2} justifyContent="center"> 
            <Button type="submit" variant="contained" disabled={loading}>{bikeToEdit ? "Editar" : "Criar"}</Button>
            <Button type="button" color='error' variant="contained" disabled={loading} onClick={toggleDrawer}>cancelar</Button>
          </Box>

      </Box>
    </Drawer>
  )
}