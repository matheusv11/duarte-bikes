'use client'
import Image from 'next/image';
import logo from '@/public/images/instagram.webp';
import {Paper, Box, Button, Typography, TextField, Avatar, Grid, IconButton, InputAdornment } from '@mui/material';
import Link from "next/link";
import UploadIcon from '@mui/icons-material/Upload';
import { register } from '@/src/lib/authActions';
import { useEffect, useMemo, useState } from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FiletoBase64 } from '@/src/lib/utils';

// Adicionar mascara de telefone
// Pegar foto do celular e camera
// Campo confirmar senha
// Ao concluir, aparecer um alert na tela falando que o pedido foi realizado
// Exemplo no placeholder do endereço

export default function RegisterForm() {

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [opacityAvatar, setOpacityAvatar] = useState<number>(1);

  const [userData, setUserData] = useState({
    name: '',
    cpf: '',
    address: '',
    cellphone: '',
    password: '',
    image: ''
  }); // Tipar

  const hasFilledAllFields = useMemo(() => (Object.entries(userData).every(([_key, v]) => v)), [userData]) // Validar mascaras

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const error = await register(userData);
    // if (error) setError(error)
    setLoading(false);
  }

  const handleClickShowPassword = () => setShowPassword(!true);
  const handleMouseDownPassword = () => setShowPassword(!false);
  const handleOpacityAvatar = () => setOpacityAvatar(opacityAvatar === 1 ? 0.2 : 1);

  const handleUserData = (field: keyof typeof userData, val: string) => setUserData(state => ({...state, [field]: val}))

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setSelectedImage(file);
      const formData = new FormData();
      formData.append('file', file)
      handleUserData('image', formData);
      // FiletoBase64(file).then((f) => handleUserData('image', f as any));
    }
  };
  return (
    <Box sx={{margin: 'auto', width: 450, p: 1}} component="form" onSubmit={handleRegister}>
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
            height={100}
            alt="duarte logo"
          />
        </Link>

        <TextField 
          required
          type='text'
          fullWidth
          label="Nome completo"
          variant="outlined"
          onChange={(e) => handleUserData('name', e.target.value)}
          value={userData.name}
        />

        <TextField 
          required
          type='tel'
          fullWidth
          label="CPF"
          variant="outlined"
          onChange={(e) => handleUserData('cpf', e.target.value)}
          value={userData.cpf}
        />

        <TextField 
          required
          type='tel'
          fullWidth
          label="Endereço"
          variant="outlined"
          onChange={(e) => handleUserData('address', e.target.value)}
          value={userData.address}
        />

        <TextField 
          required
          type='tel'
          fullWidth
          label="Celular"
          variant="outlined"
          onChange={(e) => handleUserData('cellphone', e.target.value)}
          value={userData.cellphone}
        />

        <IconButton
          sx={{
            height: 129,
            minWidth: 129,
            borderRadius: '10px',
            border: '1px solid black',
            padding: 0,
          }}
          color="primary"
          aria-label="upload picture"
          component="label"
          onMouseEnter={handleOpacityAvatar}
          onMouseLeave={handleOpacityAvatar}
            >
              <input
                name="file"
                hidden
                accept="image/*"
                type="file"
                onChange={handleUploadFile}
              />
              <Box>
                <Avatar
                  sx={{
                    height: 127,
                    minWidth: 127,
                    borderRadius: '10px',
                    opacity: opacityAvatar,
                  }}
                  src={selectedImage ? URL.createObjectURL(selectedImage) : ""}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: +(opacityAvatar !== 1),
                  }}
                >
                  <UploadIcon color="primary" fontSize="large" />
                  <Typography color="primary" variant="body2">
                    Adicionar
                  </Typography>
                </Box>
              </Box>
        </IconButton>

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

        <Button variant="contained" type="submit" disabled={loading  || !hasFilledAllFields }>Cadastrar</Button>
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
  );
}
