import { useMemo } from 'react';
import { usePathname, useSearchParams, useRouter} from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { DateRange } from '@mui/x-date-pickers-pro';
import { format, parseISO } from 'date-fns';

export default function useTable() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const params = new URLSearchParams(searchParams);

  const changeRows = (rows: number) => {
    params.set('page', '1');
    params.set('rows', rows.toString());
    
    replace(`${pathname}?${params.toString()}`);

  }

  const changePage = (pageNumber: number) => {
    const number = pageNumber + 1;
    const params = new URLSearchParams(searchParams);

    params.set('page', number.toString());
    
    replace(`${pathname}?${params.toString()}`);
  };

  const closeSearch = () => {
    const params = new URLSearchParams(searchParams);
    if(params.get('query')){
      params.delete('query');
      replace(`${pathname}?${params.toString()}`);
    }
  }


  const createDate = (date: DateRange<Date>) => { // Passar pro useTable
    
    if(date.every(v => v)) {
      const [startDate, endDate] = date as Array<Date>;

      params.set('start', format(startDate, "yyyy-MM-dd") );
      params.set('end', format(endDate, "yyyy-MM-dd"));

    } else if (date.every(v => !v)) {
      params.delete('start');
      params.delete('end')      
    }

    replace(`${pathname}?${params.toString()}`);
  };

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

  const dateValues: DateRange<Date> = useMemo(() => {
    const start = params.get('start');
    const end = params.get('end')

    if(start && end) {
      return [parseISO(start), parseISO(end)]   
    } else{
      return [null, null]
    }
  }, []);

  const currentPage = Number(params.get('page')) || 1;
  const query = params.get('query') || '';
  const rows = Number(params.get('rows')) || 5;
  const startDate = params.get('start') || '';
  const endDate =  params.get('end') || '';

  return {
    changeRows,
    handleSearch,
    closeSearch,
    changePage,
    createDate,
    dateValues,
    currentPage,
    query,
    rows,
    startDate,
    endDate
  }

}