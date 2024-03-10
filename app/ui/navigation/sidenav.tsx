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
    name: 'Clientes',
    href: '/admin/clients',
    icon: <MailIcon/>
  },
  {
    name: 'Alugueis',
    href: '/admin/rentals',
    icon: <InboxIcon/>
  },
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
  pathname: string;
  icon?: React.ReactNode;
}

interface SideLinks {
  routes: Routes;
  pathname: string;
}

const LinkButton = ({href, name, pathname, icon }: LinkButton) => (
  <Link href={href} style={{width: '100%'}}>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        // width: '100%',
        height: 40,
        background: pathname === href ? 'blue' : 'white'
      }}
    >
      {icon && <ListItemIcon sx={{ minWidth: '36px' }}>{icon}</ListItemIcon>}
      <ListItemText primary={name} primaryTypographyProps={{ textAlign: 'start', variant: 'body2' }} />
    </Box>
  </Link>
);

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
                background: pathname.split('/')[1] === r.href.split('/')[1] ? 'red' : 'white'
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
          <LinkButton href={r.href} name={r.name} pathname={pathname} icon={r.icon}/>}
      </ListItem>
    ))}
    <ListItem disablePadding>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: 40,
          // background: pathname === href ? 'blue' : 'white'
        }}
      >
        {/* {icon && <ListItemIcon sx={{ minWidth: '36px' }}>{icon}</ListItemIcon>} */}
        <Button onClick={() => logout()} >
          Logout
        </Button>
        {/* <ListItemText primary={"Logout"} primaryTypographyProps={{ textAlign: 'start', variant: 'body2' }} /> */}
      </Box>
    </ListItem>
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