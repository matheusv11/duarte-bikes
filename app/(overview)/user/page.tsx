import styles from "@/app/components/page.module.css";
import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <main className={styles.main}>
      <Box>
        <Typography variant="body1">
          Página do usuário
        </Typography>
      </Box>
    </main>
  );
}
