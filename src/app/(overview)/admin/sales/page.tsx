"use client" // Temporário

import { Box } from '@mui/material';
import SalesTable from '@/src/components/sales-products/table'
import SalesForm from '@/src/components/sales-products/form'
import {useState, useEffect, useCallback } from 'react';
import { fetchSelledProducts } from '@/src/lib/data';
import { Product } from '@/src/types/products';
import { usePathname, useSearchParams, useRouter} from 'next/navigation';

// Ao deletar produto, limpar formulario

export default function Page() {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]); // Nem precisa do redux nesse caso, mas deixa para exemplo
  const [totalCount, setTotalCount] = useState<number>(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [totalValue, setTotalValue] = useState(0);

  const currentPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';
  const rows = Number(searchParams.get('rows')) || 5;
  const startDate = searchParams.get('start') || '';
  const endDate =  searchParams.get('end') || '';
  
  const fetchAllProducts = useCallback( async () => {
    setLoading(true);
    setProducts([]);
    try{
      const res = await fetchSelledProducts(
        { 
          query: query,
          page: currentPage,
          perPage: rows,
          startDate: startDate,
          endDate: endDate
        }
      );
      console.log("Responsa", res);
      setProducts(res.products as any)
      setTotalCount(res.count);
      setTotalValue(res.totalValue)
    }
    catch(e) {
      console.error(e); // Colocar alert
    }
    
    setLoading(false);
  }, [searchParams]);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const handleDrawer = (open: boolean) => setOpenDrawer(open);

  return (
    <>
      <SalesTable
        toggleDrawer={handleDrawer}
        refetch={fetchAllProducts}
        products={products}
        totalValue={totalValue}
        totalCount={totalCount}
        loading={loading}
        currentPage={currentPage}
        rows={rows}
      />
      <SalesForm open={openDrawer} toggleDrawer={handleDrawer} refetch={fetchAllProducts}/>
    </>
  );
}
