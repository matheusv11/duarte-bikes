import { Box, Accordion, AccordionSummary,AccordionDetails, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductsTable from '@/app/ui/products/table'
import ProductForm from '@/app/ui/products/product-form'

export default async function Page() {

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Accordion sx={{width: '100%'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Cadastrar produto
        </AccordionSummary>
        <AccordionDetails>
          <ProductForm/>
        </AccordionDetails>
      </Accordion>
     
      <ProductsTable />
    </Box>
  );
}
