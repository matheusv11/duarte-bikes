import { Box } from '@mui/material';
import ProductsTable from '@/app/ui/products/table'
import ProductForm from '@/app/ui/products/product-form'

export default function Page() {

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <ProductForm/>
      <ProductsTable />
    </Box>
  );
}
