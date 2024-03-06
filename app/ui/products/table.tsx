
'use client'
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { Product } from '@/app/types/products';
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
    name: "created_at",
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

const options: MUIDataTableOptions = {
  filterType: 'checkbox',
  // selectableRows: 'none',
};

interface Table {
  products: Product[]
}

export default function Table({ products }: Table) {
  return (
    <MUIDataTable
      title={"Employee List"}
      data={products}
      columns={columns}
      options={options}
    />
  )
  
}