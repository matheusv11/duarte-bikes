'use client'
import { Button } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { handleDrawer } from '@/src/store/saleProductSlice'
import { useAppDispatch } from "@/src/store";
import useTable from '@/src/lib/useTable';

export default function CustomToolbar () {
  const dispatch = useAppDispatch();
  const { dateValues, createDate } = useTable();
  
  const readELement = () => {
    let timer1 = setTimeout(() => {
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
        slotProps={{
          actionBar: {
            actions: ['accept', 'cancel', 'clear', 'today']
          }
        }}
        onOpen={readELement}
        defaultValue={dateValues}
        slots={{ field: SingleInputDateRangeField }}
        name="allowedRange"
        onChange={createDate}
      />
      <Button sx={{ml: 2}} variant="contained" onClick={() => dispatch(handleDrawer(true))}>
        Criar
      </Button>
     </>
   );
}