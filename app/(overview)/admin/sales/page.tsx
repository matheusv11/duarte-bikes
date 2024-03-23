"use client" // Temporário

import { Box } from '@mui/material';
import SalesTable from '@/app/ui/products/sales-table'
import SalesForm from '@/app/ui/products/sales-form'
import {useState, useEffect, useCallback } from 'react';
import { fetchSelledProducts } from '@/app/lib/data';
import { Product } from '@/app/types/products';
import { usePathname, useSearchParams, useRouter} from 'next/navigation';

// Ao deletar produto, limpar formulario

export default function Page() {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]); // Nem precisa do redux nesse caso, mas deixa para exemplo
  const [totalCount, setTotalCount] = useState<number>(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  const currentPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';
  const rows = Number(searchParams.get('rows')) || 5;

  const fetchAllProducts = useCallback( async () => {
    setLoading(true);
    setProducts([]);
    try{
      const res = await fetchSelledProducts({ query: query, page: currentPage, perPage: rows });
      setProducts(res.products)
      setTotalCount(res.count);
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
        totalCount={totalCount}
        loading={loading}
        currentPage={currentPage}
        rows={rows}
      />
      <SalesForm open={openDrawer} toggleDrawer={handleDrawer} refetch={fetchAllProducts}/>
    </>
  );
}
