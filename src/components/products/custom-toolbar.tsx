'use-client'

import { Button } from '@mui/material';
import { DateRange } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { usePathname, useSearchParams, useRouter} from 'next/navigation';
import { format } from 'date-fns';

export default function CustomToolbar ({toggleDrawer}: any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const createDate = (date: DateRange<Date>) => {
    const params = new URLSearchParams(searchParams);

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
  
  const readELement = () => {
    let timer1 = setTimeout(() => {
      const options = {
        rootMargin: '0px',
        threshold: 1.0
      };
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          console.log(entry.intersectionRatio > 0 ? 'visible' : 'invisible');
        });
      }, options);
  
      const elemento = document.querySelector("[style='position: absolute; pointer-events: none; color: rgba(130, 130, 130, 0.62); z-index: 100000; width: 100%; text-align: center; bottom: 50%; right: 0px; letter-spacing: 5px; font-size: 24px;']")
      elemento?.remove()
    }, 1 * 100);

    return () => {
      clearTimeout(timer1);
    };

  }

  return(
     <>
      <DateRangePicker
        onOpen={readELement}
        slots={{ field: SingleInputDateRangeField }}
        name="allowedRange"
        onChange={createDate}
      />
      <Button sx={{ml: 2}} variant="contained" onClick={() => toggleDrawer(true)}>
        Criar
      </Button>
     </>
   );
}