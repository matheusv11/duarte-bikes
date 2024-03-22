// 'use client' // Não precisa do client mais, acho que por conta do pai ser um client já
'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { styled, useTheme } from '@mui/material/styles';
import {Accordion, AccordionSummary,AccordionDetails, Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Button } from "@mui/material"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Routes } from '@/app/types/routes';
import { drawerWidth } from "@/app/constants/drawer";
import { logout } from '@/app/lib/actions';

const appRoutes: Routes = [
  {
    name: 'Admin',
    href: '/admin',
    icon: <InboxIcon/>,
    children: [{  name: 'Produtos',
    href: '/admin/products',
    icon: <InboxIcon/>},  {
      name: 'Clientes',
      href: '/admin/clients',
      icon: <MailIcon/>
    },]
  },
  {
    name: 'Produtos',
    href: '/admin/products',
    icon: <InboxIcon/>
  },
  {
    name: 'Vendas',
    href: '/admin/sales',
    icon: <InboxIcon/>
  },
  {
    name: 'Clientes',
    href: '/admin/clients',
    icon: <MailIcon/>
  },
  {
    name: 'Alugueis',
    href: '/admin/rentals',
    icon: <InboxIcon/>
  },
  {
    name: 'Logout',
    action: logout,
    href: '',
    icon: <InboxIcon/>
  }
];

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface SideNav {
  open: boolean;
  handleDrawer: () => void;
}

interface LinkButton {
  href: string;
  name: string;
  action?: () => void;
  pathname: string;
  icon?: React.ReactNode;
}

interface SideLinks {
  routes: Routes;
  pathname: string;
}

const LinkButton = ({href, action, name, pathname, icon }: LinkButton) => {
  
  const BtnContent = (
    <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      // width: '100%',
      cursor: 'pointer',
      p: 2,
      height: 40,
      color: pathname === href ? 'white' : 'black',
      background: pathname === href ? 'orange' : 'white'
    }}
    onClick={() => {
      if(action) action();
    }}
  >
    {icon && <ListItemIcon sx={{ minWidth: '36px' }}>{icon}</ListItemIcon>}
    <ListItemText primary={name} primaryTypographyProps={{ textAlign: 'start', variant: 'body2' }} />
  </Box>
  )
  return(
    <>
    {action ?  BtnContent:  <Link href={href} style={{width: '100%'}}>
    {BtnContent}
   </Link>
   }
    </>
  )


 
};

// Verificar se tá bom o desempenho do recursivo

const SideLinks = ({routes, pathname}: SideLinks) => (
  <List>
    {routes.map((r) => (
      <ListItem key={r.name} disablePadding>
        {r.children ?
          <Accordion sx={{width: '100%'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                color: pathname.split('/')[1] === r.href.split('/')[1] ? 'white' : 'black',
                background: pathname.split('/')[1] === r.href.split('/')[1] ? 'grey' : 'white'
              }}
            >
              <ListItemIcon>
                {r.icon}
              </ListItemIcon>

              <ListItemText primary={r.name} />
            </AccordionSummary>
            <AccordionDetails>
              <SideLinks routes={r.children} pathname={pathname}/>
            </AccordionDetails>
          </Accordion>
          :
          <LinkButton action={r.action} href={r.href} name={r.name} pathname={pathname} icon={r.icon}/>}
      </ListItem>
    ))}
  </List>
);

export default function SideNav({ open, handleDrawer }: SideNav) {
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <Drawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      },
    }}
    variant="persistent"
    anchor="left"
    open={open}
  >
    <DrawerHeader>
      <IconButton onClick={handleDrawer}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </DrawerHeader>
    <Divider />
    <SideLinks routes={appRoutes} pathname={pathname}/>
  </Drawer>
  );
}