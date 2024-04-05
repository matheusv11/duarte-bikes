import type { Metadata } from "next";
import CustomersTable from '@/src/components/customers/table'
import CustomersForm from '@/src/components/customers/form'

export const metadata: Metadata = {
  title: "Clientes",
  description: "Cadastro de clientes",
};

export default function Page() {

  return (
    <>
      <CustomersTable/>
      <CustomersForm />
    </>
  );
}
