import styles from "@/app/ui/page.module.css";
import {Paper, Box, Button, Typography, TextField, Grid } from '@mui/material';
import Link from "next/link";

export default function Home() {
  return (
    <Grid container>

      <Grid item xs={11} md={3} sx={{margin: 'auto'}}>
        <Paper sx={{
          p: 2, display: 'flex',
          flexDirection: 'column', alignItems: 'center', gap: 2,
        }}>
          <Typography variant="body1">
            Login
          </Typography>

          <TextField fullWidth label="Email" variant="outlined"/>
          <TextField fullWidth label="Senha" variant="outlined"/>
          <Link href="/admin">
            <Button variant="contained">Entrar</Button>
          </Link>
        </Paper>
      </Grid>
    </Grid>

  );
}
