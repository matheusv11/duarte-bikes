import { Box, Accordion, AccordionSummary,AccordionDetails, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductsTable from '@/app/ui/products/table'
import ProductForm from '@/app/ui/products/product-form'
import { fetchProducts } from '@/app/lib/data';

export default async function Home() {

  const products = await fetchProducts(); // O ideal seria deixar na propria table, mas ai não funciona com o server

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Accordion sx={{width: '100%'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {/* <ListItemIcon>
            {r.icon}
          </ListItemIcon> */}
          Cadastrar produto
        </AccordionSummary>
        <AccordionDetails>
          <ProductForm/>
        </AccordionDetails>
      </Accordion>
     
      <ProductsTable products={products}/>
    </Box>
  );
}
