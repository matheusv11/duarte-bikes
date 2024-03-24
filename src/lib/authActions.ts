'use server';
import { signIn, signOut } from '@/src/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { put } from '@vercel/blob';
import { z } from 'zod';
import prisma from './prisma'

type AuthenticateData = {
  cellphone: string;
  password: string;
}

const UserFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  cpf: z.string(),
  address: z.string(),
  password: z.string(),
  // image: z.string(),
  image: z.any(),
  cellphone: z.string(),
  // customerId: z.string({
  //   invalid_type_error: 'Please select a customer.',
  // }),  
  // status: z.enum(['pending', 'paid'], {
  //   invalid_type_error: 'Please select an invoice status.',
  // }),
  date: z.string(),
});

const CreateUser    = UserFormSchema.omit({ date: true, id: true });

export async function register(data: any) { // Tipar

  const validatedFields = CreateUser.safeParse(data);

  if (!validatedFields.success) {
    console.log("Algo deu errado", validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltando. Erro ao criar conta.',
    };
  }
 
  const { address, cpf, cellphone, image, password, name,  } = validatedFields.data;
 
  const hashedPassword = await bcrypt.hash(password, 10);

  const file = image.get('file')

  try {
    
    await put(file.name, file, {
      access: 'public',
    });
    
    await prisma.users.create({
      data: {
        name: name,
        address: address,
        cpf_cnpj: cpf,
        cellphone: cellphone,
        kind: 'user',
        password: hashedPassword,
  
      },
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // revalidatePath('/admin/products');
  // redirect('/admin/products'); // Devido ao client side na table, eu recarrego a página pro useEffect rolar
}


export async function authenticate(data: AuthenticateData) {
  try {
    await signIn('credentials', data);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciais inválidas';
        default:
          return 'Ocorreu algum erro.';
      }
    }
    throw error;
  }
}

export async function logout() {
  try {
    await signOut(); // Só usar o signout sem isso
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
