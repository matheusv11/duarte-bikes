'use client'

import { Button, TextField, Grid, Accordion, AccordionSummary,AccordionDetails, } from '@mui/material';
import { createProduct, updateProduct } from '@/app/lib/actions';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSelector, useAppDispatch } from "@/app/store";
import { setProductState } from "@/app/store/productSlice";
// Melhorar esses forms, componetizar pra reutilizar
const initialForm = { // Tipar
  name: "",
  description: "",
  buyed_value: 0,
  sold_value: 0,
  quantity: 0,
}

type FormError = {
  name?: string[] | undefined;
  description?: string[] | undefined;
  buyed_value?: string[] | undefined;
  sold_value?: string[] | undefined;
  quantity?: string[] | undefined;
}

export default function ProductForm() {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);

  const [form, setForm] = useState(initialForm);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormError>({});// Tipar

  const handleForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
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
    dispatch(setProductState(null as any))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(product) {
      handleUpdate();
    } else {
      handleCreate();
    }
  }

  const toggleAccordion = () => {
    console.log("Toggle", expanded);
    setExpanded(!!product && !expanded);
  }

  useEffect(() => {
    if(product) setForm(product as any)
  }, [product]);
  
  return (
    <Accordion sx={{width: '100%'}} expanded={expanded}>
      <AccordionSummary
      onClick={toggleAccordion}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        {`${product ? "Editar" : "Cadastrar"}  produto`}
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2} alignItems="center" component="form" onSubmit={handleSubmit}>
          <Grid item md={2} xs={6}>
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
          </Grid>
          <Grid item md={2} xs={6}>
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
          </Grid>
          <Grid item md={1.5} xs={6}>
            <TextField
              fullWidth
              required
              type="number"
              id="buyed_value"
              name="buyed_value"
              label="Valor comprado"
              placeholder="Valor comprado"
              value={form.buyed_value}
              onChange={handleForm}
              error={!!errors.buyed_value}
              helperText={errors.buyed_value && errors.buyed_value.map(e => e)}
            />
          </Grid>
          <Grid item md={1.5} xs={6}>
            <TextField
              fullWidth
              required
              type="number"
              id="sold_value"
              name="sold_value"
              label="Valor vendido"
              placeholder="Valor vendido"
              value={form.sold_value}
              onChange={handleForm}
              error={!!errors.sold_value}
              helperText={errors.sold_value && errors.sold_value.map(e => e)}
            />
          </Grid>
          <Grid item md={1.5} xs={6}>
            <TextField
              fullWidth
              required
              type="number"
              id="quantity"
              name="quantity"
              label="Quantidade"
              placeholder="Quantidade"
              value={form.quantity}
              onChange={handleForm}
              error={!!errors.quantity}
              helperText={errors.quantity && errors.quantity.map(e => e)}
            />
          </Grid>
          <Grid item md={1} xs={6}>
            <Button type="submit" variant="contained" disabled={loading}>{product ? "Editar" : "Criar"}</Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}