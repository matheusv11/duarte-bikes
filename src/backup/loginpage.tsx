'use client'

import styles from "@/src/components/page.module.css";
import {Paper, Box, Button, Typography, TextField, Grid } from '@mui/material';
import Link from "next/link";
import { authenticate } from '@/src/lib/actions';
import { useState } from "react";

export default function Home() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await authenticate({email, password});
    setLoading(false);
  }

  return (
    <Grid container>

      <Grid item xs={11} md={3} sx={{margin: 'auto'}} component="form" onSubmit={handleLogin}>
        <Paper sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
          p: 2,
          gap: 2,
        }}>
          <Typography variant="body1">
            Login
          </Typography>

          <TextField fullWidth label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} value={email}/>
          <TextField fullWidth label="Senha" variant="outlined" onChange={(e) => setPassword(e.target.value)} value={password}/>
          <Button variant="contained" type="submit">Entrar</Button>
        </Paper>
      </Grid>
    </Grid>

  );
}
