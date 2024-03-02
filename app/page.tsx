import Image from "next/image";
import styles from "@/app/ui/page.module.css";
import {Button, Box, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <Box>
        <Typography variant="body1">
          Teste (Será uma home com informativos e links)
        </Typography>
        <Link href="/login">
          <Button variant="contained">Login</Button>
        </Link>
      </Box>
    </main>
  );
}
