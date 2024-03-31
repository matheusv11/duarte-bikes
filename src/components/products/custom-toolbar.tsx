'use client'

import { Button } from '@mui/material';
import { setProductToEdit, handleDrawer } from "@/src/store/productSlice";
import { useAppDispatch } from "@/src/store";

export default function CustomToolbar () {
  const dispatch = useAppDispatch();

  const openDrawer = () => {
    dispatch(setProductToEdit(null as any));
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