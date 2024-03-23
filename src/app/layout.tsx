import type { Metadata } from "next";
import "@/src/components/globals.css";
import { inter } from '@/src/components/fonts';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/src/components/theme';
import { CssBaseline} from "@mui/material";
import styles from '@/src/components/page.module.css'; // Deixar só o global
import dynamic from "next/dynamic";

const ReduxProvider = dynamic(() => import("@/src/store/redux-provider"), {
  ssr: false
});


const PickerProvider = dynamic(() => import("@/src/providers/date-picker-provider"), {
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
