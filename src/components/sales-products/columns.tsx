'use client';

import { MUIDataTableColumnDef } from "mui-datatables";
import { valueCurrencyMask } from "@/src/lib/utils";

export default [ // Tipar // Alinhar coluna com oq retornar do banco
    {
      name: "product_name",
      label: "Produto",
    },
    {
      name: "quantity",
      label: "Quantidade",
    },
    {
      name: "product_value",
      label: "Valor produto",
      options: {
        customBodyRender: (val) => val ? valueCurrencyMask(val.toString()) : val
      }
    },
    {
      name: "sold_value",
      label: "Valor vendido",
      options: {
        customBodyRender: (val) => val ? valueCurrencyMask(val.toString()) : val
      }
    },
    {
      name: "createdAt",
      label: "Vendido em",
    },
    // {
    //   name: "updatedAt",
    //   label: "Editado em",
    // },
] satisfies MUIDataTableColumnDef[];