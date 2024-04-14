'use client'

import { Button, TextField, Drawer, Typography, IconButton, Box, Autocomplete, CircularProgress, } from '@mui/material';
import { updateRent, createRent } from '@/src/lib/rentActions';
import {getRents, setRentToEdit, handleDrawer } from '@/src/store/rentSlice'
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from "@/src/store";
import CloseIcon from '@mui/icons-material/Close';
import { TSelectedProduct } from '@/src/types/products';
import { fetchBikesToRent, fetchCustomersToRent } from '@/src/lib/data';
import { useDebouncedCallback } from 'use-debounce';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {valueOnlyDigits, valueCurrencyMask } from "@/src/lib/utils";
import useTable from '@/src/lib/useTable';
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker';
import { SingleInputDateTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputDateTimeRangeField';

type FormError = {
  name?: string[] | undefined;
  description?: string[] | undefined;
  buyed_value?: string[] | undefined;
  value?: string[] | undefined;
  quantity?: string[] | undefined;
}

// Melhorar esses forms, componetizar pra reutilizar
const initialForm = { // Tipar
  bike: {
    name: '',
  },
  user: {
    name: ''
  },
  date: [null, null],
  value: "",
}


export default function ProductForm() {
  const dispatch = useAppDispatch();
  const [bikes, setBikes] = useState<TSelectedProduct[]>([]);
  const [customers, setCustomers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCustomer, setIsOpenCustomer] = useState(false);
  const { rentToEdit, openDrawer } = useAppSelector((state) => state.rent);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormError>({});// Tipar
  const { rows, query, currentPage } = useTable();

  const handleForm = (field: string, val: string) => setForm({...form, [field]: val})
  const onAutocompleteChange = (e: any, value: any) => setForm({...form, bike: value});
  const onAutocompleteChangeCustomer = (e: any, value: any) => setForm({...form, user: value});
  const handleOpen = useMemo(() => (!!rentToEdit || openDrawer), [rentToEdit, openDrawer]);

  const readELement = () => {
    let timer1 = setTimeout(() => {
      const elemento = document.querySelector("[style='position: absolute; pointer-events: none; color: rgba(130, 130, 130, 0.62); z-index: 100000; width: 100%; text-align: center; bottom: 50%; right: 0px; letter-spacing: 5px; font-size: 24px;']")
      elemento?.remove()
    }, 1 * 100);

    return () => {
      clearTimeout(timer1);
    };

  }

  const getBikes = async (search?: string) => {
    setLoading(true);
    setBikes([]);
    try{
      const res = await fetchBikesToRent({query: search || ''});
      setBikes(res)
    }
    catch(e) {
      console.error(e); // Colocar alert
    }
    
    setLoading(false);
  };

  const getCustomers = async (search?: string) => {
    setLoading(true);
    setCustomers([]);
    try{
      const res = await fetchCustomersToRent({query: search || ''});
      console.log('Custom', res)
      setCustomers(res)
    }
    catch(e) {
      console.error(e); // Colocar alert
    }
    
    setLoading(false);
  };


  const closeDrawer = () => {
    setForm(initialForm)
    dispatch(setRentToEdit(null))
    dispatch(handleDrawer(false))
  };

  const handleCreate = async() => {
    setLoading(true);

    const response = await createRent(form);
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
    dispatch(getRents({}));
  }

  const handleUpdate = async () => {
    setLoading(true);

    const response = await updateRent(form);
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
    dispatch(getRents({ currentPage, query, rows }));
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(rentToEdit) {
      handleUpdate();
    }else {
      handleCreate();

    }
  }

  const handleSearchChange = useDebouncedCallback((event: any, value: string) => {
    if (form?.bike?.name !== value) getBikes(value);
  }, 300);

  const handleSearchChangeCustomers = useDebouncedCallback((event: any, value: string) => {
    if (form?.user?.name !== value) getCustomers(value);
  }, 300);
  
  useEffect(() => {
    if (isOpen) {
      setErrors({});
      getBikes()
    }
  }, [isOpen]);

    
  useEffect(() => {
    if (isOpenCustomer) {
      setErrors({});
      getCustomers()
    }
  }, [isOpenCustomer]);

  useEffect(() => {

    if(rentToEdit) {
      setForm(rentToEdit)
    }
  }, [rentToEdit]);

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
              {rentToEdit ? 'Editar' :'Registrar'} Venda
            </Typography>
            <IconButton
            size="small"
            onClick={closeDrawer}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Autocomplete
            id="bike"
            disablePortal
            disabled={!!rentToEdit}
            fullWidth
            aria-required
            value={form.bike}
            getOptionLabel={(option) => option.name}
            onChange={onAutocompleteChange}
            onInputChange={handleSearchChange}
            // inputValue={search}
            options={bikes}
            loading={loading}
            open={isOpen}
            onOpen={() => {
              setIsOpen(true);
            }}
            onClose={() => {
              setIsOpen(false);
            }}
            renderInput={
              (params) => <TextField {...params} label="Bike" InputProps={{
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

        <Autocomplete
            id="user"
            disablePortal
            disabled={!!rentToEdit}
            fullWidth
            aria-required
            value={form.user}
            getOptionLabel={(option) => option.name}
            onChange={onAutocompleteChangeCustomer}
            onInputChange={handleSearchChangeCustomers}
            // inputValue={search}
            options={customers}
            loading={loading}
            open={isOpenCustomer}
            onOpen={() => {
              setIsOpenCustomer(true);
            }}
            onClose={() => {
              setIsOpenCustomer(false);
            }}
            renderInput={
              (params) => <TextField {...params} label="Cliente" InputProps={{
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
            type="text"
            id="value"
            name="value"
            label="Valor"
            placeholder="Valor"
            value={valueCurrencyMask(form.value.toString())}
            onChange={(e) => handleForm('value', valueCurrencyMask(e.target.value))}
            error={!!errors.value}
            helperText={errors.value && errors.value.map(e => e)}
          />

          <DateTimeRangePicker
            onOpen={readELement}
            value={form.date}
            slots={{ field: SingleInputDateTimeRangeField }} 
            onChange={(newValue) => setForm({...form, date: newValue as any})}
          />

          <Box display="flex" gap={2} justifyContent="center"> 
            <Button type="submit" variant="contained" disabled={loading}>{rentToEdit ? 'Editar' : 'Criar'}</Button>
            <Button type="button" color='error' variant="contained" disabled={loading} onClick={closeDrawer}>cancelar</Button>
          </Box>

      </Box>
    </Drawer>
  )
}