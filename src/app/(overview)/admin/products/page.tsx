import type { Metadata } from "next";
import ProductsTable from '@/src/components/products/products-table'
import ProductForm from '@/src/components/products/product-form'

export const metadata: Metadata = {
  title: "Produtos",
  description: "Cadastro de produtos",
};

export default function Page() {

  return (
    <>
      <ProductsTable/>
      <ProductForm />
    </>
  );
}
