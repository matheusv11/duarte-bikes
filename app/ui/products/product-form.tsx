'use client'

import { Box, Button, TextField, Grid, Accordion, AccordionSummary,AccordionDetails, } from '@mui/material';
import { createProduct } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function ProductForm() {

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createProduct as any, initialState);

  return (
    <Grid container spacing={2} alignItems="center" component="form" action={dispatch}>
      <Grid item md={2} xs={6}>
        <TextField
          fullWidth
          required
          id="name"
          name="name"
          label="Nome"
          placeholder="Nome"
        />
      </Grid>
      <Grid item md={2} xs={6}>
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Descrição"
          placeholder="Descrição"
        />
      </Grid>
      <Grid item md={1} xs={6}>
        <TextField
          fullWidth
          required
          type="number"
          id="buyed_value"
          name="buyed_value"
          label="Valor comprado"
          placeholder="Valor comprado"
        />
      </Grid>
      <Grid item md={1} xs={6}>
        <TextField
          fullWidth
          required
          type="number"
          id="sold_value"
          name="sold_value"
          label="Valor vendido"
          placeholder="Valor vendido"
        />
      </Grid>
      <Grid item md={1} xs={6}>
        <TextField
          fullWidth
          required
          type="number"
          id="quantity"
          name="quantity"
          label="Quantidade"
          placeholder="Quantidade"
        />
      </Grid>
      <Grid item md={1} xs={6}>
        <Button type="submit" variant="contained">Criar</Button>
      </Grid>
    </Grid>
  )
}