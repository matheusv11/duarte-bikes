"use client";

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFnsV3';
import {ptBR} from 'date-fns/locale'

export default function PickerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>{children}</LocalizationProvider>;
}