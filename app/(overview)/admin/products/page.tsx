import { Box, Accordion, AccordionSummary,AccordionDetails, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductsTable from '@/app/ui/products/table'
import ProductForm from '@/app/ui/products/product-form'
import { fetchProducts } from '@/app/lib/data';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    rows?: string;
  };
}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const rows = Number(searchParams?.rows) || 5; // Para teste

  const products = await fetchProducts({query: query, page: currentPage, perPage: rows }); // Talvez só passar pro products

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
     
      <ProductsTable products={products.products} totalCount={products.count}/>
    </Box>
  );
}
