import { usePathname, useSearchParams, useRouter} from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

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

  return {
    changeRows,
    handleSearch,
    closeSearch,
    changePage,

  }

}
