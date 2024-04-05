'use client'

import { Button } from '@mui/material';
import { setUserToEdit, handleDrawer } from "@/src/store/userSlice";
import { useAppDispatch } from "@/src/store";

export default function CustomToolbar () {
  const dispatch = useAppDispatch();

  const openDrawer = () => {
    dispatch(setUserToEdit(null as any));
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