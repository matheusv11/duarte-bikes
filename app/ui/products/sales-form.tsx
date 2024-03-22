'use client'

import { Button, TextField, Drawer, Typography, IconButton, Box, Autocomplete, CircularProgress, } from '@mui/material';
import { createSelledProduct, updateProduct } from '@/app/lib/actions';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from "@/app/store";
import { setProductState } from "@/app/store/productSlice";
import CloseIcon from '@mui/icons-material/Close';
import { Product } from '@/app/types/products';
import { fetchProducts } from '@/app/lib/data';
import { useDebouncedCallback } from 'use-debounce';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

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

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  }
]

// Melhorar esses forms, componetizar pra reutilizar
const initialForm = { // Tipar
  product: {
    label: ''
  },
  date: new Date(),
  quantity: 0,
  sold_value: 0,
}


export default function ProductForm({open, refetch, toggleDrawer }: IProductForm) {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const options = useMemo(() => products.map(p => ({ id: p.id, label: p.name})), [products])

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormError>({});// Tipar

  const handleForm = (field: string, val: string) => {
    setForm({...form, [field]: val});
  }

  const onAutocompleteChange = (e: any, value: string[]) => {
    console.log("Valor", value)
    setForm({...form, product: value});
  };

  const getProducts = async (search?: string) => {
    setLoading(true);
    setProducts([]);
    try{
      const res = await fetchProducts({query: search || ''});
      setProducts(res.products)
    }
    catch(e) {
      console.error(e); // Colocar alert
    }
    
    setLoading(false);
  };



  const handleOpen = useMemo(() => (open || !!product), [open, product]);
  const handleDrawer = () => {
    if(product) {

      dispatch(setProductState(null as any));
    }else {
      toggleDrawer(false);
    }
  }

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
    handleDrawer();
    refetch();
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
    refetch()
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(product) {
      handleUpdate();
    } else {
      handleCreate();
    }
  }

    const handleSearchChange = useDebouncedCallback((event: any, value: string) => {

      // Chamando duas vezes
      console.log("Buscou", value);
      getProducts(value);
  }, 300);
  
  useEffect(() => {
    if (isOpen) {
      getProducts()
    }
  }, [isOpen]);

  return (
    <Drawer
      anchor='right'
      open={handleOpen}
      onClose={handleDrawer}
      PaperProps={{
        sx: { width: '100%', maxWidth: 450, p: 2 },
      }}
    >
      <Box display="flex" flexDirection="column" gap={2} component="form" onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              Registrar Venda
            </Typography>
            <IconButton
            size="small"
            onClick={handleDrawer}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Autocomplete
            disablePortal
            fullWidth
            aria-required
            id="product"
            value={form.product}
            onChange={onAutocompleteChange}
            onInputChange={handleSearchChange}
            // inputValue={search}
            options={options}
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
            type="number"
            id="quantity"
            name="quantity"
            label="Quantidade"
            placeholder="Quantidade"
            value={form.quantity}
            onChange={(e) => handleForm('quantity', e.target.value)}
            error={!!errors.quantity}
            helperText={errors.quantity && errors.quantity.map(e => e)}
          />
          <TextField
            fullWidth
            required
            type="number"
            id="value"
            name="value"
            label="Valor"
            placeholder="Valor"
            value={form.sold_value}
            onChange={(e) => handleForm('sold_value', e.target.value)}
            error={!!errors.sold_value}
            helperText={errors.sold_value && errors.sold_value.map(e => e)}
          />
          <DateTimePicker
            value={form.date}
            onChange={(newValue) => setForm({...form, date: newValue})}
          />

          <Box display="flex" gap={2} justifyContent="center"> 
            <Button type="submit" variant="contained" disabled={loading}>{product ? "Editar" : "Criar"}</Button>
            <Button type="button" color='error' variant="contained" disabled={loading} onClick={handleDrawer}>cancelar</Button>
          </Box>

      </Box>
    </Drawer>
  )
}