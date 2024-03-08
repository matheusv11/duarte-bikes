'use client'
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { Product } from '@/app/types/products';
import { usePathname, useSearchParams, useRouter} from 'next/navigation';
import { useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import { CircularProgress, LinearProgress } from "@mui/material";
import { fetchProducts } from '@/app/lib/data';

const columns = [ // Tipar // Alinhar coluna com oq retornar do banco
  // {
  //   name: "id",
  //   label: "ID",
  //   options: {
  //   filter: true,
  //   sort: true,
  //   }
  // },
  {
    name: "name",
    label: "Produto",
    options: {
    filter: true,
    sort: true,
    }
  },
  {
    name: "description",
    label: "Descrição",
    options: {
    filter: true,
    sort: true,
    }
  },
  {
    name: "buyed_value",
    label: "Valor comprado",
    options: {
    filter: true,
    sort: true,
    }
  },
  {
    name: "sold_value",
    label: "Valor vendido",
    options: {
    filter: true,
    sort: true,
    }
  },
  {
    name: "quantity",
    label: "Quantidade",
    options: {
    filter: true,
    sort: true,
    }
  },
  {
    name: "createdAt",
    label: "Criado em",
    options: {
    filter: true,
    sort: true,
    }
  },
  {
    name: "updatedAt",
    label: "Editado em",
    options: {
    filter: true,
    sort: true,
    }
  },
];

export default function Table() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const currentPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';
  const rows = Number(searchParams.get('rows')) || 5;

  const createPageURL = (pageNumber: number) => {
    const number = pageNumber + 1;
    const params = new URLSearchParams(searchParams);

    params.set('page', number.toString());
    
    replace(`${pathname}?${params.toString()}`);
  };

  const changeRows = (rows: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');
    params.set('rows', rows.toString());
    
    replace(`${pathname}?${params.toString()}`);
  }
  
  const handleSearch = useDebouncedCallback((search) => {

    const params = new URLSearchParams(searchParams);

    params.set('page', '1');

    if (search) {
      params.set('query', search);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const closeSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('query');
    replace(`${pathname}?${params.toString()}`);
  }

  const options: MUIDataTableOptions = { // Maybe memoized component
    filterType: 'checkbox',
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20],
    onChangePage: createPageURL,
    onChangeRowsPerPage: changeRows,
    count: totalCount,
    page: currentPage - 1,
    serverSide: true,
    onSearchChange: handleSearch,
    onSearchClose: closeSearch,
    textLabels: {
      body: {
        noMatch: loading ? <LinearProgress/> : 'Não há conteúdo para a busca'
      }
    }
    // onTableChange: () => {
    //   console.log("Mudança")
    // },
    // customSearchRender: debounceSearchRender(500),
    // selectableRows: 'none',
  };

  useEffect(() => {
    const fetch = async ()=> {
      setLoading(true);
      setProducts([]);
      try{
        const res = await fetchProducts({query: query, page: currentPage, perPage: rows });
        setProducts(res.products)
        setTotalCount(res.count);
      }
      catch(e) {
        console.error(e); // Colocar alert
      }
     
      setLoading(false);
    }

    fetch();
  }, [searchParams]);

  return (
    <>
    <MUIDataTable
      title={"Produtos"}
      data={products}
      columns={columns}
      options={options}
    />

    {/* {JSON.stringify(products)} */}
    </>
  )
  
}