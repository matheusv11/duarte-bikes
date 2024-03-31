import type { Metadata } from "next";
import SalesTable from '@/src/components/sales-products/table'
import SalesForm from '@/src/components/sales-products/form'

export const metadata: Metadata = {
  title: "Produtos Vendidos",
  description: "Produtos vendidos",
};


export default function Page() {
  return (
    <>
      <SalesTable/>
      <SalesForm/>
    </>
  );
}
