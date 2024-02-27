import Image from "next/image";
import styles from "@/app/ui/page.module.css";
import {Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <main className={styles.main}>
      <Box>
        <Typography variant="body1">
          Teste
        </Typography>
      </Box>
    </main>
  );
}
