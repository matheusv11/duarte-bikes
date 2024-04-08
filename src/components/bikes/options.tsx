import { useAppSelector } from "@/src/store";
import { MUIDataTableOptions } from "mui-datatables";
import useTable from "@/src/lib/useTable";
import CustomToolbar from "./custom-toolbar";
import { LinearProgress } from "@mui/material";

export default function TableOptions () {
  const { loading, totalCount } = useAppSelector((state) => state.bike);
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
    textLabels: {
      body: {
        noMatch: loading ? <LinearProgress/> : 'Não há conteúdo para a busca'
      }
    }
  }

  return options;
}