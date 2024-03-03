import {Button, Box, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box display="flex" justifyContent="center" margin="auto" flexDirection="column">
      <Typography variant="body1">
        Teste (Será uma home com informativos e links)
      </Typography>
      <Link href="/login">
        <Button variant="contained">Login</Button>
      </Link>
    </Box>
  );
}
