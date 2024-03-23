'use client'
 // Tentar transformar em server
 // Melhorar esse componente

import { Box } from "@mui/material"
import SideNav from "@/src/components/navigation/sidenav";
import AppBar from '@/src/components/navigation/appbar'
import { useState } from "react";
import { styled } from '@mui/material/styles';
import { drawerWidth } from "@/src/constants/drawer";

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3), // Adicionar pra pagina inteira talvez
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
})); // Melhorar e adicionar apenas como um style

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
        <DrawerHeader />
        {children}
      </Main>
    </>
  );
}
