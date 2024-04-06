'use client'
import { MUIDataTableOptions } from "mui-datatables";
import useTable from "@/src/lib/useTable";
import { LinearProgress, TableFooter, TableCell, TableRow } from "@mui/material";
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

  const { loading, totalCount, totalValue } = useAppSelector((state) => state.saleProduct);
  const { query, currentPage, rows, closeSearch, changePage, handleSearch, changeRows } = useTable();

  const options: MUIDataTableOptions = {
    filter: false,
    sort: false,
    download: false,
    print: false,
    selectableRows: 'none',
    rowsPerPage: rows,
    responsive: 'standard',
    rowsPerPageOptions: [5, 10, 20, 50, 100],
    onChangePage: changePage,
    onChangeRowsPerPage: changeRows,
    count: totalCount,
    page: currentPage - 1,
    serverSide: true,
    searchText: query,
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
                  if (col.name === "productName") {
                    return (
                      <TableCell sx={style.footerCell} key={index} >
                        Total
                      </TableCell>
                    );
                  } else if (col.name === "soldValue") {
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
  }

  return options;
}