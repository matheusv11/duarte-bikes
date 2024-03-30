'use client'; // Tentar transformar em server

// import styles from "@/src/styles/page.module.css";
import Image from 'next/image';
import logo from '@/public/images/instagram.webp';
import {Paper, Box, Button, Typography, TextField, Grid, IconButton, InputAdornment } from '@mui/material';
import Link from "next/link";
import { authenticate } from '@/src/lib/authActions';
import { useState } from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// export const metadata: Metadata = { // Para uso isso precisar ser server, logo transformar esse form em component e importar
//   title: "Login",
//   description: "Locação de bikes",
// };

// Adicionar mascara de telefone

export default function Login() {

  const [cellphone, setCellphone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const error = await authenticate({cellphone, password}); // Só retorna uma string, melhorar e desestruturar um error
    if (error) setError(error)
    setLoading(false);
  }

  const handleClickShowPassword = () => setShowPassword(!true);
  const handleMouseDownPassword = () => setShowPassword(!false);

  // Solução sem grid, mas não é tão responsiva
  // Setar um max e min width, como no final-example
  return (
    <Box sx={{ display:'flex', height: '100%' }}> 
    <Box sx={{margin: 'auto', width: 450, p: 1}} component="form" onSubmit={handleLogin}>
      <Paper elevation={6} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        p: 2,
        gap: 2,
        
      }}>
        <Link href="/">
          <Image
            src={logo}
            className="mr-2 rounded-full"
            height={100}
            alt="duarte logo"
          />
        </Link>

        <TextField 
          required
          type='tel'
          fullWidth
          label="Celular"
          variant="outlined"
          onChange={(e) => setCellphone(e.target.value)}
          value={cellphone}
        />
        <TextField
          required
          type={showPassword ? "text" : "password"} 
          fullWidth
          label="Senha"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button variant="contained" type="submit" disabled={loading}>Entrar</Button>
        <Box display="flex">
          {error && (
            <>
              <ErrorOutlineIcon color="error" />
              <Typography color="error">{error}</Typography>
            </>
          )}
          
        </Box>
      </Paper>
    </Box>
    </Box>

  );
}
