'use client'
import {Button, Grid, Box, Typography } from '@mui/material';
import Link from 'next/link';
import AppBar from '@/app/ui/navigation/appbar'
import Image from 'next/image';
import logo from '@/public/images/instagram.webp';
import FlorPreta from '@/public/images/bora-bill.webp';
import BoraBill from '@/public/images/flor-preta.webp';
import Main from './ui/navigation/main';
import { longText } from '@/app/lib/mock';
const open = false;
const handleDrawer = () => {};

export default function Home() {
  return (

    <>
    {/* Remover depois appbar */}
    <AppBar open={open} handleDrawer={handleDrawer}/>
    
    <Main open={true}>
      <Box sx={{display:"flex", flexDirection: 'column', background: 'pink', gap: 2}}>
        <Image
          src={logo}
          className="mr-2 rounded-full"
          // width={500}
          style={{margin: 'auto'}}
          height={350}
          alt={`profile picture`}
        />

        <Box sx={{margin: 'auto'}}>
          {/* Talvez usa flex mesmo, mas assim funciona bem */}
          <Link href="/login" style={{marginRight: 20}}>
            <Button color="success" variant="contained">Acessar</Button>
          </Link>

          <Link href="/register">
            <Button variant="contained">Registrar-se</Button>
          </Link>
        </Box>

        <Typography variant="body1">
          {longText}
        </Typography>

        <Grid container spacing={2}>
          {Array.from({ length: 22 }).map((currentElement, i) => (
            <Grid item md={2} xs={12} key={i}>
              <Image
              src={FlorPreta}
              className="mr-2 rounded-full"
              // width={500}
              style={{width: '100%'}}
              height={200}
              alt={`profile picture`}
              />
            </Grid>
          ))}
      
        </Grid>

      </Box>
    </Main>

    </>
  );
}
