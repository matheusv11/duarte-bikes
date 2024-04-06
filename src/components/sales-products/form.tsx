'use client'

import { Button, TextField, Drawer, Typography, IconButton, Box, Autocomplete, CircularProgress, } from '@mui/material';
import { updateSelledProduct, createSelledProduct } from '@/src/lib/selledProductActions';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from "@/src/store";
import CloseIcon from '@mui/icons-material/Close';
import { TSelectedProduct } from '@/src/types/products';
import { fetchProductsToSale } from '@/src/lib/data';
import { useDebouncedCallback } from 'use-debounce';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { getSelledProducts, handleDrawer, setProductToEdit } from '@/src/store/saleProductSlice'
import {valueOnlyDigits, valueCurrencyMask } from "@/src/lib/utils";

type FormError = {
  name?: string[] | undefined;
  description?: string[] | undefined;
  buyed_value?: string[] | undefined;
  soldValue?: string[] | undefined;
  quantity?: string[] | undefined;
}

// Melhorar esses forms, componetizar pra reutilizar
const initialForm = { // Tipar
  product: {
    name: '',
  },
  date: new Date(),
  quantity: "",
  soldValue: "",
}


export default function ProductForm() {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<TSelectedProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { productToEdit, openDrawer } = useAppSelector((state) => state.saleProduct);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormError>({});// Tipar

  const handleForm = (field: string, val: string) => setForm({...form, [field]: val})
  const onAutocompleteChange = (e: any, value: any) => setForm({...form, product: value});
  const handleOpen = useMemo(() => (!!productToEdit || openDrawer), [productToEdit, openDrawer]);

  const getProducts = async (search?: string) => {
    setLoading(true);
    setProducts([]);
    try{
      const res = await fetchProductsToSale({query: search || ''});
      setProducts(res)
    }
    catch(e) {
      console.error(e); // Colocar alert
    }
    
    setLoading(false);
  };

  const closeDrawer = () => {
    dispatch(setProductToEdit(null))
    dispatch(handleDrawer(false))
  };

  const handleCreate = async() => {
    setLoading(true);

    const response = await createSelledProduct(form);
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
    closeDrawer();
    dispatch(getSelledProducts({}));
  }

  const handleUpdate = async () => {
    setLoading(true);

    const response = await updateSelledProduct(form);
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
    closeDrawer();
    dispatch(getSelledProducts({}));
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(productToEdit) {
      handleUpdate();
    }else {
      handleCreate();

    }
  }

  const handleSearchChange = useDebouncedCallback((event: any, value: string) => {
    if (form?.product?.name !== value) getProducts(value);
  }, 300);
  
  useEffect(() => {
    if (isOpen) {
      setErrors({});
      getProducts()
    }
  }, [isOpen]);

  useEffect(() => {

    if(productToEdit) {
      setForm(productToEdit)
    }
  }, [productToEdit]);

  return (
    <Drawer
      anchor='right'
      open={handleOpen}
      onClose={closeDrawer}
      PaperProps={{
        sx: { width: '100%', maxWidth: 450, p: 2 },
      }}
    >
      <Box display="flex" flexDirection="column" gap={2} component="form" onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              {productToEdit ? 'Editar' :'Registrar'} Venda
            </Typography>
            <IconButton
            size="small"
            onClick={closeDrawer}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Autocomplete
            id="product"
            disablePortal
            disabled={!!productToEdit}
            fullWidth
            aria-required
            value={form.product}
            getOptionLabel={(option) => option.name}
            onChange={onAutocompleteChange}
            onInputChange={handleSearchChange}
            // inputValue={search}
            options={products}
            loading={loading}
            open={isOpen}
            onOpen={() => {
              setIsOpen(true);
            }}
            onClose={() => {
              setIsOpen(false);
            }}
            renderInput={
              (params) => <TextField {...params} label="Produto" InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }} />
            }
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
            onChange={(e) => handleForm('quantity', valueOnlyDigits(e.target.value))}
            error={!!errors.quantity}
            helperText={errors.quantity && errors.quantity.map(e => e)}
          />
          <TextField
            fullWidth
            type="text"
            id="value"
            name="value"
            label="Valor (Valor vendido caso tenha feito desconto)"
            placeholder="Valor"
            value={valueCurrencyMask(form.soldValue.toString())}
            onChange={(e) => handleForm('soldValue', valueCurrencyMask(e.target.value))}
            error={!!errors.soldValue}
            helperText={errors.soldValue && errors.soldValue.map(e => e)}
          />
          <DateTimePicker
            value={form.date}
            onChange={(newValue) => setForm({...form, date: newValue as any})}
          />

          <Box display="flex" gap={2} justifyContent="center"> 
            <Button type="submit" variant="contained" disabled={loading}>{productToEdit ? 'Editar' : 'Criar'}</Button>
            <Button type="button" color='error' variant="contained" disabled={loading} onClick={closeDrawer}>cancelar</Button>
          </Box>

      </Box>
    </Drawer>
  )
}