'use server';
import { z } from 'zod';
import prisma from './prisma'
import { stringCurrencyToNumber } from './utils';

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: 'Campo deve conter no mínimo 1 caractere'
  }).min(1),
  description: z.string(),
  quantity: z.coerce.number().min(1),
  date: z.string(),
});

const CreateBike = FormSchema.omit({ id: true, date: true });
const UpdateBike = FormSchema.omit({ id: true, date: true });

export async function createBike(data: any) { // Tipar
  const validatedFields = CreateBike.safeParse(data);
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltando. Erro ao criar produto.',
    };
  }
 
  const { description, name, quantity } = validatedFields.data;
 
  try {
    await prisma.bikes.create({
      data: {
        name: name, 
        quantity: quantity,
        description: description
      },
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
}

export async function updateBike(data: any) { // Tipar
  const validatedFields = UpdateBike.safeParse(data);

  if (!validatedFields.success) {
    console.log("Algo deu errado", validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltando. Erro ao criar produto.',
    };
  }
 
  const { description, name, quantity } = validatedFields.data;
  
  try {
    await prisma.bikes.update({
      data: {
        name: name, 
        quantity: quantity,
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

export async function deleteBike(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await prisma.bikes.delete({
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