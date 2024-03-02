import type { Metadata } from "next";
import "@/app/ui/globals.css";
import { inter } from '@/app/ui/fonts';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/app/ui/theme';
import { Grid } from "@mui/material";
import styles from '@/app/ui/page.module.css'; // Deixar só o global
import SideNav from "./sidenav";

export const metadata: Metadata = {
  title: "Duarte Bikes",
  description: "Locação de bikes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.main}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
