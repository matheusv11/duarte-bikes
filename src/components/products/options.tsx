import { useAppSelector, useAppDispatch } from "@/src/store";
import { MUIDataTableOptions } from "mui-datatables";
import { useSearchParams} from 'next/navigation';
import useTable from "@/src/lib/useTable";
import CustomToolbar from "./custom-toolbar";
import { LinearProgress } from "@mui/material";

export default function TableOptions () {
  const { loading, totalCount} = useAppSelector((state) => state.product);
  const searchParams = useSearchParams();
  const { closeSearch, changePage, handleSearch, changeRows } = useTable();

  const currentPage = Number(searchParams.get('page')) || 1;
  const rows = Number(searchParams.get('rows')) || 5;
 
  const options: MUIDataTableOptions = { // FAZER, talvez seja memoizado no table.tsx
    // filterType: 'dropdown',
    filter: false,
    sort: false,
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