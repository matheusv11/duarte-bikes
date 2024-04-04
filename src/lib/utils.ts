import { ChangeEvent } from 'react';

export const FiletoBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const valueOnlyDigits = (val: string) => val.split("").filter(s => /\d/.test(s)).join("")

export const valueCurrencyMask =(val: string) => {
  const onlyDigits = valueOnlyDigits(val).padStart(3, "0")
  const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
  val = maskCurrency(digitsFloat);
  return val

}

const maskCurrency = (val = '', locale = 'pt-BR', currency = 'BRL') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(val as any)
}

export const stringCurrencyToNumber = (val: string) => {
  return Number(val.replace('R$', '').replace(/[^\w\s]/gi, ''));
}