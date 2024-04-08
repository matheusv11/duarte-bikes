import type { Metadata } from "next";
import BikesTable from '@/src/components/bikes/table'
import BikeForm from '@/src/components/bikes/form'

export const metadata: Metadata = {
  title: "Produtos",
  description: "Cadastro de produtos",
};

export default function Page() {

  return (
    <>
      <BikesTable/>
      <BikeForm />
    </>
  );
}
