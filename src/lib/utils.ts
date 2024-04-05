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
export const removeSpecialCharacters = (val: string) => {
  return val.replace(/[^\w\\s]/gi, '')
}

export const cpfMask = (v: string) => {
  if (!v) return ""
  v=v.replace(/\D/g,"")                    //Remove tudo o que não é dígito
  v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
  v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
                                           //de novo (para o segundo bloco de números)
  v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
  return v
}

export const cellphoneMask = (v: string) => {
  if (!v) return ""
  v = v.replace(/\D/g,'')
  v = v.replace(/(\d{2})(\d)/,"($1) $2")
  v = v.replace(/(\d)(\d{4})$/,"$1-$2")
  return v
}