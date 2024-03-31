'use client'

import { Button, TextField, Drawer, Typography, IconButton, Box, } from '@mui/material';
import { createProduct, updateProduct } from '@/src/lib/productActions';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from "@/src/store";
import { setProductState, handleDrawer, getProducts } from "@/src/store/productSlice";
import CloseIcon from '@mui/icons-material/Close';
import {inputOnlyDigits, inputCurrencyMask } from '@/src/lib/utils';

// Melhorar esses forms, componetizar pra reutilizar
const initialForm = { // Tipar
  name: "",
  description: "",
  buyed_value: "",
  sold_value: "",
  quantity: "",
}

type FormError = {
  name?: string[] | undefined;
  description?: string[] | undefined;
  buyed_value?: string[] | undefined;
  sold_value?: string[] | undefined;
  quantity?: string[] | undefined;
}

interface IProductForm {
  open: boolean;
  refetch: () => void;
  toggleDrawer: (open: boolean) => void;
}

export default function ProductForm() {
  const dispatch = useAppDispatch();
  const {openDrawer, editProduct} = useAppSelector((state) => state.product);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormError>({});// Tipar

  const handleForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleOpen = useMemo(() => (openDrawer || !!editProduct), [openDrawer, editProduct]);

  const toggleDrawer = () => {
    if(editProduct) {
      dispatch(setProductState(null as any));
    }else {
      dispatch(handleDrawer(false));
    }
  }

  const handleCreate = async() => {
    setLoading(true);

    const response = await createProduct(form);

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
    dispatch(getProducts({}))
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
    dispatch(setProductState(null as any));
    dispatch(getProducts({}))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(editProduct) {
      handleUpdate();
    } else {
      handleCreate();
    }
  }

  useEffect(() => {
    if(editProduct) {
      setForm(editProduct as any)
    }
  }, [editProduct]);

  const handleCurrency = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const mask = inputCurrencyMask(e);
    handleForm(mask);
  }

  const handleOnlyDigits = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const digits = inputOnlyDigits(e);
    handleForm(digits);
  }

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
              Criar Produto
            </Typography>
            <IconButton
            size="small"
            onClick={toggleDrawer}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <TextField
            fullWidth
            required
            id="name"
            name="name"
            label="Nome"
            placeholder="Nome"
            value={form.name}
            onChange={handleForm}
            error={!!errors.name}
            helperText={errors.name && errors.name.map(e => e)}
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Descrição"
            placeholder="Descrição"
            value={form.description}
            onChange={handleForm}
            error={!!errors.description}
            helperText={errors.description && errors.description.map(e => e)}
          />
          <TextField
            fullWidth
            required
            type="text"
            id="buyed_value"
            name="buyed_value"
            label="Valor comprado"
            placeholder="Valor comprado"
            value={form.buyed_value}
            onChange={handleCurrency}
            error={!!errors.buyed_value}
            helperText={errors.buyed_value && errors.buyed_value.map(e => e)}
          />
          <TextField
            fullWidth
            required
            type="text"
            id="sold_value"
            name="sold_value"
            label="Valor vendido"
            placeholder="Valor vendido"
            value={form.sold_value}
            onChange={handleCurrency}
            error={!!errors.sold_value}
            helperText={errors.sold_value && errors.sold_value.map(e => e)}
          />
          <TextField
            fullWidth
            required
            type="text"
            id="quantity"
            name="quantity"
            label="Quantidade"
            placeholder="Quantidade"
            value={form.quantity}
            onChange={handleOnlyDigits}
            error={!!errors.quantity}
            helperText={errors.quantity && errors.quantity.map(e => e)}
          />
          <Box display="flex" gap={2} justifyContent="center"> 
            <Button type="submit" variant="contained" disabled={loading}>{editProduct ? "Editar" : "Criar"}</Button>
            <Button type="button" color='error' variant="contained" disabled={loading} onClick={toggleDrawer}>cancelar</Button>
          </Box>

      </Box>
    </Drawer>
  )
}