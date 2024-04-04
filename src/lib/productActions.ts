'use server';
import { z } from 'zod';
import prisma from './prisma'

const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string(),
  buyed_value: z.string(),
  sold_value: z.string(),
  quantity: z.string(),
  date: z.string(),
});

const CreateProduct = FormSchema.omit({ id: true, date: true });
const UpdateProduct = FormSchema.omit({ date: true, id: true });

export async function createProduct(data: any) { // Tipar
  const validatedFields = CreateProduct.safeParse(data);

  if (!validatedFields.success) {
    console.log("Algo deu errado", validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltando. Erro ao criar produto.',
    };
  }
 
  const { buyed_value,description, name, quantity, sold_value } = validatedFields.data;
 
  try {
    await prisma.products.create({
      data: {
        name: name, 
        buyedValue: Number(buyed_value.replace('R$', '').replace(/[^\w\s]/gi, '')),
        quantity: Number(quantity),
        soldValue: Number(sold_value.replace('R$', '').replace(/[^\w\s]/gi, '')),
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
 
  const {buyed_value,description, name, quantity, sold_value } = validatedFields.data;
  
  try {
    await prisma.products.update({
      data: {
        name: name, 
        buyedValue: Number(buyed_value.replace('R$', '').replace(/[^\w\s]/gi, '')),
        quantity: Number(quantity),
        soldValue: Number(sold_value.replace('R$', '').replace(/[^\w\s]/gi, '')),
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
 
  // revalidatePath('/admin/products'); // Passar pro redux
  // redirect('/admin/products'); // Devido ao client side na table, eu recarrego a página pro useEffect rolar
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