import { useAppSelector } from "@/src/store";
import { MUIDataTableOptions } from "mui-datatables";
import useTable from "@/src/lib/useTable";
import CustomToolbar from "./custom-toolbar";
import { valueCurrencyMask } from "@/src/lib/utils";
import { LinearProgress, TableFooter, TableCell, TableRow } from "@mui/material";


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
  const { loading, totalCount,totalValue } = useAppSelector((state) => state.rent);
  const { query, rows, currentPage, closeSearch, changePage, handleSearch, changeRows } = useTable();

  const options: MUIDataTableOptions = { // FAZER, talvez seja memoizado no table.tsx
    filter: false,
    sort: false,
    download: false,
    print: false,
    selectableRows: 'none',
    rowsPerPage: rows,
    responsive: 'standard',
    // tableBodyHeight: '75vh',
    tableBodyMaxHeight: '65vh',
    rowsPerPageOptions: [5, 10, 20, 50, 100],
    onChangePage: changePage,
    onChangeRowsPerPage: changeRows,
    count: totalCount,
    page: currentPage - 1,
    serverSide: true,
    searchText: query,
    onSearchChange: handleSearch,
    onSearchClose: closeSearch,
    customToolbar: () =>  <CustomToolbar/>,
    customTableBodyFooterRender: (opts) => {
      return (
        <>
          <TableFooter  sx={style.footerCell}>
            <TableRow>
              {opts.columns.map((col, index) => {
                if (col.display === "true") {
                  if (col.name === "bikeName") {
                    return (
                      <TableCell sx={style.footerCell} key={index} >
                        Total
                      </TableCell>
                    );
                  } else if (col.name === "value") {
                    return (
                      <TableCell sx={style.footerCell} key={index} >
                        {totalValue ? valueCurrencyMask(totalValue.toString()) : totalValue}
                      </TableCell>
                    );
                  }else {
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