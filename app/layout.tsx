import type { Metadata } from "next";
import "@/app/components/globals.css";
import { inter } from '@/app/components/fonts';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/app/components/theme';
import { CssBaseline} from "@mui/material";
import styles from '@/app/components/page.module.css'; // Deixar só o global
import dynamic from "next/dynamic";

const ReduxProvider = dynamic(() => import("@/app/store/redux-provider"), {
  ssr: false
});


const PickerProvider = dynamic(() => import("@/app/providers/date-picker-provider"), {
  ssr: false
});


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
            <CssBaseline />
            <ReduxProvider>
              <PickerProvider>
              {children}
              </PickerProvider>
            </ReduxProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
