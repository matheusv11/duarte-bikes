'use server';
import { z } from 'zod';
import prisma from './prisma'
import { stringCurrencyToNumber } from '@/src/lib/utils';

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: 'Campo deve conter no mínimo 1 caractere'
  }).min(1),
  description: z.string(),
  buyedValue: z.string()
    .transform((v) => stringCurrencyToNumber(v))
    .refine((n) => n > 0, {
      message: 'Valor deve ser acimad de R$ 0',
    }),
  soldValue: z.string()
    .transform((v) => stringCurrencyToNumber(v))
    .refine((n) => n > 0, {
      message: 'Valor deve ser acimad de R$ 0',
    }),
  quantity: z.coerce.number().min(1),
  date: z.string(),
});

const CreateProduct = FormSchema.omit({ id: true, date: true });
const UpdateProduct = FormSchema.omit({ id: true, date: true });

export async function createProduct(data: any) { // Tipar
  const validatedFields = CreateProduct.safeParse(data);
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltando. Erro ao criar produto.',
    };
  }
 
  const { buyedValue,description, name, quantity, soldValue } = validatedFields.data;
 
  try {
    await prisma.products.create({
      data: {
        name: name, 
        buyedValue: buyedValue,
        quantity: quantity,
        soldValue: soldValue,
        description: description
  
      },
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
}

export async function updateProduct(data: any) { // Tipar
  const validatedFields = UpdateProduct.safeParse(data);

  if (!validatedFields.success) {
    console.log("Algo deu errado", validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltando. Erro ao criar produto.',
    };
  }
 
  const {buyedValue, description, name, quantity, soldValue } = validatedFields.data;
  
  try {
    await prisma.products.update({
      data: {
        name: name, 
        buyedValue: buyedValue,
        quantity: quantity,
        soldValue: soldValue,
        description: description
  
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
 
}

export async function deleteProduct(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await prisma.products.delete({
      where: {
        id: id
      }
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // redirect('/admin/products'); // Devido ao client side na table, eu recarrego a página pro useEffect rolar

}