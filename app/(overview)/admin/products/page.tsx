import { Box } from '@mui/material';
import ProductsTable from '@/app/ui/products/table'
import ProductForm from '@/app/ui/products/product-form'

// TODO ->
// Transformar essa página em client?
// Usar redux ou context api?

export default async function Page() {

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <ProductForm/>
      <ProductsTable />
    </Box>
  );
}
