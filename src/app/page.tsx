import { Button, Box, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/images/logo.svg';
import { longText } from '@/src/lib/mock';

export default function Home() {
  return (

    <Box sx={{p: 1}}>
      <Box sx={{display:"flex", flexDirection: 'column',  gap: 2, }}>
        <Image
          src={logo}
          className="mr-2 rounded-full"
          // width={500}
          style={{margin: 'auto', borderRadius: '50%'}}
          height={350}
          alt={`profile picture`}
        />

        <Box sx={{margin: 'auto'}}>
          {/* Talvez usa flex mesmo, mas assim funciona bem */}
          <Link href="/login" style={{marginRight: 20}}>
            <Button color="success" variant="contained">Acessar</Button>
          </Link>

          {/* <Link href="/register">
            <Button variant="contained">Registrar-se</Button>
          </Link> */}
        </Box>

        <Typography variant="body1">
          {longText}
        </Typography>

        {/* <Grid container spacing={2}>
          {Array.from({ length: 22 }).map((currentElement, i) => (
            <Grid item md={2} xs={12} key={i}>
              <Image
              src={FlorPreta}
              className="mr-2 rounded-full"
              // width={500}
              style={{width: '100%'}}
              height={200}
              alt={`profile picture`}
              />
            </Grid>
          ))}
      
        </Grid> */}

      </Box>

    </Box>
  );
}
