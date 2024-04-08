'use client'

import { Button } from '@mui/material';
import { useAppDispatch } from "@/src/store";
import { setBikeToEdit, handleDrawer } from '@/src/store/bikeSlice';

export default function CustomToolbar () {
  const dispatch = useAppDispatch();

  const openDrawer = () => {
    dispatch(setBikeToEdit(null as any));
    dispatch(handleDrawer(true));
  }

  return(
     <>
      <Button sx={{ml: 2}} variant="contained" onClick={openDrawer}>
        Criar
      </Button>
     </>
   );
 
}