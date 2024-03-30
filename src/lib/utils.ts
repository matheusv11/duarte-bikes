import { ChangeEvent } from 'react';

export const FiletoBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });


export const inputOnlyDigits = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
  event.target.value = event.target.value.split("").filter(s => /\d/.test(s)).join("")
  return event
}

export const valueOnlyDigits = (val: string) => val.split("").filter(s => /\d/.test(s)).join("").padStart(3, "0")

export const inputCurrencyMask = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

  const onlyDigits = valueOnlyDigits(event.target.value)
  const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
  event.target.value = maskCurrency(digitsFloat);
  return event;
}

export const valueCurrencyMask =(val: string) => {
  const onlyDigits = valueOnlyDigits(val)
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
