'use client'
import { MUIDataTableOptions } from "mui-datatables";
import useTable from "@/src/lib/useTable";
import { LinearProgress, TableFooter, TableCell, TableRow } from "@mui/material";
import { useSearchParams } from 'next/navigation';
import { useAppSelector } from "@/src/store";
import CustomToolbar from "./custom-toolbar";
import { valueCurrencyMask } from "@/src/lib/utils";


const style = {
  footerCell: {
    backgroundColor: "grey",
    borderBottom: "none",
    color: "white",
    fontSize: 14,
    fontWeight: "bolder",
    position: 'sticky',
    bottom: 0,
    zIndex: 100,
  },
 
}

export default function TableOptions () {
  const searchParams = useSearchParams();

  const { loading, totalCount, totalValue } = useAppSelector((state) => state.saleProduct);

  const { closeSearch, changePage, handleSearch, changeRows } = useTable();

  const currentPage = Number(searchParams.get('page')) || 1;
  const rows = Number(searchParams.get('rows')) || 5;

  const options: MUIDataTableOptions = {
    filter: false,
    sort: false,
    selectableRows: 'none',
    rowsPerPage: rows,
    responsive: 'standard',
    rowsPerPageOptions: [5, 10, 20],
    onChangePage: changePage,
    onChangeRowsPerPage: changeRows,
    count: totalCount,
    page: currentPage - 1,
    serverSide: true,
    onSearchChange: handleSearch,
    onSearchClose: closeSearch,
    tableBodyMaxHeight:  '65vh', // Mudar
    customToolbar: () =>  <CustomToolbar />,
    customTableBodyFooterRender: (opts) => {
      return (
        <>
          <TableFooter  sx={style.footerCell}>
            <TableRow>
              {opts.columns.map((col, index) => {
                if (col.display === "true") {
                  if (col.name === "product_name") {
                    return (
                      <TableCell sx={style.footerCell} key={index} >
                        Total
                      </TableCell>
                    );
                  } else if (col.name === "sold_value") {
                    return (
                      <TableCell sx={style.footerCell} key={index} >
                        {totalValue ? valueCurrencyMask(totalValue.toString()) : totalValue}
                      </TableCell>
                    );
                  } else {
                    return  <TableCell key={index} sx={style.footerCell}  />;
                  }
                }
              })}
            </TableRow>
          </TableFooter>
        </>
      );
    },
    textLabels: {
      body: {
        noMatch: loading ? <LinearProgress/> : 'Não há conteúdo para a busca'
      }
    }
    // onTableChange: () => {
    //   console.log("Mudança")
    // },
    // customSearchRender: debounceSearchRender(500),
  }

  return options;
}