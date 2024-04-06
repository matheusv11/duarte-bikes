'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { deleteUser } from "@/src/lib/userActions";
import { getCustomers, setUserToDelete } from "@/src/store/userSlice";
import { useAppSelector, useAppDispatch } from "@/src/store";
import useTable from "@/src/lib/useTable";

export default function DeleteProductDialog () {
  const dispatch = useAppDispatch();
  const { userToDelete } = useAppSelector((state) => state.user);
  const { rows, query, currentPage } = useTable();

  const delProduct = async () => { // Talvez deixar no redux
    await deleteUser(userToDelete?.id as string);
    dispatch(setUserToDelete(null));
    dispatch(getCustomers({ rows, currentPage, query}));
  }
 
  const handleClose = () => dispatch(setUserToDelete(null));

  return (
    <>
    <Dialog
        open={!!userToDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Tem certeza que deseja deletar ${userToDelete?.name}`}
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