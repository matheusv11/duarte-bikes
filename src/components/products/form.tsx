'use client'

import { Button, TextField, Drawer, Typography, IconButton, Box, } from '@mui/material';
import { createProduct, updateProduct } from '@/src/lib/productActions';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from "@/src/store";
import { setProductToEdit, handleDrawer, getProducts } from "@/src/store/productSlice";
import CloseIcon from '@mui/icons-material/Close';
import {valueOnlyDigits, valueCurrencyMask } from '@/src/lib/utils';

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

// Componentizar esses TextField e form de forma mais inteligente
export default function ProductForm() {
  const dispatch = useAppDispatch();
  const {openDrawer, productToEdit} = useAppSelector((state) => state.product);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormError>({});// Tipar

  const handleForm = (field: keyof typeof form, val: any) => setForm((state) => ({...state, [field]: val}));

  const handleOpen = useMemo(() => (openDrawer || !!productToEdit), [openDrawer, productToEdit]);

  const toggleDrawer = () => {
    if(productToEdit) {
      dispatch(setProductToEdit(null as any));
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
    dispatch(setProductToEdit(null as any));
    dispatch(getProducts({}))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(productToEdit) {
      handleUpdate();
    } else {
      handleCreate();
    }
  }

  useEffect(() => {
    if(productToEdit) {
      setForm(productToEdit as any)
    }else {
      setForm(initialForm)
    }
  }, [productToEdit]);

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
            id="buyed_value"
            name="buyed_value"
            label="Valor comprado"
            placeholder="Valor comprado"
            fullWidth
            required
            value={form.buyed_value}
            onChange={(e) => handleForm("buyed_value", valueCurrencyMask(e.target.value))}
            error={!!errors.buyed_value}
            helperText={errors.buyed_value && errors.buyed_value.map(e => e)}
          />
          <TextField
            type="text"
            id="sold_value"
            name="sold_value"
            label="Valor vendido"
            placeholder="Valor vendido"
            fullWidth
            required
            value={form.sold_value}
            onChange={(e) => handleForm("sold_value", valueCurrencyMask(e.target.value))}
            error={!!errors.sold_value}
            helperText={errors.sold_value && errors.sold_value.map(e => e)}
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
            <Button type="submit" variant="contained" disabled={loading}>{productToEdit ? "Editar" : "Criar"}</Button>
            <Button type="button" color='error' variant="contained" disabled={loading} onClick={toggleDrawer}>cancelar</Button>
          </Box>

      </Box>
    </Drawer>
  )
}