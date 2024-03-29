'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from './prisma'
import { signIn, signOut } from '@/src/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { put } from '@vercel/blob';

const message = "Insira um valor acima de 0.";

const SelledProductFormSchema = z.object({
  id: z.string(),
  product: z.any(), // Objeto
  sold_value: z.coerce.number().gt(0, { message: message }),
  quantity: z.coerce.number().gt(0, { message: message }),
  // date: z.string(),
  date: z.date(),
});


const CreateSelledProduct = SelledProductFormSchema.omit({ id: true, date: true });
const UpdateSelledProduct = SelledProductFormSchema.omit({ date: true, id: true });


export async function createSelledProduct(data: any) { // Tipar

  const validatedFields = CreateSelledProduct.safeParse(data);

  if (!validatedFields.success) {
    console.log("Algo deu errado", validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltando. Erro ao criar produto.',
    };
  }
 
  const { date, product, quantity, sold_value } = validatedFields.data as any; 
 

  console.log("FIELDS", validatedFields.data);
  
  try {
    await prisma.selledProducts.create({ // Melhorar inserção
      data: {
        createdAt: date,
        productId: product.id,
        custom_sold_value: sold_value || null,
        quantity: quantity,
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

export async function updateSelledProduct(data: any) { // Tipar
  const validatedFields = UpdateSelledProduct.safeParse(data);

  if (!validatedFields.success) {
    console.log("Algo deu errado", validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltando. Erro ao criar produto.',
    };
  }
 
  const {product, quantity, sold_value } = validatedFields.data;
  
  try {
    await prisma.selledProducts.update({
      data: {
        productId: product.id,
        createdAt: '',
        quantity: quantity,
        custom_sold_value: sold_value,
  
      },
      where: {
        id: data.id
      }
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // revalidatePath('/admin/products'); // Passar pro redux
  // redirect('/admin/products'); // Devido ao client side na table, eu recarrego a página pro useEffect rolar
}

