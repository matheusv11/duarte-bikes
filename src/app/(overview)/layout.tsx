'use client'
 // Tentar transformar em server
 // Melhorar esse componente

import { Box } from "@mui/material"
import SideNav from "@/src/components/navigation/sidenav";
import AppBar from '@/src/components/navigation/appbar'
import { useState } from "react";
import { styled } from '@mui/material/styles';
import { drawerWidth } from "@/src/lib/constants";

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(1)
  },
  padding: theme.spacing(3), // Adicionar pra pagina inteira talvez
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
  }),
}));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [open, setOpen] = useState(true);

  const handleDrawer = () => setOpen(!open)

  return (
    <>
      <AppBar open={open} handleDrawer={handleDrawer}/>

      <SideNav open={open} handleDrawer={handleDrawer}/>
      
      <Main open={open}>
        {children}
      </Main>
    </>
  );
}
