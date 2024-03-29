import type { Metadata } from "next";
import RegisterForm from "@/src/components/register/register-form";

export const metadata: Metadata = {
  title: "Cadastro",
  description: "Cadastro do usuário",
};


export default function Register() {

  return (
    <RegisterForm/>
  )
}
