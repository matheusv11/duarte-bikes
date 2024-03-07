'use client'
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { Product } from '@/app/types/products';
import { usePathname, useSearchParams, useRouter} from 'next/navigation';
import { useMemo } from "react";
import { useDebouncedCallback } from 'use-debounce';
import { CircularProgress, LinearProgress } from "@mui/material";

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

interface Table {
  products: Product[];
  totalCount: number;
}

export default function Table({ products, totalCount }: Table) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;

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

  const options: MUIDataTableOptions = { // Talvez ser memo
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
        noMatch: 'Sorry man'

      }
    }
    // onTableChange: () => {
    //   console.log("Mudança")
    // },
    // customSearchRender: debounceSearchRender(500),
    // selectableRows: 'none',
  };

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