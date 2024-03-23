/// <reference types="next" />
/// <reference types="next/image-types/global" />
// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

import NextAuth from "next-auth";
import JWT from "next-auth/jwt";
declare module "next-auth" {

  interface Session {
    user: {
      cpf_cnpj: string;
      kind: string
      cellphone: string,
      password: string,
      address: string
    }
  }

  interface User {
    id: string;
    kind: string;
  }

}


declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    kind: string;
  }

}
