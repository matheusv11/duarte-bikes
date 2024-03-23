'use client'; // Tentar transformar em server

// import styles from "@/app/components/page.module.css";
import Image from 'next/image';
import logo from '@/public/images/instagram.webp';
import {Paper, Box, Button, Typography, TextField, Grid, IconButton, InputAdornment } from '@mui/material';
import Link from "next/link";
import { register } from '@/app/lib/actions';
import { useState } from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// export const metadata: Metadata = { // Para uso isso precisar ser server, logo transformar esse form em component e importar
//   title: "Login",
//   description: "Locação de bikes",
// };

// Adicionar mascara de telefone
// Pegar foto do celular e camera
// Campo confirmar senha
// Exemplo no placeholder do endereço

export default function Register() {

  const [cellphone, setCellphone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [userData, setUserData] = useState({
    name: '',
    cpf: '',
    address: '',
    cellphone: '',
    password: '',
    image: ''
  }); // Tipar

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const error = await register({cellphone, password}); // Só retorna uma string, melhorar e desestruturar um error
    // if (error) setError(error)
    setLoading(false);
  }

  const handleForm = (field: keyof typeof userData, value: string) => {
    setUserData((state) => ({...state, [field]: value}))
  }

  const handleClickShowPassword = () => setShowPassword(!true);
  const handleMouseDownPassword = () => setShowPassword(!false);

  const handleUserData = (field: keyof typeof userData, val: string) => {
    setUserData(state => ({...state, [field]: val}))
  }

  // Padronizar com o login
  // Se colocar xs={12} e p:1, fica menos espaçado dos lados, todavia, pode usar xs={11.5} que fica similar
  return (
    <Grid container>
      <Grid item md={4} xs={11} sx={{margin: 'auto'}} component="form" onSubmit={handleRegister}>
        <Paper elevation={6} sx={{
          // display: 'flex',
          // flexDirection: 'column',
          // alignItems: 'center', 
          p: 2,
          // gap: 2,
          
        }}>
          <Grid item container spacing={2}>

            <Grid item md={12} xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
              <Link href="/">
                <Image
                  src={logo}
                  height={100}
                  alt="duarte logo"
                />
              </Link>
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField 
                required
                type='text'
                fullWidth
                label="Nome completo"
                variant="outlined"
                onChange={(e) => handleUserData('name', e.target.value)}
                value={userData.name}
              />
            </Grid>


            <Grid item md={6} xs={12}>
              <TextField 
                required
                type='tel'
                fullWidth
                label="CPF"
                variant="outlined"
                onChange={(e) => handleUserData('cpf', e.target.value)}
                value={userData.cpf}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField 
                required
                type='tel'
                fullWidth
                label="Endereço"
                variant="outlined"
                onChange={(e) => handleUserData('address', e.target.value)}
                value={userData.address}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField 
                required
                type='tel'
                fullWidth
                label="Celular"
                variant="outlined"
                onChange={(e) => handleUserData('cellphone', e.target.value)}
                value={userData.cellphone}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField 
                required
                type='file'
                fullWidth
                label="Foto"
                variant="outlined"
                onChange={(e) => handleUserData('image', e.target.value)}
                value={userData.image}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                required
                type={showPassword ? "text" : "password"} 
                fullWidth
                label="Senha"
                variant="outlined"
                onChange={(e) => handleUserData('password', e.target.value)}
                value={userData.password}
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
            </Grid>

            <Grid item md={12} xs={12} sx={{ display: 'flex', justifyContent: 'center',  alignItems: 'center', flexDirection: 'column', gap: 1}}>
              <Button variant="contained" type="submit" disabled={loading}>Cadastrar</Button>
              <Box display="flex">
                {error && (
                  <>
                    <ErrorOutlineIcon color="error" />
                    <Typography color="error">{error}</Typography>
                  </>
                )}
                
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
