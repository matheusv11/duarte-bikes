'use client'

import { Button } from '@mui/material';
import { setProductState, handleDrawer } from "@/src/store/productSlice";
import { useAppDispatch } from "@/src/store";

export default function CustomToolbar () {
  const dispatch = useAppDispatch();

  const openDrawer = () => {
    dispatch(setProductState(null as any));
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