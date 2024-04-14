import type { Metadata } from "next";
import RentsTable from '@/src/components/rents/table'
import RentForm from '@/src/components/rents/form'

export const metadata: Metadata = {
  title: "Aluguéis",
  description: "Cadastro de alugueis",
};

export default function Page() {

  return (
    <>
      <RentsTable/>
      <RentForm />
    </>
  );
}
