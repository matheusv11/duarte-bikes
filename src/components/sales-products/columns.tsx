'use client';

import { MUIDataTableColumnDef } from "mui-datatables";
import { valueCurrencyMask } from "@/src/lib/utils";

export default [ // Tipar // Alinhar coluna com oq retornar do banco
    {
      name: "productName",
      label: "Produto",
    },
    {
      name: "quantity",
      label: "Quantidade",
    },
    {
      name: "productValue",
      label: "Valor produto",
      options: {
        customBodyRender: (val) => val ? valueCurrencyMask(val.toString()) : val
      }
    },
    {
      name: "soldValue",
      label: "Valor vendido",
      options: {
        customBodyRender: (val) => val ? valueCurrencyMask(val.toString()) : val
      }
    },
    {
      name: "createdAt",
      label: "Vendido em",
    },
] satisfies MUIDataTableColumnDef[];