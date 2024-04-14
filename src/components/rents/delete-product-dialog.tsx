'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { deleteRent } from "@/src/lib/rentActions";
import { getRents, setRentToDelete } from "@/src/store/rentSlice";
import { useAppSelector, useAppDispatch } from "@/src/store";
import useTable from "@/src/lib/useTable";

export default function DeleteProductDialog () {
  const dispatch = useAppDispatch();
  const { rentToDelete } = useAppSelector((state) => state.rent);
  const { rows, query, currentPage } = useTable();

  const delProduct = async () => { // Talvez deixar no redux
    await deleteRent(rentToDelete?.id as string);
    dispatch(setRentToDelete(null));
    dispatch(getRents({ rows, currentPage, query}));
  }
 
  const handleClose = () => dispatch(setRentToDelete(null));

  return (
    <>
    <Dialog
        open={!!rentToDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Tem certeza que deseja deletar o aluguel de ${rentToDelete?.name}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            A ação seguinte não será reversível
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Button color="error" onClick={delProduct} autoFocus>
            Apagar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}