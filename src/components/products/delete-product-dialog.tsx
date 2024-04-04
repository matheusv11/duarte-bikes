'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { deleteProduct } from "@/src/lib/productActions";
import { getProducts, setProductToDelete } from "@/src/store/productSlice";
import { useAppSelector, useAppDispatch } from "@/src/store";
import useTable from "@/src/lib/useTable";

export default function DeleteProductDialog () {
  const dispatch = useAppDispatch();
  const { productToDelete } = useAppSelector((state) => state.product);
  const { rows, query, currentPage } = useTable();

  const delProduct = async () => { // Talvez deixar no redux
    await deleteProduct(productToDelete?.id as string);
    dispatch(setProductToDelete(null));
    dispatch(getProducts({ rows, currentPage, query}));
  }
 
  const handleClose = () => dispatch(setProductToDelete(null));

  return (
    <>
    <Dialog
        open={!!productToDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Tem certeza que deseja deletar ${productToDelete?.name}`}
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