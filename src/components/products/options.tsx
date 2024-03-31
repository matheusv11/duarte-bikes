
import { MUIDataTableOptions } from "mui-datatables";

export default { // FAZER, talvez seja memoizado no table.tsx
  // filterType: 'dropdown',
  filter: false,
  sort: false,
  selectableRows: 'none',
  rowsPerPage: rows,
  responsive: 'standard',
  // tableBodyHeight: '75vh',
  tableBodyMaxHeight: '75vh',
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
} satisfies MUIDataTableOptions;
