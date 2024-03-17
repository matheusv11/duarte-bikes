import NextAuth from "next-auth"
// import GitHub from "next-auth/providers/github"
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import type { User } from '@/app/types/user';
import prisma from "@/app/lib/prisma";
import { authConfig } from './auth.config';

async function getUser(cellphone: string): Promise<User | undefined> {
  try {
    const user = await prisma.users.findUnique({
      where: {
        cellphone: cellphone
      }
    })
    return user || undefined;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      async authorize(credentials) { // Tentar tipar
        const parsedCredentials = z
          .object({ cellphone: z.string(), password: z.string().min(6) }) // Validar como telefone
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { cellphone, password } = parsedCredentials.data;

          const user = await getUser(cellphone);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user; // BD bate com json de retorno
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
})